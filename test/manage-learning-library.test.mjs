import assert from 'node:assert/strict';
import { test } from 'node:test';
import { access, cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { checkDraft } from '../skills/management/manage-learning-library/scripts/check-draft.mjs';

const library = resolve(process.env.LEARNING_LIBRARY_ROOT ?? '../tortilla-flat-learning-library');
const available = await access(join(library, 'docs/management-contract.md')).then(() => true, () => false);
const options = { skip: available ? false : 'Set LEARNING_LIBRARY_ROOT to the updated Library checkout.' };

async function fixture(t) {
  const packageRoot = await mkdtemp(join(tmpdir(), 'library-manage-test-'));
  t.after(() => rm(packageRoot, { recursive: true, force: true }));
  const catalog = JSON.parse(await readFile(join(library, 'catalog/catalog.json'), 'utf8'));
  const entry = { ...structuredClone(catalog.entries.find(item => item.ownership.kind === 'project')),
    id: 'linked-lesson', slug: 'linked-lesson', title: 'Linked lesson',
    ownership: { kind: 'project', owner: 'Synthetic project', url: 'https://example.org/lesson/' } };
  const save = () => writeFile(join(packageRoot, 'entry.json'), JSON.stringify(entry));
  await save();
  await writeFile(join(packageRoot, 'notes.md'), 'Private provenance; not public content.');
  return { packageRoot, catalog, entry, save };
}

async function run(t, f, mode = 'new') {
  const result = await checkDraft({ library, packageRoot: f.packageRoot, mode });
  t.after(() => rm(result.scratch, { recursive: true, force: true }));
  return result;
}

test('URL-only candidate uses native metadata validation without requiring or publishing a mirror', options, async t => {
  const f = await fixture(t);
  const before = await readFile(join(library, 'catalog/catalog.json'), 'utf8');
  const result = await run(t, f);
  assert.equal(result.destination, 'https://example.org/lesson/');
  assert.equal(result.sourceCheck.state, 'not-applicable');
  const inventory = await readFile(result.inventory, 'utf8');
  assert.doesNotMatch(inventory, /linked-lesson|notes\.md|source\.json/);
  await assert.rejects(access(join(f.packageRoot, 'public')));
  assert.equal(await readFile(join(library, 'catalog/catalog.json'), 'utf8'), before);
});

test('new collection proposal appears only in the isolated candidate catalog', options, async t => {
  const f = await fixture(t);
  f.entry.collectionId = 'synthetic-learning';
  f.entry.readingOrder = 1;
  await f.save();
  await writeFile(join(f.packageRoot, 'collection.json'), JSON.stringify({ id: 'synthetic-learning', title: 'Synthetic learning', summary: 'An agent-arranged path.' }));
  const result = await run(t, f);
  const built = JSON.parse(await readFile(join(result.artifact, 'catalog.json'), 'utf8'));
  assert.equal(built.collections[0].id, 'synthetic-learning');
  assert.equal(built.entries.find(item => item.id === f.entry.id).readingOrder, 1);
  assert.equal(JSON.parse(await readFile(join(library, 'catalog/catalog.json'), 'utf8')).collections, undefined);
});

test('intentional update replaces the same identity; destination migration still fails native identity checks', options, async t => {
  const f = await fixture(t);
  Object.assign(f.entry, structuredClone(f.catalog.entries.find(item => item.ownership.kind === 'project')));
  f.entry.summary = 'A privately proposed updated summary.';
  await f.save();
  await assert.rejects(run(t, f), /Existing identity/);
  const result = await run(t, f, 'update');
  assert.equal(result.state, 'update-proposal');
  const built = JSON.parse(await readFile(join(result.artifact, 'catalog.json'), 'utf8'));
  assert.equal(built.entries.length, f.catalog.entries.length);
  assert.equal(built.entries.find(item => item.id === f.entry.id).summary, f.entry.summary);
  f.entry.ownership.url = 'https://example.org/moved/';
  await f.save();
  try { await run(t, f, 'update'); assert.fail('migration should fail'); }
  catch (error) {
    const scratch = error.message.match(/Private scratch retained at ([^\n]+)/)?.[1];
    if (scratch) t.after(() => rm(scratch, { recursive: true, force: true }));
    assert.match(error.message, /cannot silently change destination/);
  }
});

test('collection mismatches fail before staging; update mode cannot add an unknown identity', options, async t => {
  const f = await fixture(t);
  await assert.rejects(run(t, f, 'update'), /existing entry identity/);
  f.entry.collectionId = 'expected';
  await f.save();
  await writeFile(join(f.packageRoot, 'collection.json'), JSON.stringify({ id: 'wrong', title: 'Wrong', summary: 'Wrong collection.' }));
  await assert.rejects(run(t, f), /must match entry.collectionId/);
});

test('hosted update uses native source baselines and rejects saved changes before treating the candidate as validated', options, async t => {
  const f = await fixture(t);
  Object.assign(f.entry, structuredClone(f.catalog.entries.find(item => item.ownership.kind === 'library')));
  await f.save();
  const original = join(library, 'library-pages', f.entry.slug, 'public');
  const sourceRoot = join(f.packageRoot, 'synthetic-source');
  await cp(original, sourceRoot, { recursive: true });
  await cp(original, join(f.packageRoot, 'public'), { recursive: true });
  const files = [];
  for (const path of f.entry.ownership.files) {
    const digest = createHash('sha256').update(await readFile(join(sourceRoot, path))).digest('hex');
    files.push({ sourcePath: path, savedPath: path, sourceSha256: digest, savedSha256: digest });
  }
  await writeFile(join(f.packageRoot, 'source.json'), JSON.stringify({ schemaVersion: 1, entryId: f.entry.id, maintenance: 'source-project', sourceRoot, files }));
  assert.equal((await run(t, f, 'update')).sourceCheck.state, 'unchanged');
  await writeFile(join(f.packageRoot, 'public/index.html'), 'an unaccounted saved edit');
  await assert.rejects(run(t, f, 'update'), /differs from its source\/saved baseline/);
});
