# ArchiveScene specification

Runtime target: module 5504, exposed as ArchiveScene through src/app.js.
Model: pointer, click, wheel and keyboard; Three.js canvas plus React text overlays.
Assets: original first seven published series in module 8607, preserving order, covers, materials and image focus.
Source CSS: ArchiveScene shell fixed inset 0, 100vw × 100dvh; orbit background #fbfaf8. Main scene touch-action none. Brand bottom clamp(27px,4.7dvh,47px), horizontally centered; serif title clamp(30px,2.65vw,40px). Source system font stack includes Bodoni MT, Bodoni 72, Didot, Iowan Old Style, Times New Roman; labels Arial Narrow/Helvetica Neue/Arial.
Geometry: case .96×2.12×.18, gap .55, FOV31, rail Z−.5, unfolded case scale .8, open angle −1.91 radians. Original geometry/materials/shaders retained without approximation.
States: archive, focus, release; orbit scatter/line/curl/tunnel/forming/orbit/gathering/materializing/handoff/settling/complete and reverse transitions.
Text: LOWKEY; A TRANSPARENT ARCHIVE; RETURN TO ORBIT; VIEW WORKS; series metadata from original data module.
Metadata: top83.5dvh, left calc(50% - 114px), width min(300px,100vw - 48px). Opacity .36s; translate .56s cubic-bezier(.22,1,.36,1).
Responsive: original CSS and camera resizing retained; same two views share one responsive scene.
Scope adaptation: start directly with the unfolded shelf. Query case selects and opens a case. All original gestures retained.
Evidence limitation: values above extracted from source CSS/JS, not computed browser style, because the browser channel was unreliable.
