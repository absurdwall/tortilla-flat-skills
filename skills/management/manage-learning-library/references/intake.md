# Intake

Before preparing a candidate, read the verified Library's `docs/management-contract.md`, sections **Choose maintenance behavior** and **Public directory and collections**. Search its catalog and private draft index for an existing identity or destination. Reuse identical material; route differing existing material to [maintenance.md](maintenance.md).

## Choose the candidate

- **Stable public URL, maintained by its source project:** Prepare a URL-only Project Page candidate with `entry.json`, private `notes.md`, and any collection proposal. The public destination remains with its source project.
- **Local HTML without a public destination:** Prepare a hosted Library Page package with `public/`, `entry.json`, and `notes.md`. Record where future edits originate. For source-maintained imports, follow **Private imported-source record** in the Library contract to create `source.json` and its separate baselines.

Use the current destination schema for complete metadata and hosting shape. Resolve identity reservations through the current catalog, draft index, and publication record. Apply the main skill's organization guidance when assigning a collection or reading order.

URL-only candidates continue at **Save, register, and validate**. Hosted candidates use the preparation step below.

## Prepare hosted content

Inventory transitive local dependencies: HTML attributes and srcset, stylesheets and CSS imports/URLs, scripts and module imports, images, SVG, fonts, media, and linked reference pages. Follow recursively with a visited set. Account for every reference as a packaged file, a permitted external citation, or an unresolved blocker with its reason; consult the Library checker for supported syntax and diagnostics.

Copy the selected page and necessary dependencies, making the entry `public/index.html`. Preserve useful subdirectory topology, queries, fragments, reference-page round trips, presentation, and interaction. Rewrite affected URLs in the copies. Use the destination's current first-content return-link contract. Record source-to-package mappings and deliberate adaptations in private notes; keep original-project files intact.

Preparation is complete when the candidate metadata and file mapping are accounted for, including unresolved blockers. A passed static check alone does not clear recorded dependency blockers.

## Save, register, and validate

Save the package at `library-pages/<slug>/`, including URL-only candidates. New collections can be proposed in private `collection.json` beside the entry; existing membership references the canonical collection. Keep provenance and check evidence outside `public/` and the public catalog.

Use the destination's private draft index. If absent, create a small root `DRAFTS.md` and link it from README. Register one record with source, date, candidate kind, saved links, checks, and blockers. An explicit preview-only request instead uses external staging and reports destination saving/registration as unperformed.

Run this skill's helper against the saved package, or staging for the preview-only exception. Repair draft-copy failures within scope. Serve the returned artifact at the Library's normal base path and label the simulated catalog as a private preview. Inspect applicable content, styles/assets, interactions, reference/return links, destination links, and collection navigation; check console/network behavior when available. Record unperformed checks and unresolved blockers.

Finish using the main skill's write completion criteria. A saved candidate remains separate from formal catalog admission and publication.
