from rembg import remove
from PIL import Image
import io

# Paths
lina_path = "/home/ubuntu/upload/3649cbc5-0671-4ddc-845f-519a31637630.png"
bg_path = "/home/ubuntu/lina-voice-premium/client/public/images/thumbnail-bg.png"
output_path = "/home/ubuntu/lina-voice-premium/client/public/images/project-thumbnail-final-nobg.png"

# Load LINA image
with open(lina_path, 'rb') as i:
    input_data = i.read()
    # Remove background
    print("Removing background...")
    subject_data = remove(input_data)
    lina = Image.open(io.BytesIO(subject_data)).convert("RGBA")

# Load Background
bg = Image.open(bg_path).convert("RGBA")

# Target size for thumbnail
target_width = 960
target_height = 600

# Resize background to cover target size (same logic as before)
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

# Resize LINA to fit nicely (e.g., 90% of height to be prominent)
lina_height = int(target_height * 0.95)
lina_ratio = lina.width / lina.height
lina_width = int(lina_height * lina_ratio)
lina = lina.resize((lina_width, lina_height), Image.Resampling.LANCZOS)

# Center LINA
x_offset = (target_width - lina_width) // 2
y_offset = (target_height - lina_height) // 2

# Composite
final_image = Image.new("RGBA", (target_width, target_height))
final_image.paste(bg, (0, 0))
final_image.paste(lina, (x_offset, y_offset), lina)

# Save
final_image.save(output_path)
print(f"Thumbnail saved to {output_path}")
