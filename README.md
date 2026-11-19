# HandleVault Mail Stamps

Standalone repository for the **HandleVault OS** ("Mail + Store") emoji mail stamp catalog, clickable stamp board, and message stamp renderer.

## What This Repo Does
- **Emoji Mail Stamps Only (No Pixel Arts):** Uses safe native Unicode emoji characters styled with custom borders/badges for mail and dispatch messages—avoiding third-party copyrighted emoji artwork or pixel art products.
- **Clickable Stamp Board & Message Rendering:** Lets users pick a stamp on the board to render it inside a message/dispatch preview, while keeping free/basic stamps accessible.
- **Flash Messages to Gumroad:** Highlights premium stamp packs and custom stamp/fee options via flash messages linking to **Gumroad** without altering the steady Workspace layout.

## Architecture & Guardrails
- **Two-Layer Separation:** Keeps stamp rendering and catalog logic separate from the core OS layout and steady Workspace.
- **Freeze Policy:** Keep the core `index.html` locked until OS work is complete, and always create a fresh ZIP backup before editing homepage files.
- **Public Safety:** Never store secret keys, API tokens, passwords, account numbers, or internal notes in public repository files or flash messages.

## Planned Files
- `index.html` — Stamp board and message rendering preview
- `app.js` — Stamp selection, message renderer, and Gumroad flash-message trigger
- `stamps.json` — Catalog of free, premium, and custom mail stamp items
