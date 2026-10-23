---
name: management-workspace-review
description: Inspect branches, worktrees, uncommitted changes, and unpublished commits across active projects, with context for expected exceptions.
---

# Management Workspace Review

Give the user a read-only inventory of the working environment: what matches the usual baseline, what supports ongoing work, and what deserves attention. Project direction and progress updates belong to `management-workspace-update`.

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

## Explain and report

Use project conventions, relevant PRs, and recent chat summaries to explain departures from baseline. Weekly teaching branches and identifiable ongoing work can be expected exceptions. Follow only the context needed to classify a finding; branch age, a name, or a closed PR alone cannot establish that work is disposable.

Report a compact project/repository table with the five checks and an overall assessment: baseline matched, expected exception, worth reviewing, or unknown. A repository can have both expected activity and unexplained findings; retain the findings even when another exception is explained. Expand meaningful departures with branch names, worktree paths, affected files, commit counts where verified, and supporting context. Known Management Registry edits are management-data changes, still visible as uncommitted work.

Return the report in chat with scope, observation time, remote freshness, and unresolved findings. If the user requests persistence, use an established Management-owned report location or interface and confirm readback. The canonical Registry remains in the shared workspace root; permission to maintain Management records does not extend to other files there. Keep private findings outside this public skills repository. Completion means every scoped repository is accounted for and any requested report write is confirmed or explicitly pending.
