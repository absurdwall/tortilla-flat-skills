---
name: management-workspace-review
description: Review active project working environments and recommend specific actions for branches, worktrees, and uncommitted or unpushed work.
---

# Management Workspace Review

Inspect the working environment read-only and return a repository overview followed by concrete recommendations grouped by project. Project direction and progress updates belong to `management-workspace-update`.

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

## Report the overview, then recommendations

Lead with the actual completion state, the number of projects for which action is recommended, and confirmation that recommendations remain unexecuted. Return these two parts in the user's language:

### 1. Repository overview

Start with a table covering every scoped repository, including those that match baseline or only have justified ongoing work. Show local branch counts, live branch counts per remote, additional worktree counts, uncommitted and unpushed work, and confirmed retention reasons. Identify retained branches by exact name and local or remote location; distinguish the default branch, documented exceptions, ongoing work, and unresolved retention. Use compact project-specific notes for long branch groups. Mark unknown or cached observations explicitly rather than treating them as zero or confirmed retention. Preserve project associations for shared repositories.

### 2. Recommended actions by project

Present a table with columns **Project | Recommended action | Reason**. Include only projects with recommended actions, keeping each project's recommendations together in one row. Use direct action verbs and concise reasons. If inspection is complete and nothing warrants action, state prominently: **Review complete. Your action: none.** The overview remains part of that report.

Make each project's recommendation self-contained: name branch targets and whether local, on a specific remote, or both, and identify worktree paths. Keep necessary target lists with that recommendation. For a batch of files to save, give its directory or file pattern, scope, and count; enumerate individual files when their treatment differs. Reserve exhaustive file-level evidence for the supporting record. The user must be able to understand the recommendation and its targets without opening a link. A full supporting record may be linked once as optional evidence; keep the report's structure to the overview and project recommendations.

Ask the user only for consequential decisions or access that the available evidence cannot settle, identifying the project, precise question, and recommended choice. Findings that can be resolved by further read-only inspection remain the agent's work. Cleanup or source-project changes require a separate request.

Finish with a brief coverage note: scope, observation time, remote freshness, and any gaps that limit the conclusion. Mark blocked checks as partial completion rather than a clean result. If the user requests persistence, use an established Management-owned report location or interface and confirm readback. The canonical Registry remains in the shared workspace root; permission to maintain Management records does not extend to other files there. Keep private findings outside this public skills repository. Completion means all scoped repositories are accounted for, recommendations are ready to act on, and any requested report write is confirmed or explicitly pending.
