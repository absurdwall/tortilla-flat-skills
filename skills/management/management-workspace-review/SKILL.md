---
name: management-workspace-review
description: Review active project working environments and recommend specific actions for branches, worktrees, and uncommitted or unpushed work.
---

# Management Workspace Review

Inspect the working environment read-only and return concrete recommendations grouped by project. Project direction and progress updates belong to `management-workspace-update`.

## Select the projects

Use the existing Management Registry's active projects as the starting scope, honoring the user's chosen subset. Read the installed `tortilla-flat-management` package's connection instructions to locate its bound workspace. Compare Codex project inventory and recent chat summaries for current work missing from that scope; list additional candidates with their reason for inclusion. Keep recorded lifecycle separate from observed activity.

Read applicable repository instructions and identify each repository by host and canonical Git common directory. Several projects or worktrees can share one repository; inspect it once and retain the project associations. Finish with an explicit scope, including unavailable paths, hosts, and non-Git projects.

## Inspect the environment

Read [Git inspection](references/git-inspection.md) for read-only collection commands and remote freshness rules. For each repository collect:

- Local branch count and names, identifying its default branch.
- Live branch count and names for each configured remote.
- Additional worktrees beyond the primary checkout, including paths, branches or detached HEADs, and missing paths.
- Staged, unstaged, and untracked changes in every reachable checkout.
- Unpushed commits relative to each local branch's upstream, including branches outside the current checkout; distinguish verified comparisons, cached upstream information, and missing upstreams.

The usual baseline is the default branch alone locally and on the primary remote, zero additional worktrees, no uncommitted files, and no unpublished commits. Determine the default branch from repository evidence; use `main` only when established. Keep other remotes separate rather than inflating the primary remote's count.

Inspection preserves repository files, refs, configuration, and indexes. Fetching, pruning, checkout changes, commits, pushes, and cleanup are outside this workflow. Available observations remain useful when another check fails; represent the failed check as unknown. Collection is complete when every scoped repository has results or explicit gaps for all five checks.

## Resolve the findings

Use project conventions, relevant PRs, and recent chat summaries to explain departures from baseline. Weekly teaching branches and identifiable ongoing work can be expected exceptions. Follow only the context needed to decide whether to recommend an action; branch age, a name, or a closed PR alone cannot establish that work is disposable.

Finish obtainable read-only checks before reporting. For a meaningful dirty checkout or stale worktree, establish whether it contains work that still needs saving and whether it is in use. Explaining a change's origin does not establish that it is finished: completed management-data or daily-record changes can still warrant a commit. This step is complete when each meaningful departure has a concrete recommendation, an evidence-backed reason to leave it alone, or a genuine access or decision blocker.

## Recommend actions by project

Lead with the actual completion state and the number of projects for which action is recommended. Give each such project its own section, with concise bullets naming the action, exact target, and reason. For a branch, identify its name and whether the recommendation concerns the local branch, a specific remote branch, or both. Choose whether to recommend an action; replace vague labels such as "partly ready for cleanup" with the actual recommendation.

Omit projects that match baseline or only have justified ongoing work. If inspection is complete and nothing warrants action, state prominently: **Review complete. Your action: none.** When access blocks a check, identify partial completion and its impact in a compact coverage note. Keep the full inventory as supporting detail when useful or requested.

Ask the user only for consequential decisions or access that the available evidence cannot settle, identifying the project, precise question, and recommended choice. Findings that can be resolved by further read-only inspection remain the agent's work. State clearly that recommendations have not been executed; cleanup or source-project changes require a separate request.

Return the report in the user's language with a brief scope, observation time, and remote freshness note. If the user requests persistence, use an established Management-owned report location or interface and confirm readback. The canonical Registry remains in the shared workspace root; permission to maintain Management records does not extend to other files there. Keep private findings outside this public skills repository. Completion means all scoped repositories are accounted for, recommendations are ready to act on, and any requested report write is confirmed or explicitly pending.
