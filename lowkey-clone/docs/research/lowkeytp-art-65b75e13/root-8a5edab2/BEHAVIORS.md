# Source-verified behavior

Source module 5504 in 504.733c34792308f9bb.js, and module 5452 in 452-5d2a03566d096363.js.

The two screenshots are states of `/`, not separate source paths.

Archive: horizontal pointer drag with 6px movement threshold, pointer capture, velocity-based inertia clamped to 2.8 case gaps and snap-to-nearest. Wheel uses its dominant axis with 150ms delayed snap. Left/right keys move a case. Clicking a non-centered case centers it; clicking a centered case opens it. Enter/Space toggles a centered case. Escape closes the open case. Clicking the open cover closes it. Clicking the artwork after 1.4 timeline units or VIEW WORKS opens the collection reader. There is no double-click requirement for opening a case.

Open animation: timeline 0–1.42, speed 1.18; center/rotate .0–.8; lid opens .82–1.15; tray shifts .9–1.38. Brand fades out, metadata fades in when stage=release. Secondary cases shift aside.

Reader: previous/next wrap, thumbnails select directly, arrow keys browse, Escape closes story then reader. Zoom supports +/−/0 and double click. READ STORY displays bilingual text; audio starts only when the vinyl button is pressed.

Return: closed-case state exposes RETURN TO ORBIT; closes and folds cases then restores orbit. Selecting an orbit work unfolds the selected collection.

Responsive: source CSS at width 639px, height 680px, desktop short-height 760px. WebGL camera framing responds continuously to aspect ratio. Reduced motion is preserved.
