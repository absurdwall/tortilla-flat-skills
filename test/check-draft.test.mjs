import assert from 'node:assert/strict';
import { test } from 'node:test';
import { access, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkDraft } from '../skills/management/learning-library-add/scripts/check-draft.mjs';

const repo = dirname(dirname(fileURLToPath(import.meta.url)));
const library = resolve(process.env.LEARNING_LIBRARY_ROOT ?? join(repo, '..', 'tortilla-flat-learning-library'));
const available = await access(join(library, 'scripts/build.mjs')).then(() => true, () => false);
const options = { skip: available ? false : 'Set LEARNING_LIBRARY_ROOT to an existing Learning Library checkout.' };

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'library-intake-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const packageRoot = join(root, 'package');
  const files = {
    'index.html': '',
    'assets/teaching.css': '@import "./colors.css"; body { background-image: url("./dot.svg"); }',
    'assets/colors.css': 'body { color: #123; }',
    'assets/dot.svg': '<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"><circle cx="2" cy="2" r="2"/></svg>',
    'assets/app.js': 'import { label } from "./label.js"; document.querySelector("button").onclick = () => { document.querySelector("output").textContent = label; };',
    'assets/label.js': 'export const label = "Local interaction works";',
    'reference/glossary.html': '<!doctype html><html><head><title>Glossary</title><link rel="stylesheet" href="../assets/teaching.css"></head><body><h1>Glossary</h1><a href="../index.html#lesson">Back to lesson</a></body></html>',
  };
  const current = JSON.parse(await readFile(join(library, 'catalog/catalog.json'), 'utf8'));
  const accepted = current.entries.find(e => e.ownership.kind === 'library');
  const acceptedHtml = await readFile(join(library, 'library-pages', accepted.slug, 'public/index.html'), 'utf8');
  // Read current return chrome from the destination, rather than caching its policy.
  const returnLink = acceptedHtml.match(/<a\b[^>]*data-learning-library-return[\s\S]*?<\/a>/)[0]
    .replace(/href="[^"]*"/, 'href="../../?entry=intake-synthetic"');
  files['index.html'] = `<!doctype html><html><head><meta charset="utf-8"><title>Synthetic lesson</title><link rel="stylesheet" href="assets/teaching.css"><script type="module" src="assets/app.js"></script></head><body>${returnLink}<h1 id="lesson">Synthetic lesson</h1><img src="assets/dot.svg" alt="Dot"><a href="reference/glossary.html#term">Glossary</a><a href="https://example.org/reference">External citation</a><button>Try</button><output></output></body></html>`;
  for (const [file, content] of Object.entries(files)) {
    await mkdir(dirname(join(packageRoot, 'public', file)), { recursive: true });
    await writeFile(join(packageRoot, 'public', file), content);
  }
  const entry = {
    id: 'intake-synthetic', slug: 'intake-synthetic', title: 'Synthetic lesson',
    summary: 'An isolated intake verification fixture.', primaryTopic: current.topics[0],
    format: 'Visual guide', publishedOn: '2026-10-22', readingMinutes: 2,
    ownership: { kind: 'library', owner: 'Learning Library', path: 'pages/intake-synthetic/', files: Object.keys(files) },
  };
  const save = () => writeFile(join(packageRoot, 'entry.json'), JSON.stringify(entry));
  await save();
  await writeFile(join(packageRoot, 'notes.md'), 'PRIVATE PROVENANCE: must remain outside the artifact.');
  return { root, packageRoot, entry, files, save };
}

async function run(t, fixture) {
  try {
    const result = await checkDraft({ library, packageRoot: fixture.packageRoot });
    t.after(() => rm(result.scratch, { recursive: true, force: true }));
    return result;
  } catch (error) {
    const scratch = error.message.match(/Private scratch retained at ([^\n]+)/)?.[1];
    if (scratch) t.after(() => rm(scratch, { recursive: true, force: true }));
    throw error;
  }
}

test('uses native build for a complete private candidate; leaves source and canonical catalog unchanged', options, async t => {
  const f = await fixture(t);
  const beforeCatalog = await readFile(join(library, 'catalog/catalog.json'), 'utf8');
  const result = await run(t, f);
  assert.equal(result.state, 'draft');
  assert.equal(result.admission, 'not-performed');
  assert.equal(result.publication, 'not-performed');
  const artifactCatalog = JSON.parse(await readFile(join(result.artifact, 'catalog.json'), 'utf8'));
  assert.equal(artifactCatalog.entries.length, JSON.parse(beforeCatalog).entries.length + 1);
  assert.match(await readFile(join(result.artifact, 'pages/intake-synthetic/index.html'), 'utf8'), /Content-Security-Policy/);
  for (const [file, content] of Object.entries(f.files)) {
    assert.equal(await readFile(join(f.packageRoot, 'public', file), 'utf8'), content);
    await access(join(result.artifact, 'pages/intake-synthetic', file));
  }
  assert.equal(await readFile(join(library, 'catalog/catalog.json'), 'utf8'), beforeCatalog);
  const inventory = await readFile(result.inventory, 'utf8');
  assert.match(inventory, /pages\/intake-synthetic\/reference\/glossary.html/);
  assert.doesNotMatch(inventory, /notes\.md|entry\.json|PRIVATE PROVENANCE/);
});

test('native checker rejects a dependency omitted from the manifest', options, async t => {
  const f = await fixture(t);
  f.entry.ownership.files = f.entry.ownership.files.filter(p => p !== 'assets/colors.css');
  await f.save();
  await assert.rejects(run(t, f), /undeclared|not declared/i);
});

test('missing source dependency fails without inventing a replacement', options, async t => {
  const f = await fixture(t);
  await rm(join(f.packageRoot, 'public/assets/dot.svg'));
  await assert.rejects(run(t, f), /ENOENT|no such file/i);
});

test('native checker rejects a remote runtime resource while permitting external citation anchors', options, async t => {
  const f = await fixture(t);
  await writeFile(join(f.packageRoot, 'public/assets/teaching.css'), 'body { background: url(https://example.org/tracker.png); }');
  await assert.rejects(run(t, f), /remote|external|https:/i);
});

test('rejects reuse of a current catalog identity', options, async t => {
  const f = await fixture(t);
  f.entry.id = JSON.parse(await readFile(join(library, 'catalog/catalog.json'), 'utf8')).entries[0].id;
  await f.save();
  await assert.rejects(run(t, f), /Existing identity/);
});

test('rejects an ancestor symlink rather than flattening an escaping dependency', options, async t => {
  const f = await fixture(t);
  await mkdir(join(f.root, 'outside'));
  await writeFile(join(f.root, 'outside', 'glossary.html'), 'private');
  await rm(join(f.packageRoot, 'public/reference'), { recursive: true });
  await symlink(join(f.root, 'outside'), join(f.packageRoot, 'public/reference'));
  await assert.rejects(run(t, f), /Symbolic link/);
});

test('native checker rejects traversal in declared package paths before staging', options, async t => {
  const f = await fixture(t);
  f.entry.ownership.files.push('../private.html');
  await f.save();
  await assert.rejects(run(t, f), /path|segment|relative/i);
});
