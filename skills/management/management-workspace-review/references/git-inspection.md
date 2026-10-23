# Read-only Git inspection

Run commands in the intended checkout using argument-safe invocation. The examples use `git --no-optional-locks` so status inspection leaves the index untouched. Establish the repository's top-level and common directory before grouping checkouts:

```sh
git --no-optional-locks rev-parse --show-toplevel
git --no-optional-locks rev-parse --path-format=absolute --git-common-dir
git --no-optional-locks for-each-ref --format='%(refname:short)' refs/heads/
git --no-optional-locks worktree list --porcelain
```

The worktree list includes the primary checkout. Count the other registered entries as additional worktrees, while reporting missing paths separately. Inspect every reachable listed checkout, including a detached one:

```sh
git --no-optional-locks status --porcelain=v1 -z --untracked-files=normal
```

Parse the NUL-delimited status records, including rename pairs; keep staged, unstaged, and untracked file categories distinct. Ignored files are outside this inventory.

## Remote branches and default branch

Use `git remote` to enumerate remote names. For each remote, read its live advertised refs:

```sh
git --no-optional-locks ls-remote --symref origin HEAD 'refs/heads/*'
```

Substitute the actual remote name. Count only `refs/heads/` records; the symbolic HEAD and HEAD hash are not extra branches. The HEAD symbolic target supplies the advertised default branch. Use repository conventions or a clearly labeled cached default when that target is unavailable. Preserve each remote's identity; infer the primary remote from project configuration and repository identity where possible.

The local `refs/remotes/` namespace is a cache. A failed live read leaves the remote count unknown; cached refs may be shown as a separate stale observation. No configured remote is a distinct state from an unreachable one.

## Unpublished commits

Enumerate upstreams for every local branch:

```sh
git --no-optional-locks for-each-ref --format='%(refname)%09%(upstream)' refs/heads/
```

For a branch with an established upstream, resolve that upstream's remote and branch using Git's tracking configuration. Compare against the live advertised remote tip when the required commit objects are available locally:

```sh
git --no-optional-locks rev-list --left-right --count <local-tip>...<remote-tip>
```

The left count is local-only commits; retain a nonzero right count as remote-only work or divergence context. Equal live tips establish zero local-only commits. If a live tip's objects are unavailable locally, a comparison against the cached upstream must be labeled cached; leave the current unpublished count unknown. Likewise identify shallow or incomplete history as a limit on ancestry-based conclusions.

A missing or gone upstream is not zero unpublished commits. Report the branch and tracking gap; use an explicit, established remote counterpart if available, otherwise leave its publication status unresolved. For detached worktrees, report HEAD and the absence of branch tracking; expand further only when local evidence can establish publication status. Gathering missing objects through fetch would change the repository and requires a separate task.

## Resolve a proposed cleanup

Before recommending branch removal, check whether its commits are contained in the current integration branch and whether a checkout or ongoing work still uses it. Identify local and remote refs separately. A retained teaching branch can have fully integrated commits and still be intentional.

For a dirty or broken checkout, inspect the actual remaining files, including ignored material that removal would affect. Compare meaningful content with its registered HEAD and preserved history using read-only tree/blob or hash comparisons. Distinguish empty directories, remotely saved content, unique local work, and inaccessible content. A missing `.git` file alone leaves these questions unanswered. Keep file-level evidence available so a recommendation to save, align, or remove names what is protected and what would change.
