# Installation & Setup Guide

Complete guide for installing and configuring MMM-MovingPortrait on your MagicMirror².

## Prerequisites

- MagicMirror² version 2.20.0 or higher
- Node.js 14.0.0 or higher
- At least one video file in MP4 format

## Step-by-Step Installation

### 1. Navigate to MagicMirror modules folder

```bash
cd ~/MagicMirror/modules
```

### 2. Clone the repository

```bash
git clone https://github.com/fischi87/MMM-MovingPortrait.git
```

### 3. Enter the module directory

```bash
cd MMM-MovingPortrait
```

### 4. Verify installation

```bash
ls -la
```

You should see:
- MMM-MovingPortrait.js
- MMM-MovingPortrait.css
- README.md
- videos/ folder
- Other documentation files

### 5. Add your video files

```bash
# Option A: Copy from USB drive
cp /media/usb/your-video.mp4 videos/

# Option B: Copy from another location
cp ~/Downloads/your-video.mp4 videos/

# Option C: Use scp from another computer
# From your computer:
scp your-video.mp4 pi@YOUR_PI_IP:/home/pi/MagicMirror/modules/MMM-MovingPortrait/videos/
```

### 6. Verify video files

```bash
ls -lh videos/
```

Should show your video files with sizes.

### 7. Test video format

```bash
file videos/your-video.mp4
```

Should output something like: `ISO Media, MP4 Base Media v1`

## Configuration

### 8. Edit MagicMirror config

```bash
cd ~/MagicMirror
nano config/config.js
```

### 9. Add module configuration

Add this to the `modules:` array:

```javascript
{
    module: "MMM-MovingPortrait",
    position: "middle_center",
    config: {
        portraits: [
            { file: "your-video.mp4", name: "Character Name" }
        ],
        width: "400px",
        height: "600px",
        frameStyle: "hogwarts"
    }
}
```

**Important:** Replace `"your-video.mp4"` with your actual filename!

### 10. Save and exit

- Press `Ctrl + O` to save
- Press `Enter` to confirm
- Press `Ctrl + X` to exit

### 11. Restart MagicMirror

```bash
pm2 restart mm

# Or if not using pm2:
pm2 stop mm
npm start
```

## Verification & Testing

### 12. Check if module loads

Watch the MagicMirror screen. You should see your portrait appear.

### 13. Check for errors

```bash
# If using pm2:
pm2 logs mm

# Look for any errors related to MMM-MovingPortrait
```

### 14. Open browser console

On your MagicMirror:
- Press `Ctrl + Shift + I` (opens Developer Tools)
- Click "Console" tab
- Look for errors (red text)

Common errors:
- `Failed to load resource` → Video file path is wrong
- `Video format not supported` → Video codec issue
- `Module not found` → Installation path problem

## Troubleshooting

### Video not playing

**Check 1: File exists**
```bash
ls -la ~/MagicMirror/modules/MMM-MovingPortrait/videos/
```

**Check 2: File permissions**
```bash
chmod 644 ~/MagicMirror/modules/MMM-MovingPortrait/videos/*.mp4
```

**Check 3: Video format**
```bash
ffprobe videos/your-video.mp4
```

If format is wrong, convert:
```bash
ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
```

### Module not appearing

**Check 1: Syntax error in config**
```bash
cd ~/MagicMirror
npm run config:check
```

**Check 2: Module path**
```bash
ls ~/MagicMirror/modules/MMM-MovingPortrait/MMM-MovingPortrait.js
```

**Check 3: MagicMirror logs**
```bash
pm2 logs mm --lines 50
```

### Frame not showing

Check CSS is loaded:
```bash
ls ~/MagicMirror/modules/MMM-MovingPortrait/MMM-MovingPortrait.css
```

### Performance issues

**Reduce video size:**
```bash
ffmpeg -i input.mp4 -vf scale=768:1152 -c:v libx264 -crf 28 output.mp4
```

**Lower bitrate:**
```bash
ffmpeg -i input.mp4 -b:v 2M output.mp4
```

## Advanced Setup

### Multiple Portraits

```javascript
{
    module: "MMM-MovingPortrait",
    position: "middle_center",
    config: {
        portraits: [
            { file: "wizard1.mp4", name: "Dumbledore" },
            { file: "wizard2.mp4", name: "McGonagall" },
            { file: "wizard3.mp4", name: "Snape" }
        ],
        rotationInterval: 30000,  // 30 seconds
        fadeTransitionDuration: 2000
    }
}
```

### Custom Position

For exact positioning, edit CSS:
```bash
nano ~/MagicMirror/modules/MMM-MovingPortrait/MMM-MovingPortrait.css
```

Modify:
```css
.module.MMM-MovingPortrait {
    position: absolute;
    top: 100px;  /* Adjust */
    left: 50px;  /* Adjust */
    transform: none;
}
```

### Auto-start on Boot

```bash
# Make sure pm2 starts on boot
pm2 startup
pm2 save
```

## Testing Checklist

- [ ] Module appears on screen
- [ ] Video plays automatically
- [ ] Video loops correctly
- [ ] Frame style is correct
- [ ] No errors in console
- [ ] No errors in pm2 logs
- [ ] Portrait rotates (if multiple configured)
- [ ] Transitions are smooth
- [ ] Name overlay works (if enabled)
- [ ] Performance is acceptable

## Getting Help

If you encounter issues:

1. **Check the README** - Many answers are there
2. **Search existing issues** on GitHub
3. **Open a new issue** with:
   - MagicMirror version
   - Node.js version (`node --version`)
   - Your config (sanitized)
   - Error messages
   - Screenshots

## Next Steps

- [ ] Add more portraits
- [ ] Try different frame styles
- [ ] Experiment with sizes and positions
- [ ] Share your setup!
- [ ] Contribute improvements

---

**Enjoy your magical moving portraits! 🎨✨**
