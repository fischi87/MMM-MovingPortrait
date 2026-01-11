# Screenshots

This folder contains screenshots and demo images for the MMM-MovingPortrait module.

## Required Screenshots

Before publishing to GitHub, please add:

1. **example.png** - Main screenshot showing the module in action
   - Recommended size: 1920x1080 or similar
   - Show a portrait with frame style visible
   - Include some MagicMirror elements for context

2. **frame-hogwarts.png** - Hogwarts gold frame style
3. **frame-vintage.png** - Vintage wood frame style
4. **frame-modern.png** - Modern minimal frame style
5. **frame-none.png** - No frame style

## Screenshot Tips

- Use a real MagicMirror² setup or realistic mockup
- Ensure good lighting in photos
- Crop to focus on the portrait module
- Use high resolution (at least 1080p)
- Show the portrait in action (not paused)

## Taking Screenshots on Raspberry Pi

```bash
# Install scrot if not already installed
sudo apt-get install scrot

# Take screenshot
scrot screenshot.png

# Or with delay (5 seconds)
scrot -d 5 screenshot.png

# Copy to this folder
mv screenshot.png ~/MagicMirror/modules/MMM-MovingPortrait/screenshots/
```

## Editing Screenshots

You can use tools like GIMP or online editors to:
- Crop and resize
- Add borders or highlights
- Adjust brightness/contrast
- Add annotations if needed

---

**Note:** Screenshots help users understand what the module looks like before installing it. High-quality screenshots increase adoption!
