# MMM-MovingPortrait - Quick Start 🚀

Get your moving portrait running in 5 minutes!

## Super Fast Setup

### 1. Copy module to MagicMirror
```bash
# On your Raspberry Pi:
cp -r MMM-MovingPortrait ~/MagicMirror/modules/
```

### 2. Add your video
```bash
# Copy your test video (the wizard you already have!)
cp /path/to/test.mp4 ~/MagicMirror/modules/MMM-MovingPortrait/videos/wizard.mp4
```

### 3. Edit config
```bash
nano ~/MagicMirror/config/config.js
```

Add this in the modules array:
```javascript
{
    module: "MMM-MovingPortrait",
    position: "middle_center",
    config: {
        portraits: [
            { file: "wizard.mp4", name: "Wizard" }
        ]
    }
}
```

### 4. Restart
```bash
pm2 restart mm
```

### 5. Enjoy! 🎉

Your portrait should now be visible!

## What You Get

✅ Professional MagicMirror² module  
✅ GitHub-ready with all documentation  
✅ 4 beautiful frame styles  
✅ Smooth rotation between multiple videos  
✅ Completely configurable  

## File Structure

```
MMM-MovingPortrait/
├── MMM-MovingPortrait.js      ← Main module
├── MMM-MovingPortrait.css     ← Styles & frames
├── README.md                  ← Full documentation
├── INSTALL.md                 ← Detailed setup
├── CHANGELOG.md               ← Version history
├── CONTRIBUTING.md            ← Contributor guide
├── LICENSE                    ← MIT License
├── package.json               ← NPM metadata
├── videos/                    ← Put your videos here
├── screenshots/               ← Add screenshots for GitHub
└── examples/                  ← Example configs
    └── config.js.example
```

## Next Steps

1. **Test it** - Make sure it works with your setup
2. **Add screenshots** - Take photos of your setup
3. **Create GitHub repo**:
   ```bash
   cd ~/MagicMirror/modules/MMM-MovingPortrait
   git init
   git add .
   git commit -m "Initial commit - v1.0.0"
   git remote add origin https://github.com/fischi87/MMM-MovingPortrait.git
   git push -u origin main
   ```
4. **Share** - Tell the MagicMirror community!

## Features

- 📹 Multiple portrait rotation
- 🖼️ 4 frame styles (Hogwarts, Vintage, Modern, None)
- ✨ Smooth crossfade transitions
- 🎨 Soft edge effects
- 📝 Character name overlays
- ⚙️ Fully configurable
- 🎯 Professional & polished

## Support

- Full README with examples
- Detailed installation guide
- Troubleshooting section
- Example configurations
- Contributing guidelines

## Ready to Publish? 📦

1. Add your screenshots to `screenshots/`
2. Module is ready for GitHub publishing
3. Test thoroughly
4. Commit and push to GitHub
5. Share on MagicMirror forum!

---

**Made with ❤️ for Hogwarts fans everywhere**
