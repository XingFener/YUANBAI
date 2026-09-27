# Working on YUANBAI

- Application directory: `lowkey-clone/`. Read the root README before editing.
- This is a standalone local adapter around vendored public React/Three.js bundles, not an original Next.js source checkout. Do not run create-next-app or replace the application scaffold.
- Editable application logic: `lowkey-clone/src/app.js`; local styles: `lowkey-clone/src/local.css`.
- `lowkey-clone/scripts/build.mjs` copies required assets and applies checked, reproducible patches. It also replaces visible LOWKEY branding with YUANBAI, including canvas text and vinyl labels.
- Treat `reference/` as source input. Preserve image/audio paths and original bundle snapshots; make adaptations in the build script or local source. Do not blanket-ignore `reference/_next/`.
- Do not edit `dist/` as source or commit generated output. Run `npm run build` from `lowkey-clone/` to regenerate it. There are no npm dependencies to install.
- Start with `npm start` from `lowkey-clone/`; default preview is http://127.0.0.1:4173/. Keep the server loopback-only unless explicitly requested otherwise.
- No API keys, passwords, `.env`, or backend accounts are needed. Never commit credentials or machine-specific configuration.
- Preserve the two requested states: archive overview at `/`, and opened case at `/?case=light-out-of-place`. Reader and orbit navigation should remain usable.
- Respect the user's current instructions about verification. Do not claim unperformed visual/interaction checks.
- Original media and runtime attribution must remain accurate; do not claim ownership or original TypeScript source availability.
