import bpy
import math
import os
from mathutils import Vector


ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT_DIR = os.path.join(ROOT, "reference", "models")
BLEND_PATH = os.path.join(OUT_DIR, "yuanbai-door.blend")
GLB_PATH = os.path.join(OUT_DIR, "yuanbai-door.glb")
PREVIEW_PATH = os.path.join(OUT_DIR, "yuanbai-door-preview.png")

os.makedirs(OUT_DIR, exist_ok=True)


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.meshes, bpy.data.curves, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
        pass


def material(name, color, roughness=0.45, metallic=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return mat


def apply_bevel(obj, width=0.008, segments=3):
    bevel = obj.modifiers.new("Soft_Edges", "BEVEL")
    bevel.width = width
    bevel.segments = segments
    bevel.limit_method = "ANGLE"
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=bevel.name)
    for poly in obj.data.polygons:
        poly.use_smooth = True


def box(name, dimensions, location, mat, parent=None, bevel=0.006, collection=None):
    bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0))
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        apply_bevel(obj, min(bevel, min(dimensions) * 0.3))
    obj.data.materials.append(mat)
    if parent:
        obj.parent = parent
        obj.location = location
    else:
        obj.location = location
    if collection:
        for current in list(obj.users_collection):
            current.objects.unlink(obj)
        collection.objects.link(obj)
    return obj


def cylinder(name, radius, depth, location, rotation, mat, parent=None, vertices=48, collection=None):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=(0, 0, 0), rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    apply_bevel(obj, min(0.004, radius * 0.2), 3)
    obj.data.materials.append(mat)
    if parent:
        obj.parent = parent
        obj.location = location
    else:
        obj.location = location
    if collection:
        for current in list(obj.users_collection):
            current.objects.unlink(obj)
        collection.objects.link(obj)
    return obj


def add_panel(parent, prefix, center_x, center_z, width, height, white, inset):
    # A shallow inset surface and two stepped molding rings reproduce the reference door.
    box(prefix + "_Inset", (width - 0.055, 0.012, height - 0.055),
        (center_x, -0.030, center_z), inset, parent, bevel=0.004, collection=door_collection)
    for ring, margin in enumerate((0.0, 0.038)):
        rail = 0.034 if ring == 0 else 0.022
        depth = 0.022 if ring == 0 else 0.016
        y = -0.043 - ring * 0.010
        w = width - margin * 2
        h = height - margin * 2
        box(f"{prefix}_R{ring + 1}_Top", (w, depth, rail), (center_x, y, center_z + h / 2 - rail / 2), white, parent, 0.005, door_collection)
        box(f"{prefix}_R{ring + 1}_Bottom", (w, depth, rail), (center_x, y, center_z - h / 2 + rail / 2), white, parent, 0.005, door_collection)
        box(f"{prefix}_R{ring + 1}_Left", (rail, depth, h - rail * 2), (center_x - w / 2 + rail / 2, y, center_z), white, parent, 0.005, door_collection)
        box(f"{prefix}_R{ring + 1}_Right", (rail, depth, h - rail * 2), (center_x + w / 2 - rail / 2, y, center_z), white, parent, 0.005, door_collection)


def point_camera(camera, target):
    direction = Vector(target) - camera.location
    camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


clear_scene()

door_collection = bpy.data.collections.new("YUANBAI_Door_Model")
bpy.context.scene.collection.children.link(door_collection)
preview_collection = bpy.data.collections.new("Preview_Environment")
bpy.context.scene.collection.children.link(preview_collection)

white = material("Door_White_Painted_Wood", (0.82, 0.82, 0.80), 0.38, 0.0)
inset_white = material("Door_Inset_Shadow", (0.68, 0.69, 0.68), 0.5, 0.0)
seal = material("Door_Dark_Seal", (0.035, 0.04, 0.04), 0.62, 0.0)
metal = material("Handle_Dark_Metal", (0.055, 0.06, 0.065), 0.2, 0.82)
hinge_metal = material("Hinge_Brushed_Metal", (0.19, 0.2, 0.21), 0.28, 0.72)
wall_mat = material("Preview_Wall", (0.075, 0.082, 0.086), 0.72, 0.0)
floor_mat = material("Preview_Floor", (0.035, 0.04, 0.043), 0.5, 0.0)

root = bpy.data.objects.new("Door_Root", None)
root.empty_display_type = "PLAIN_AXES"
root["asset"] = "YUANBAI architectural door"
root["dimensions_m"] = "0.90 x 2.10"
root["hinge_side"] = "right"
door_collection.objects.link(root)

frame_root = bpy.data.objects.new("Door_Frame", None)
frame_root.empty_display_type = "CUBE"
frame_root.parent = root
door_collection.objects.link(frame_root)

# Structural jamb and decorative architrave remain static.
box("Frame_Left_Jamb", (0.12, 0.12, 2.28), (-0.53, 0.015, 1.14), white, frame_root, 0.009, door_collection)
box("Frame_Right_Jamb", (0.12, 0.12, 2.28), (0.53, 0.015, 1.14), white, frame_root, 0.009, door_collection)
box("Frame_Top_Jamb", (1.18, 0.12, 0.12), (0.0, 0.015, 2.22), white, frame_root, 0.009, door_collection)
box("Frame_Left_Inner_Trim", (0.035, 0.052, 2.12), (-0.468, -0.052, 1.06), inset_white, frame_root, 0.004, door_collection)
box("Frame_Right_Inner_Trim", (0.035, 0.052, 2.12), (0.468, -0.052, 1.06), inset_white, frame_root, 0.004, door_collection)
box("Frame_Top_Inner_Trim", (0.97, 0.052, 0.035), (0.0, -0.052, 2.115), inset_white, frame_root, 0.004, door_collection)
box("Frame_Bottom_Seal", (0.92, 0.045, 0.026), (0.0, -0.014, 0.014), seal, frame_root, 0.003, door_collection)

# Right-hand hinge pivot. All moving parts are children of this empty.
leaf_root = bpy.data.objects.new("Door_Leaf", None)
leaf_root.empty_display_type = "ARROWS"
leaf_root.empty_display_size = 0.16
leaf_root.location = (0.45, 0.0, 0.0)
leaf_root.parent = root
leaf_root["animation_role"] = "hinge_pivot"
door_collection.objects.link(leaf_root)

box("Door_Leaf_Slab", (0.90, 0.052, 2.10), (-0.45, 0.0, 1.05), white, leaf_root, 0.009, door_collection)

# Raised panels echo the reference: one tall upper panel and one shorter lower panel.
add_panel(leaf_root, "Upper_Panel", -0.45, 1.48, 0.67, 0.78, white, inset_white)
add_panel(leaf_root, "Lower_Panel", -0.45, 0.53, 0.67, 0.50, white, inset_white)

# Handle and lock on the left side of the leaf.
handle_x = -0.79
cylinder("Handle_Rosette", 0.046, 0.026, (handle_x, -0.052, 1.03), (math.radians(90), 0, 0), metal, leaf_root, 48, door_collection)
cylinder("Handle_Spindle", 0.016, 0.07, (handle_x, -0.081, 1.03), (math.radians(90), 0, 0), metal, leaf_root, 32, door_collection)
lever = cylinder("Handle_Lever", 0.015, 0.22, (handle_x + 0.095, -0.108, 1.03), (0, math.radians(90), 0), metal, leaf_root, 32, door_collection)
lever.rotation_euler.z = math.radians(-4)
cylinder("Lock_Rosette", 0.040, 0.022, (handle_x, -0.052, 0.91), (math.radians(90), 0, 0), metal, leaf_root, 48, door_collection)
cylinder("Lock_Keyway", 0.010, 0.028, (handle_x, -0.071, 0.91), (math.radians(90), 0, 0), seal, leaf_root, 24, door_collection)

# Three visible hinge barrels reinforce the correct pivot side.
for index, z in enumerate((0.34, 1.05, 1.76), start=1):
    cylinder(f"Hinge_{index}", 0.018, 0.14, (0.0, 0.024, z), (0, 0, 0), hinge_metal, leaf_root, 32, door_collection)

# Opening animation: closed hold, then a smooth 92-degree swing toward the viewer.
scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end = 72
leaf_root.rotation_euler = (0.0, 0.0, 0.0)
leaf_root.keyframe_insert(data_path="rotation_euler", frame=1)
leaf_root.keyframe_insert(data_path="rotation_euler", frame=12)
leaf_root.rotation_euler.z = math.radians(92)
leaf_root.keyframe_insert(data_path="rotation_euler", frame=72)
if leaf_root.animation_data and leaf_root.animation_data.action:
    leaf_root.animation_data.action.name = "Door_Open"
    for fcurve in leaf_root.animation_data.action.fcurves:
        for point in fcurve.keyframe_points:
            point.interpolation = "BEZIER"
            point.handle_left_type = "AUTO_CLAMPED"
            point.handle_right_type = "AUTO_CLAMPED"
scene.frame_set(1)

# Preview wall and floor live in a separate collection and are not exported to GLB.
box("Preview_Wall", (4.6, 0.10, 3.2), (0, 0.24, 1.55), wall_mat, None, 0.015, preview_collection)
box("Preview_Floor", (4.6, 4.0, 0.08), (0, -0.75, -0.06), floor_mat, None, 0.012, preview_collection)

bpy.ops.object.light_add(type="AREA", location=(0.0, -2.5, 3.7))
key = bpy.context.object
key.name = "Preview_Key_Light"
key.data.energy = 980
key.data.shape = "DISK"
key.data.size = 3.0
point_camera(key, (0, 0, 1.1))
for current in list(key.users_collection):
    current.objects.unlink(key)
preview_collection.objects.link(key)

bpy.ops.object.light_add(type="AREA", location=(-2.2, -1.0, 1.6))
fill = bpy.context.object
fill.name = "Preview_Fill_Light"
fill.data.energy = 420
fill.data.color = (0.55, 0.72, 1.0)
fill.data.size = 2.0
point_camera(fill, (0, 0, 1.1))
for current in list(fill.users_collection):
    current.objects.unlink(fill)
preview_collection.objects.link(fill)

bpy.ops.object.camera_add(location=(2.75, -5.25, 2.45))
camera = bpy.context.object
camera.name = "Preview_Camera"
camera.data.lens = 61
point_camera(camera, (0.0, 0.0, 1.08))
scene.camera = camera
for current in list(camera.users_collection):
    current.objects.unlink(camera)
preview_collection.objects.link(camera)

scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.render.resolution_x = 720
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = PREVIEW_PATH
scene.render.film_transparent = False
scene.world.color = (0.008, 0.01, 0.012)
scene.view_settings.look = "AgX - Medium High Contrast"

bpy.ops.wm.save_as_mainfile(filepath=BLEND_PATH)

# Export only the reusable door asset, preserving hierarchy and animation.
bpy.ops.object.select_all(action="DESELECT")
for obj in door_collection.objects:
    obj.select_set(True)
bpy.context.view_layer.objects.active = root
bpy.ops.export_scene.gltf(
    filepath=GLB_PATH,
    export_format="GLB",
    use_selection=True,
    export_animations=True,
    export_apply=False,
    export_yup=True,
)

# Render an open-door preview without changing the saved closed starting frame.
scene.frame_set(58)
scene.render.filepath = PREVIEW_PATH
bpy.ops.render.render(write_still=True)
scene.frame_set(1)
bpy.ops.wm.save_as_mainfile(filepath=BLEND_PATH)

print("YUANBAI_DOOR_COMPLETE")
print(BLEND_PATH)
print(GLB_PATH)
print(PREVIEW_PATH)
