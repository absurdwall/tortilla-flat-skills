#!/usr/bin/env node

// Orchestration only: the selected Library checkout supplies all policy checks.
import { cp, lstat, mkdir, mkdtemp, readFile, realpath, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function checkDraft({ library, packageRoot }) {
  library = await realpath(resolve(library));
  packageRoot = await realpath(resolve(packageRoot));
  const catalogPath = join(library, 'catalog/catalog.json');
  const originalCatalog = await readFile(catalogPath, 'utf8');
  const { parseCatalog, validateCatalog } = await import(
    pathToFileURL(join(library, 'scripts/catalog-contract.mjs')).href
  );
  const catalog = validateCatalog(parseCatalog(originalCatalog));
  const entry = JSON.parse(await readFile(join(packageRoot, 'entry.json'), 'utf8'));
  if (entry.ownership?.kind !== 'library') {
    throw new Error('This helper prepares independent Library Pages; use the Library workflow for project URLs.');
  }
  if (catalog.entries.some(item => item.id === entry.id || item.slug === entry.slug)) {
    throw new Error('Existing identity: use the Library update workflow instead of a new intake.');
  }
  // Validate paths with the owning contract before using any as copy destinations.
  const candidate = validateCatalog({ ...catalog, entries: [...catalog.entries, entry] });
  const scratch = await mkdtemp(join(tmpdir(), 'learning-library-draft-'));
  const source = join(scratch, 'source');
  const artifact = join(scratch, 'artifact');
  const copy = async (root, file, to) => {
    // Preserve the source boundary even when an ancestor is a symlink.
    let from = root;
    for (const segment of ['', ...file.split('/')]) {
      from = join(from, segment);
      if ((await lstat(from)).isSymbolicLink()) {
        throw new Error(`Symbolic link in declared source: ${file}`);
      }
    }
    await mkdir(dirname(to), { recursive: true });
    await cp(from, to, { dereference: false, verbatimSymlinks: true });
  };
  try {
    for (const file of ['index.html', 'styles.css', 'app.js', 'index-model.js']) {
      await copy(library, `site/${file}`, join(source, 'site', file));
    }
    for (const item of candidate.entries) {
      const root = item === entry ? packageRoot : library;
      if (item.thumbnail) {
        await copy(root, `catalog/${item.thumbnail}`, join(source, 'catalog', item.thumbnail));
      }
      if (item.ownership.kind !== 'library') continue;
      const page = item === entry ? 'public' : `library-pages/${item.slug}/public`;
      for (const file of item.ownership.files) {
        await copy(root, `${page}/${file}`, join(source, 'library-pages', item.slug, 'public', file));
      }
    }
    await mkdir(join(source, 'catalog'), { recursive: true });
    await writeFile(join(source, 'catalog/catalog.json'), JSON.stringify(candidate, null, 2) + '\n');
    const run = (script, args) => execFileSync(process.execPath, [join(library, 'scripts', script), ...args], {
      cwd: library, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 8 * 1024 * 1024,
    });
    run('build.mjs', ['--source', source, '--output', artifact, '--identity-baseline', catalogPath]);
    const inventory = run('inventory.mjs', [artifact]);
    const inventoryPath = join(scratch, 'artifact-inventory.txt');
    await writeFile(inventoryPath, inventory);
    if (await readFile(catalogPath, 'utf8') !== originalCatalog) {
      throw new Error('Library catalog changed during validation; re-read and validate a fresh draft.');
    }
    const result = {
      state: 'draft', staticValidation: 'passed', browserValidation: 'pending',
      admission: 'not-performed', publication: 'not-performed',
      scratch, artifact, inventory: inventoryPath,
      catalogSha256: createHash('sha256').update(originalCatalog).digest('hex'),
      entryId: entry.id, pagePath: entry.ownership.path,
    };
    await writeFile(join(scratch, 'validation.json'), JSON.stringify(result, null, 2) + '\n');
    return result;
  } catch (error) {
    const detail = error.stderr?.toString().trim() || error.message;
    throw new Error(`Draft validation failed. Private scratch retained at ${scratch}\n${detail}`, { cause: error });
  }
}

function argumentsFrom(argv) {
  const values = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (!['--library', '--package'].includes(argv[i]) || !argv[i + 1] || argv[i + 1].startsWith('--') || values[argv[i]]) {
      throw new Error('Usage: check-draft.mjs --library <checkout> --package <prepared-directory>');
    }
    values[argv[i]] = argv[i + 1];
  }
  if (!values['--library'] || !values['--package']) {
    throw new Error('Usage: check-draft.mjs --library <checkout> --package <prepared-directory>');
  }
  return { library: values['--library'], packageRoot: values['--package'] };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    console.log(JSON.stringify(await checkDraft(argumentsFrom(process.argv.slice(2))), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
