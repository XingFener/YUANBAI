# LOWKEY local reproduction

Source: https://lowkeytp.art/ — one route, two requested states.
Application root: lowkey-clone/. Existing workspace only contained an empty 素材 directory; no existing application routes are replaced.

- `/`: seven-case archive, entering directly at the state in reference image 1.
- `/?case=light-out-of-place`: archive with Light, Out of Place opened, reference image 2.
- `/?view=orbit`: original orbit entrance, also reachable by RETURN TO ORBIT.
- VIEW WORKS: local collection reader, returning to the same mounted archive.

Strategy: preserve the public site's actual Three.js/React runtime, geometry, materials, CSS, content and images. Add a small, editable application adapter and a reproducible, checked patch for initial state. This is an offline runtime reproduction, not a claim to possess the site's original TypeScript source. No original source maps are available. Original public bundles remain unmodified in reference/; build emits patched bundles to dist/.

The source asset URL paths are preserved inside this isolated application's dist directory so texture and audio references remain intact. They cannot collide with another application. No external backend or publication is needed.

Design references: user-provided overview and open-case screenshots. Browser inspection has exposed the live orbit controls; further browser interaction has been intermittently timing out. Source-derived values are labeled as such, not misrepresented as computed-style observations.
