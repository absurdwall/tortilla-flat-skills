#!/usr/bin/env node
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkDraft, runCli } from '../../manage-learning-library/scripts/check-draft.mjs';
export { checkDraft };
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await runCli();
}
