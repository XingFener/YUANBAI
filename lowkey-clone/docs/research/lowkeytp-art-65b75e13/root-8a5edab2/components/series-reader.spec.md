# SeriesReader specification

Runtime target: module 5452, export E; mounted through src/app.js.
Source styles: SeriesReader_* and VinylBgm_* in downloaded CSS, retained verbatim.
DOM: header back action/title/count; artwork column and navigation; metadata aside; thumbnail filmstrip; bilingual story sheet; optional audio disc.
Behavior: original hooks/GSAP animation, local image/audio URLs, wrapping slide navigation, zoom 100–200%, story sheet, Escape behavior. Original labels and all collection content retained.
Assets: original module 8607 published works and associated audio; no generated replacement images.
Responsive: source reader grid stacks according to original media queries.
Adapter behavior: hide rather than unmount the underlying archive while reading; disable archive keyboard focus and listeners' response while hidden; return restores the previously open case.
