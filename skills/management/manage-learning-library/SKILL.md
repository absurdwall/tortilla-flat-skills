---
name: manage-learning-library
description: Collect Learning Library pages or links, organize project collections, and check or refresh resource updates (收录、整理、检查更新).
---

# Manage Learning Library

Handle intake, organization, and resource-scoped maintenance. The Library repository owns catalog, source-record, validation, and publication rules.

## Locate and scope

Resolve the requested HTML, attachment, URL, or existing resource. Inspect candidates before asking the user to disambiguate. Identify the requested action: finding, checking, intake, organization, or refresh. A general “manage this page” request starts with inspection and an assessment; a check-only request ends with observations.

Locate `absurdwall/tortilla-flat-learning-library` from an explicit user path or `LEARNING_LIBRARY_ROOT`, then the workspace Registry/current Library project, then a verified sibling checkout. Verify Git root, remote, branch, and dirty state. Read its `AGENTS.md`; preserve unrelated work and active review branches. Read source-project instructions before accessing original material.

Load context for the action:

- **Find/check:** Read the relevant canonical entries or private draft records and the contract sections named by the selected workflow.
- **Write:** Also read the Library README's content/admission workflow. Consult the publication record when choosing a new identity, changing an admitted entry, or preparing publication. Use `GLOSSARY.md` when domain terms need clarification.

When a required capability is missing, inspect attached worktrees and the verified repository's worktree list for an updated checkout identified by this task or the user. Verify and report that checkout's branch; otherwise report the missing capability. Keep schemas and validators in Library.

Proceed when you can name the verified Library root, target entry ID/source path/URL or search scope, and requested action. Ordinary intake saves a private candidate. Refresh prepares a replacement; changes to admitted material follow the destination's approval rules. Remote push and publication follow their separately requested scope.

## Choose the workflow

- **Find:** Search the canonical catalog and private draft index. Return matching resources with their saved/public destinations and states.
- **Add a page or link:** Follow [intake.md](references/intake.md).
- **Manage, check, or refresh a resource:** Follow [maintenance.md](references/maintenance.md). Start with the identified resource; expand to a Library-wide sweep when requested.
- **Organize:** Inspect the affected entries and follow the organization guidance below. Prepare multi-entry edits as one isolated catalog proposal using native build and identity checks.

## Organize when adding or regrouping

Read `docs/management-contract.md`, section **Public directory and collections**, in the verified Library checkout. Reuse matching collections and preserve stable resource identities. Choose reading order yourself using that contract's guidance and record a short rationale in private notes. Prepare affected sibling ranks together. Reserve user questions for substantive ambiguities the source material cannot resolve.

## Finish according to the action

**Read-only:** Report the resources inspected, evidence, observations, and uncertainty. This completes a find/check request; packaging, previews, registration writes, baseline changes, and commits belong to write workflows.

**Write:** Read saved metadata, applicable declared-file/source-record hashes, and index links back against the prepared result. Confirm one registration per stable identity, record actual checks and blockers, and commit only scoped files through the Library's content workflow. Report confirmed writes separately if validation, registration, or commit is incomplete.

Resolve helper paths relative to this skill folder, even when the working directory is another project. Run `node <skill-folder>/scripts/check-draft.mjs --library <checkout> --package <package>` for a new canonical candidate, including an existing private draft. Add `--mode update` when replacing an identity already in the canonical catalog. The helper builds a temporary proposal; saving and registration are separate workflow steps. Multi-entry changes use Library's native isolated-build workflow.

Report the actual Git state and achieved content state: **saved draft**, **update proposal**, **admitted**, or **published**, using the destination's evidence. Preview/build success supplies validation, not admission or deployment approval.

When reviewing or changing this skill, use the behavioral cases in [spec.md](references/spec.md).
