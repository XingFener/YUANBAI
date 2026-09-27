# Archive door Hub variant

## Scope

This variant adapts the existing LOWKEY archive case language into YUANBAI's six-door Hub without replacing the current wooden-door version. It is selected with `?doors=archive`.

## Visual structure

- Tall 3D case with a translucent physical-material outer frame.
- A recessed tray holds one replaceable image plane per scene.
- A thin transparent glass lid, hinges and handle sit in front of the image.
- The centred case keeps its scene accent; off-centre cases are dimmed and desaturated.
- The existing Hub light, wave field, labels, progress state and horizontal navigation remain unchanged.

## Interaction

- Drag, wheel and touch navigation continue to select the centred case.
- Clicking a case reuses the existing transition timing.
- During transition, the glass lid and its frame pivot from the hinge while the fixed case and image remain behind.

## Data

Each item in `SCENES` owns a `doorImage` path. Replacing that value swaps the image inside the case without changing the renderer.

