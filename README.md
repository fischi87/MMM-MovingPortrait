# MMM-MovingPortrait

A MagicMirror² module that displays animated portrait videos with support for multiple portraits, rotation, smooth transitions, and customizable frame styles.

Perfect for creating a Hogwarts-style moving portrait gallery on your MagicMirror!

![Example](screenshots/example.png)

## Features

- 📹 **Multiple Portrait Support** - Display and rotate between multiple videos
- 🔄 **Smooth Transitions** - Crossfade between portraits with configurable duration
- 🖼️ **Frame Styles** - Choose from Hogwarts Gold, Vintage Wood, Modern, or No Frame
- ✨ **Soft Edges** - Optional smooth edge transitions for a painted look
- 📝 **Name Overlay** - Show character names with stylish overlay
- ⚙️ **Fully Configurable** - Customize size, opacity, timing, and more
- 🎨 **CSS Customizable** - Easy to extend with your own frame styles

## Installation

1. Navigate to your MagicMirror's `modules` folder:
```bash
cd ~/MagicMirror/modules
```

2. Clone this repository:
```bash
git clone https://github.com/fischi87/MMM-MovingPortrait.git
```

3. Create a `videos` folder in the module directory:
```bash
cd MMM-MovingPortrait
mkdir videos
```

4. Add your portrait videos to the `videos` folder:
```bash
# Copy your video files
cp /path/to/your/portrait.mp4 videos/
```

## Configuration

Add the module to your `config/config.js` file:

### Minimal Configuration

```javascript
{
    module: "MMM-MovingPortrait",
    position: "middle_center",
    config: {
        portraits: [
            { file: "wizard.mp4", name: "Albus Dumbledore" }
        ]
    }
}
```

### Full Configuration with All Options

```javascript
{
    module: "MMM-MovingPortrait",
    position: "middle_center",
    config: {
        // Array of portraits
        portraits: [
            { file: "dumbledore.mp4", name: "Albus Dumbledore" },
            { file: "mcgonagall.mp4", name: "Minerva McGonagall" },
            { file: "snape.mp4", name: "Severus Snape" }
        ],
        
        // Display settings
        width: "400px",
        height: "600px",
        opacity: 0.85,
        
        // Frame style: "hogwarts", "vintage", "modern", "none"
        frameStyle: "hogwarts",
        
        // Rotation settings
        rotationInterval: 30000,  // 30 seconds (0 = no rotation)
        fadeTransitionDuration: 2000,  // 2 seconds
        
        // Effects
        softEdges: true,  // Smooth edge transitions
        
        // Name display
        showName: false,  // Show portrait name
        namePosition: "bottom",  // "top" or "bottom"
        
        // Video settings
        autoplay: true,
        loop: true,
        muted: true
    }
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `portraits` | Array | `[{file: "portrait.mp4", name: "Portrait 1"}]` | Array of portrait objects with `file` and optional `name` |
| `width` | String | `"400px"` | Width of the portrait display |
| `height` | String | `"600px"` | Height of the portrait display |
| `opacity` | Number | `0.85` | Opacity of the entire portrait (0.0 to 1.0) |
| `frameStyle` | String | `"hogwarts"` | Frame style: `"hogwarts"`, `"vintage"`, `"modern"`, `"none"` |
| `rotationInterval` | Number | `30000` | Time in milliseconds between portrait changes (0 = no rotation) |
| `fadeTransitionDuration` | Number | `2000` | Duration of crossfade transition in milliseconds |
| `softEdges` | Boolean | `true` | Enable soft edge transitions with box-shadow effect |
| `showName` | Boolean | `false` | Display portrait name as overlay |
| `namePosition` | String | `"bottom"` | Position of name overlay: `"top"` or `"bottom"` |
| `autoplay` | Boolean | `true` | Autoplay videos |
| `loop` | Boolean | `true` | Loop videos |
| `muted` | Boolean | `true` | Mute video audio |

## Frame Styles

### Hogwarts Gold (`frameStyle: "hogwarts"`)
Ornate golden frame with magical glow effect, perfect for wizard portraits.

### Vintage Wood (`frameStyle: "vintage"`)
Classic wooden frame with aged appearance.

### Modern (`frameStyle: "modern"`)
Sleek minimal frame with dark tones.

### None (`frameStyle: "none"`)
No frame, just soft shadow and rounded corners.

## Creating Portrait Videos

### Recommended Tools

1. **Runway Gen-3** (runwayml.com) - Best quality animated portraits
2. **Kling AI** (klingai.com) - Excellent for longer videos
3. **Pika Labs** (pika.art) - Quick and easy

### Video Specifications

- **Format:** MP4 (H.264 codec recommended)
- **Resolution:** 1080x1920 (9:16 portrait) or 768x1152 (2:3)
- **Duration:** 5-10 seconds (will loop automatically)
- **Frame Rate:** 24-30 fps
- **File Size:** Keep under 10MB for best performance

### Creating a Hogwarts-Style Portrait

1. **Generate Base Image** (Leonardo.ai, Midjourney, or Runway):
```
Renaissance oil painting portrait, elderly wizard with long white beard,
burgundy velvet robes, white ruff collar, holding wooden wand,
Tudor era clothing, dark background, aged oil painting texture,
craquelure cracks, museum quality, candlelight
```

2. **Animate in Runway**:
```
Historical oil painting portrait coming to life, subtle head turn,
slow blinking, slight expression change, candlelight flickering,
aged canvas texture visible, dignified movement
```

3. Download as MP4 and copy to `videos/` folder

## Positioning

The module uses absolute positioning by default (centered). You can change this in the CSS or use MagicMirror's standard positions:

- `top_left`, `top_center`, `top_right`
- `upper_third`
- `middle_center`
- `lower_third`
- `bottom_left`, `bottom_center`, `bottom_right`

**Note:** For centered display, use `middle_center` and the module will handle positioning.

## Customization

### Custom Frame Styles

Add your own frame style in `MMM-MovingPortrait.css`:

```css
.portrait-container.frame-custom {
    border: 10px solid #YOUR_COLOR;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
    /* Add your custom styling */
}
```

Then use in config:
```javascript
frameStyle: "custom"
```

### Adjust Soft Edge Effect

Edit the `.soft-edges-overlay` class in CSS:

```css
.soft-edges-overlay {
    box-shadow: inset 0 0 100px 60px black;  /* Adjust values */
}
```

## Troubleshooting

### Videos not playing

1. **Check video path:**
```bash
ls ~/MagicMirror/modules/MMM-MovingPortrait/videos/
```

2. **Verify video format:**
```bash
file ~/MagicMirror/modules/MMM-MovingPortrait/videos/your-video.mp4
```
Should show: `ISO Media, MP4 Base Media v1`

3. **Check browser console:**
Press `Ctrl+Shift+I` on your MagicMirror and look for errors

### Videos are choppy

- Reduce video resolution
- Reduce file size (compress videos)
- Use H.264 codec
- Reduce `rotationInterval` if rotating multiple videos

### Module not appearing

1. Check MagicMirror logs:
```bash
pm2 logs mm
```

2. Verify config.js syntax:
```bash
cd ~/MagicMirror
npm run config:check
```

3. Restart MagicMirror:
```bash
pm2 restart mm
```

## Examples

### Single Portrait

```javascript
{
    module: "MMM-MovingPortrait",
    position: "top_left",
    config: {
        portraits: [
            { file: "dumbledore.mp4", name: "Headmaster" }
        ],
        width: "300px",
        height: "450px",
        frameStyle: "hogwarts",
        showName: true
    }
}
```

### Rotating Gallery

```javascript
{
    module: "MMM-MovingPortrait",
    position: "middle_center",
    config: {
        portraits: [
            { file: "wizard1.mp4", name: "Albus Dumbledore" },
            { file: "wizard2.mp4", name: "Minerva McGonagall" },
            { file: "wizard3.mp4", name: "Severus Snape" },
            { file: "wizard4.mp4", name: "Pomona Sprout" }
        ],
        width: "500px",
        height: "750px",
        frameStyle: "hogwarts",
        rotationInterval: 20000,  // 20 seconds
        fadeTransitionDuration: 3000,  // 3 second fade
        showName: true,
        namePosition: "bottom"
    }
}
```

### Minimal Modern Style

```javascript
{
    module: "MMM-MovingPortrait",
    position: "top_right",
    config: {
        portraits: [
            { file: "portrait.mp4" }
        ],
        width: "350px",
        height: "500px",
        opacity: 0.9,
        frameStyle: "modern",
        softEdges: false
    }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Credits

Created by Axel

Inspired by the moving portraits from Harry Potter and the Hogwarts castle.

## Changelog

### Version 1.0.0 (2026-01-11)
- Initial release
- Multiple portrait support with rotation
- Four frame styles (Hogwarts, Vintage, Modern, None)
- Smooth crossfade transitions
- Soft edge effects
- Name overlay support
- Fully configurable

## Support

If you encounter any issues or have feature requests, please open an issue on GitHub.

---

**Made with ❤️ for MagicMirror²**
