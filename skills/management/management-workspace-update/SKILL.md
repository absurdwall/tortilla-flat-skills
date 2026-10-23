---
name: management-workspace-update
description: Summarize recent cross-project Codex work, identify Management coverage gaps, and update project progress when requested.
---

# Management Workspace Update

Give the user a lightweight overview of what projects are moving, what remains, and where to resume. Recent Codex work is an entry point, including work that has not yet become an Issue or PR.

Inspect project repositories, trackers, and chats read-only. Writes are limited to Management-owned records through their current contracts, including the canonical Registry in the shared workspace root. That location grants no write access to other shared-workspace files or project contents.

## Get the recent picture

Use Codex app `list_projects` and `list_threads` to find projects and recent chat summaries. Look for new projects and shifts in work direction, including activity outside the Management Registry. Use host and working-directory identity to match projects; treat uncertain matches as gaps to resolve. Keep project presence, recorded lifecycle, and recent activity distinct.

Compare this picture with the existing Registry. For Registry access, locate the installed `tortilla-flat-management` package and read its current connection instructions; use its bound workspace. Finish this pass with the projects showing recent work, newly discovered projects, and registration or source gaps identified. If a source or capability is unavailable, continue with the available evidence and name the coverage gap.

## Follow the useful leads

Start with recent summaries. Read a relevant conversation or inspect its repository only when needed to explain current work, an unfinished step, or conflicting evidence. Follow that repository's current instructions when checking Issues, PRs, and delivery records. Choose depth based on what could change the overview; stop when further history would not materially change it.

Describe observed work using its evidence: backlog, an unfinished implementation, review, and confirmed delivery are different states. A chat can reveal active work before a ticket exists; a stale open PR may need follow-up. Separate facts from inferred direction and retain links to the relevant chats, Issues, or PRs. This pass is complete when each included project's account has recent supporting evidence or an explicit information gap.

## Update Management when requested

A review-only request ends with the overview. For a requested update, read the installed Management package's closeout references and follow its current helper contracts for source refresh, source connection, and progress checkpoints. Keep schema, revision, and recovery mechanics with that owner. Confirm writes by readback and report confirmed changes separately from pending ones.

Use settled project identities and canonical sources for updates. Preserve user-owned lifecycle, priority, and scope choices; clarify a new project's inclusion or an ambiguous identity when the existing context cannot settle it. Continue independent updates while those choices remain open.

Keep PR and chat provenance visible in the overview. Where the current checkpoint contract cannot represent that evidence, report the limitation and preserve the supported update rather than claiming full coverage.

## Return the overview

Open with the actual completion state and a prominent statement of the user's required action. When the update is confirmed and no intervention is needed, say so directly: **Update complete. Your action: none.** For a read-only run, identify the review as complete without claiming a write. Surface pending operations or necessary decisions in that opening when present.

Summarize the relevant projects in one or two sentences each: current work, what remains, and the next useful step. Apply the same brevity to text displayed on Home; retain longer evidence through links or established detailed records. Include meaningful changes where a prior checkpoint supports comparison. Use the user's language.

Complete obtainable checks before asking for help. Present a consequential decision with its project, context, recommended choice, and what the user must decide. Distinguish the agent's next work and a future human step whose prerequisites are unfinished from an action the user needs to take now.

Briefly state coverage, observation time, newly discovered projects, and tracking gaps. An update can legitimately end with no user action; that conclusion must account for the gaps and decisions found in this run.

Completion means the overview is delivered and every attempted update has a confirmed or explicitly pending outcome.
