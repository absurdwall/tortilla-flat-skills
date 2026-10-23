---
name: management-update
description: Refresh the cross-project Management overview, compare Codex projects with the Registry, and reconcile progress when the user requests a portfolio update or review (盘点项目、更新管理面板).
---

# Management Update

Help the user regain an overview when work is spread across projects: what is moving, what remains, what needs their judgment, and where to resume. Actual work stays in its owning repositories and chats. Read the current Management contracts rather than maintaining another Registry, ticket database, or status model here.

## Establish scope and inventory

Use the available Codex app `list_projects` tool for the current project inventory. Separate local/remote development projects from ChatGPT projects; report counts for each and any unavailable host. If this capability is unavailable, state that discovery is incomplete and continue with the known Registry. Do not substitute a directory scan and claim it is the Codex project list.

Locate the installed `tortilla-flat-management` skill in a supported discovery root. Read its `SKILL.md`, relevant closeout references, and CLI help. Run its `connect` command to verify the installed package and bound canonical workspace, then read that workspace's existing `Portfolio Registry.json`. Never create a replacement Registry or guess a new workspace when setup fails. Continue independently available read-only observations and report the connection failure.

Read applicable project instructions before inspecting a repository. Match app projects to Registry identities using host and canonical working directory; verify repository origin and scope when paths have changed. A shared repository remote, display name, parent directory, or second worktree alone does not establish a unique match. Preserve names and stable IDs; report ambiguous matches together for clarification.

Compare both directions: app projects absent from the Registry, registered projects absent from the app inventory, missing directories, and registered projects without usable tracking sources. An app entry does not establish active work. A missing app entry or lack of recent activity does not authorize pausing or archiving a registered project. Keep temporary experiments, learning spaces, storage entries, and possible duplicates as candidates until their purpose is established.

Default to a bounded overview of all registered projects and an inventory of unmatched candidates. Follow a user-specified subset or read-only scope. When there are many projects, show a first useful inventory before fetching detailed histories. Reuse facts already read during this run and fetch independent sources concurrently where supported. A failed source should leave that project's situation explicitly unknown while other projects remain usable.

## Read actual work

For registered projects, use the installed Management helper's `inspect` or `reconcile` commands to read source health, canonical Issues, revisions, and existing progress checkpoints. Inspect recent open PRs and their canonical Issue links through an available GitHub connector or authenticated `gh` with an explicit repository. Include closed/merged work when it explains a recent change or an unresolved next step; avoid fetching complete repository histories for a portfolio scan.

When relevant, use Codex app `list_threads` and bounded `read_thread` calls to understand recent work and provide exact chat names/entries. Inventory or chat status alone does not establish what was delivered. Read only enough recent context to resolve the project's current work; do not message, wake, or assign chats as part of this routine. Preserve private paths, chat provenance, and project snapshots outside this public skills repository.

Describe distinct facts together instead of deriving everything from a single status:

- Project lifecycle is the user's recorded active/paused/archived choice.
- An open Issue may be backlog. A claimed Issue is a recorded assignment, not proof of current execution.
- An open PR is unfinished proposed implementation. Distinguish draft, review, and explicit blockers; old open PRs may be stalled. PR presence alone does not prove a live agent is working.
- A merge, closed Issue, completed chat, or passing test does not by itself establish release or product acceptance.

For each project explain the current objective, unfinished work, recent evidence, known blockers, and next useful step. Cite Issue/PR/chat entries, name the observation time, and separate source facts from inferred project summaries. State information gaps instead of translating unknown into zero work. A user-action item needs a concrete decision or intervention; ordinary agent work is not automatically waiting for the user.

## Reconcile within the requested scope

A request to update Management authorizes refreshing existing sources and submitting evidence-backed progress checkpoints through the installed helper. A request only to inspect or count projects remains read-only. Read the current destination contracts before constructing typed operations; use the helper's verified connection, expected revisions, source evidence, and native readback. Do not edit Registry JSON directly or copy its validators into this skill.

For an already registered project, connect a missing GitHub Issues source only when the user requested connection/reconciliation and the repository's current workflow establishes that exact tracker as canonical. Preserve existing sources and report the source's actual read outcome. Unmatched projects require a settled identity and purpose before new registration. Present unresolved inclusion, identity, or lifecycle choices as one short decision list; continue confirmed projects without waiting for unrelated choices. Preserve authorization already given for exact operations.

For a progress checkpoint, reread registered sources, compare the old summary, and submit only a justified new or changed checkpoint through the installed `submitSummary` contract. Use current source/Registry/summary revisions and truthful verification time. Include canonical references for blockers and next work; record unavailable/disabled sources as uncovered. Extra PR/chat observations can inform the explanation, but do not claim that Issue-source revisions validate PR or chat state. Report any evidence that the current checkpoint schema cannot represent.

On a conflict, reread and regenerate the affected request once; on a repeated conflict, leave that target pending and finish the other projects. Reconcile an uncertain operation through its existing recovery receipt before resending; never hide a confirmed step when a later step fails. Reread confirmed writes and distinguish source refresh, source connection, summary update, and unresolved registration.

Do not change project lifecycle, priorities, focus, or tracker assignment/closure to make counts look current. Do not create tickets, merge PRs, publish, start scheduled monitoring, or redesign the app during an overview refresh unless independently requested.

## Return a usable overview

Lead with the portfolio situation in the user's language. A compact table can show project, what is moving, what remains/next step, and evidence/freshness. Separate projects with observed unfinished work, projects with no recent work observed, and projects whose situation is unknown; do not label all open Issues as work in progress.

Then report registration/source gaps and any concrete decisions needed from the user. Keep coverage counts explicit, including inspected projects versus inventory-only candidates and failed sources. Name the actual achieved state: read-only review, sources refreshed, checkpoints written and reread, or pending updates. Provide the entry needed to resume relevant work. App Refresh alone does not run this agent workflow, and this skill does not fix the app's status calculation or loading speed.
