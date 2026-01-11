# Changelog

All notable changes to MMM-MovingPortrait will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-11

### Added
- **Notification Support** - Full notification system for controlling the module
  - `PORTRAIT_SHOW` - Show the module
  - `PORTRAIT_HIDE` - Hide the module
  - `PORTRAIT_TOGGLE` - Toggle between show/hide states
  - `PORTRAIT_NEXT` - Navigate to next portrait
  - `PORTRAIT_PREVIOUS` - Navigate to previous portrait
  - `PORTRAIT_SELECT` - Select portrait by index or name
  - `PORTRAIT_PAUSE` - Pause automatic rotation
  - `PORTRAIT_RESUME` - Resume automatic rotation
  - `PORTRAIT_STOP_ROTATION` - Stop rotation completely
- Module visibility control (show/hide functionality)
- Enhanced rotation pause/resume capability
- Better integration with other MagicMirror² modules

### Improved
- Code structure with `updatePortraitDisplay()` helper method
- Better state management for visibility and rotation pause states
- Enhanced logging for notification events

## [1.0.0] - 2026-01-11

### Added
- Initial release of MMM-MovingPortrait
- Multiple portrait support with configurable rotation
- Four frame styles: Hogwarts Gold, Vintage Wood, Modern, and None
- Smooth crossfade transitions between portraits
- Soft edge effects using box-shadow overlay
- Portrait name overlay with top/bottom positioning
- Configurable video display settings (width, height, opacity)
- Configurable rotation interval and fade duration
- Full CSS customization support
- Comprehensive README with examples
- MIT License
- Example configurations
- Support for standard MagicMirror² positions

### Features
- Automatic video looping
- Responsive design considerations
- Print-friendly CSS
- Hover effects (for touch/mouse enabled mirrors)
- Loading state handling
- Multiple example configurations

### Documentation
- Complete README with installation guide
- Configuration options table
- Troubleshooting section
- Video creation guide with AI tool recommendations
- Multiple usage examples
- Frame style descriptions
- Customization instructions

## [Unreleased]

### Planned Features for Future Versions
- Motion sensor integration (PIR sensor support)
- Time-based activation schedules
- Audio/sound effect support
- Touch interaction for manual portrait switching
- Custom CSS themes
- Portrait playlist management
- Advanced transition effects
- Performance optimization for multiple concurrent videos
- Video preloading for smoother transitions

---

## Version History

- **1.0.0** (2026-01-11) - Initial Release
