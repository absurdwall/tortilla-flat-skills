# Intake

Find an existing entry or draft by stable identity and destination before adding one. Reuse identical saved material; inspect differences as an update rather than creating duplicates.

## Choose the handoff

For a stable public HTTPS page maintained by its source project, prepare a URL-only Project Page candidate. Save its complete `entry.json` and private `notes.md` at the Library's package location, with any collection proposal; there is no page mirror or required `public/` directory. Register it in the private draft index with its destination and source. A private/local file URL is not a public destination. Ordinary citation links remain citations rather than becoming catalog entries automatically.

For local HTML without a public destination, prepare a Library Page package with `public/`, `entry.json`, and `notes.md`. Keep a source-maintained imported page's `source.json` beside those files using the Library's private maintenance contract. If the user explicitly chooses Library as the future maintenance source, record that decision instead of promising source-project refreshes.

## Prepare hosted pages

Inventory transitive local dependencies: HTML attributes and srcset, stylesheets and CSS imports/URLs, scripts and module imports, images, SVG, fonts, media, and linked reference pages. Follow recursively with a visited set; distinguish passive HTTPS citations from runtime dependencies. Account for every reference as a packaged file, a permitted retained external link, or an unresolved blocker with a reason. Refer to the Library checker for supported syntax and diagnostics.

Copy only the selected page and necessary dependencies. Map the entry to `public/index.html`; retain useful subdirectory topology, queries, fragments, and reference-page round trips. Rewrite affected URLs in copies. Record the mapping and necessary adaptations in private notes. Preserve the page's own presentation and interaction, using the destination's current first-content return-link contract rather than copying chrome policy into this skill.

Capture original-file hashes before adapting copies and saved-file hashes after adaptation. Map every declared file in `source.json` when the source project remains authoritative. Dependencies can change as well as HTML. Missing or unavailable source evidence is a blocker to a verified baseline, not permission to invent one.

## Save and register

Prepare complete candidate metadata under the destination schema, including stable unused identities, concise recognition text, topic/format, honest candidate date and reading time, exact hosting shape, and all hosted files. Check the publication record's historical identity reservations as well as the current catalog and draft index. Reuse/update an existing draft identity. Keep source evidence private. Candidate dates are not proof of publication.

Place the package at `library-pages/<slug>/`, including URL-only candidates. A proposed collection may be recorded in `collection.json` beside `entry.json`; existing collection membership can reference the canonical definition. For a multi-entry collection reorder, prepare a scoped complete catalog proposal using native Library tools rather than pretending a one-entry helper applies all sibling edits.

Register one discoverable entry in the destination's private draft index. Use its existing format; if absent, create a small root `DRAFTS.md` and link it from README. Record source, registration date, candidate kind, saved links, checks and blockers. A preview-only request is an explicit exception to destination writes and must be reported as not saved/registered.

Read back the saved metadata, page and asset hashes, source record, any collection proposal, and registration links. Run the helper against the saved package. Resolve draft-copy failures without editing source-project material. Unresolved dependencies remain admission blockers even when static checks pass.

Serve the complete returned temporary artifact at its normal Library base path. Label simulated catalog previews as private candidates. Inspect recognizable content, images/styles, interactions, reference navigation, destination/return links, and collection navigation where relevant; check console/network behavior when available. Save the actual results and blockers in private notes/index and read those updates back.

Finish with a scoped local commit under the Library's content workflow, unless explicitly requested otherwise. Formal admission and publication follow that repository's separately authorized exact changes; never infer them from a draft intake request.
