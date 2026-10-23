# Intake

Before preparing a candidate, read the verified Library's `docs/management-contract.md`, sections **Choose maintenance behavior** and **Public directory and collections**. Search its catalog and private draft index for an existing identity or destination. Reuse identical material; route differing existing material to [maintenance.md](maintenance.md).

## Choose the candidate

- **Stable public URL, maintained by its source project:** Prepare a URL-only Project Page candidate with `entry.json`, private `notes.md`, and any collection proposal. The public destination remains with its source project.
- **Local HTML without a public destination:** Prepare a hosted Library Page package with `public/`, `entry.json`, and `notes.md`. Record where future edits originate. For source-maintained imports, follow **Private imported-source record** in the Library contract to create `source.json` and its separate baselines.

Use the current destination schema for complete metadata and hosting shape. Resolve identity reservations through the current catalog, draft index, and publication record. Apply the main skill's organization guidance when assigning a collection or reading order.

URL-only candidates continue at **Save, register, and validate**. Hosted candidates use the preparation step below.

## Prepare hosted content

Resolve transitive local dependencies, including linked reference pages, styles, scripts, images, and media. Account for each as a declared packaged file, a permitted external citation, or an unresolved blocker; use Library's checker for syntax and diagnostics.

Copy the selected page and necessary dependencies, making the entry `public/index.html`. Preserve useful subdirectory topology, queries, fragments, reference-page round trips, presentation, and interaction. Rewrite affected URLs in the copies. Use the destination's current first-content return-link contract. Briefly explain deliberate adaptations in private notes; keep original-project files intact.

## Save, register, and validate

Save the package at `library-pages/<slug>/`, including URL-only candidates. Follow **Routine intake** in the Library contract for minimal durable records and temporary review output. New collections use `collection.json`; existing membership references the canonical collection.

Use the destination's private draft index, creating and linking `DRAFTS.md` only if none exists. Register one identity with its saved links and current state. An explicit preview-only request uses external staging and reports saving/registration as unperformed.

Run the helper against the saved package, or preview-only staging. It returns a temporary catalog proposal, artifact, and inventory for inspection and approval. Repair failures within scope, then serve that artifact as a private preview and perform the contract's focused browser check. Record the latest outcome and any blocker briefly.

Finish using the main skill's write criteria. Follow Library's approval workflow when admission is requested; the generated proposal remains separate from canonical admission and publication.
