# Contributing to MMM-MovingPortrait

First off, thank you for considering contributing to MMM-MovingPortrait! 🎉

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (config snippets, video formats, etc.)
- **Describe the behavior you observed** and what you expected
- **Include screenshots or videos** if applicable
- **Environment details:**
  - MagicMirror² version
  - Node.js version
  - Operating system
  - Browser (if applicable)

### Suggesting Features

Feature suggestions are welcome! Please:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested feature
- **Explain why this feature would be useful** to most users
- **Provide examples** of how it would work

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes:**
   - Follow the existing code style
   - Comment your code where necessary
   - Update README.md if needed
3. **Test your changes** thoroughly
4. **Update CHANGELOG.md** with your changes
5. **Submit a pull request** with a clear description

## Development Guidelines

### Code Style

- Use **2 spaces** for indentation (no tabs)
- Use **camelCase** for JavaScript variables and functions
- Use **kebab-case** for CSS classes
- Add **comments** for complex logic
- Keep **functions small and focused**

### JavaScript

```javascript
// Good
function rotatePortrait() {
    this.currentIndex = (this.currentIndex + 1) % this.config.portraits.length;
    this.updateDisplay();
}

// Avoid
function doStuff() {
    // 100 lines of mixed concerns
}
```

### CSS

```css
/* Good - Clear, organized, commented */
.portrait-container {
    position: relative;
    display: inline-block;
    /* Center the video within container */
    overflow: visible;
}

/* Avoid - Unclear, mixed concerns */
.pc {
    position: relative; display: inline-block; overflow: visible; margin: 0; padding: 0;
}
```

### Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when relevant

Examples:
```
Add vintage frame style option
Fix video rotation timing issue
Update README with new configuration options
Refactor CSS for better organization
```

### Testing

Before submitting a pull request:

1. **Test on actual MagicMirror²** - Not just in browser
2. **Test with multiple configurations** - Different frame styles, rotation settings, etc.
3. **Test video formats** - Ensure compatibility with common formats
4. **Check browser console** - No JavaScript errors
5. **Test on different screen sizes** - If applicable

### Adding New Frame Styles

When adding a new frame style:

1. Add CSS class in `MMM-MovingPortrait.css`:
```css
.portrait-container.frame-yourname {
    /* Your styling */
}
```

2. Update README.md with:
   - Description of the frame style
   - Screenshot if possible
   - Example configuration

3. Add example to `examples/config.js.example`

### Documentation

- Update README.md for any user-facing changes
- Update CHANGELOG.md following Keep a Changelog format
- Add JSDoc comments for new functions
- Include examples for new features

## Project Structure

```
MMM-MovingPortrait/
├── MMM-MovingPortrait.js       # Main module logic
├── MMM-MovingPortrait.css      # Styling and frame styles
├── README.md                   # User documentation
├── CHANGELOG.md                # Version history
├── CONTRIBUTING.md             # This file
├── LICENSE                     # MIT License
├── package.json                # NPM metadata
├── .gitignore                  # Git ignore rules
├── videos/                     # User video files
├── screenshots/                # Screenshots for README
└── examples/                   # Example configurations
    └── config.js.example
```

## Feature Roadmap

Interested in implementing one of these? Great! Open an issue first to discuss:

### High Priority
- [ ] Motion sensor (PIR) integration
- [ ] Time-based activation schedules
- [ ] Better error handling and user feedback

### Medium Priority
- [ ] Audio/sound effects support
- [ ] Touch interaction for manual switching
- [ ] Custom CSS theme system
- [ ] Video preloading optimization

### Low Priority
- [ ] Advanced transition effects (slide, zoom, etc.)
- [ ] Portrait playlist management UI
- [ ] Remote control via notifications
- [ ] Performance metrics and monitoring

## Questions?

Feel free to open an issue with your question, or reach out via GitHub discussions.

## Code of Conduct

### Our Pledge

We are committed to providing a friendly, safe, and welcoming environment for all contributors.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Enforcement

Instances of unacceptable behavior may be reported by opening an issue. All complaints will be reviewed and investigated.

---

Thank you for contributing! 🙏

**Made with ❤️ for the MagicMirror² community**
