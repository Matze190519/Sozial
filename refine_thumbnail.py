from rembg import remove
from PIL import Image, ImageEnhance, ImageFilter, ImageChops
import io

# Paths
lina_path = "/home/ubuntu/upload/3649cbc5-0671-4ddc-845f-519a31637630.png"
bg_path = "/home/ubuntu/lina-voice-premium/client/public/images/thumbnail-bg.png"
output_path = "/home/ubuntu/lina-voice-premium/client/public/images/project-thumbnail-refined.png"

# 1. Load and Remove Background
print("Loading and removing background...")
with open(lina_path, 'rb') as i:
    input_data = i.read()
    subject_data = remove(input_data)
    lina = Image.open(io.BytesIO(subject_data)).convert("RGBA")

# 2. Prepare Background
bg = Image.open(bg_path).convert("RGBA")
target_width = 960
target_height = 600

# Resize/Crop Background (same logic)
bg_ratio = bg.width / bg.height
target_ratio = target_width / target_height
if bg_ratio > target_ratio:
    new_height = target_height
    new_width = int(new_height * bg_ratio)
else:
    new_width = target_width
    new_height = int(new_width / bg_ratio)
bg = bg.resize((new_width, new_height), Image.Resampling.LANCZOS)
left = (new_width - target_width) / 2
top = (new_height - target_height) / 2
bg = bg.crop((left, top, left + target_width, top + target_height))

# 3. Process LINA
# Resize to 95% height
lina_height = int(target_height * 0.95)
lina_ratio = lina.width / lina.height
lina_width = int(lina_height * lina_ratio)
lina = lina.resize((lina_width, lina_height), Image.Resampling.LANCZOS)

# A. Color Grading (Tint)
# Create a cyan/purple gradient or solid overlay to match the scene
tint_color = (0, 255, 255, 100) # Cyan with low alpha
tint_layer = Image.new("RGBA", lina.size, tint_color)
# Blend tint only where alpha > 0
lina_tinted = Image.alpha_composite(lina, ImageChops.multiply(lina, tint_layer))
# Actually, let's just blend a solid color with 'overlay' mode or soft light if possible. 
# Simpler approach: Blend original with a colored version.
overlay = Image.new('RGBA', lina.size, (50, 0, 100, 0)) # Dark purple tint
lina = Image.alpha_composite(lina, Image.new("RGBA", lina.size, (0,0,0,0))) # Ensure alpha is clean
# Let's use ImageEnhance to adjust contrast/brightness first
enhancer = ImageEnhance.Contrast(lina)
lina = enhancer.enhance(1.1) # Slight contrast boost
enhancer = ImageEnhance.Brightness(lina)
lina = enhancer.enhance(0.95) # Slight dimming to fit dark scene

# B. Outer Glow (Backlight effect)
# Extract alpha channel
alpha = lina.getchannel('A')
# Create a glow layer
glow_color = (0, 255, 255) # Cyan glow
glow = Image.new('RGB', lina.size, glow_color)
mask = alpha.point(lambda p: p * 0.6) # Reduce opacity of glow
# Blur the mask to create soft glow
blur_radius = 15
mask_blurred = mask.filter(ImageFilter.GaussianBlur(blur_radius))
glow_layer = Image.new('RGBA', lina.size, (0,0,0,0))
glow_layer.paste(glow, (0,0), mask_blurred)

# 4. Composite
final_image = Image.new("RGBA", (target_width, target_height))
final_image.paste(bg, (0, 0))

# Center coordinates
x_offset = (target_width - lina_width) // 2
y_offset = (target_height - lina_height) // 2

# Paste Glow first (behind LINA)
final_image.paste(glow_layer, (x_offset, y_offset), glow_layer)
# Paste LINA
final_image.paste(lina, (x_offset, y_offset), lina)

# 5. Final Global Adjustments (Optional)
# Maybe add a slight vignette or overlay on top of everything to unify?
# Let's keep it clean for now.

final_image.save(output_path)
print(f"Refined thumbnail saved to {output_path}")
