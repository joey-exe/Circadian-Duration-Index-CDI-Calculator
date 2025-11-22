# CDI Calculator v3.1.1 - Offline Executable Release

## 🎉 Major Update: Offline Desktop Application Available!

This release introduces **standalone desktop applications** for Windows and Linux that run completely offline without any installation or internet connection required.

---

## 📦 Downloads

### Windows (Recommended for Windows users)
- **File**: `CDI-Calculator-3.1.1-Windows-Portable.zip` (214 MB)
- **How to use**:
  1. Download and extract the ZIP file
  2. Open the `win-unpacked` folder
  3. Run `CDI Calculator.exe`

**Note**: Windows may show a SmartScreen warning. Click "More info" → "Run anyway" (the app is safe, just unsigned).

### Linux - AppImage (Recommended for all Linux distros)
- **File**: `CDI Calculator-3.1.1.AppImage` (194 MB)
- **How to use**:
  ```bash
  chmod +x "CDI Calculator-3.1.1.AppImage"
  ./"CDI Calculator-3.1.1.AppImage"
  ```

### Linux - Debian Package (Ubuntu, Debian, Mint, Pop!_OS)
- **File**: `cdi-calculator_3.1.1_amd64.deb` (136 MB)
- **How to install**:
  ```bash
  sudo dpkg -i cdi-calculator_3.1.1_amd64.deb
  ```
  Then run: `cdi-calculator`

---

## ✨ What's New in v3.1.1

### Offline Desktop Application
- ✅ **Complete offline functionality** - No internet required
- ✅ **No installation needed** - Portable versions run immediately
- ✅ **Native desktop integration** - Menu bar, keyboard shortcuts, and native dialogs
- ✅ **Cross-platform** - Available for Windows, Linux (and macOS buildable from source)
- ✅ **All CDI Calculator features** - Complete functionality from the web version
- ✅ **Privacy-safe** - All data processed locally on your machine

### Desktop Features
- **Menu Bar** with File, Edit, View, and Help menus
- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + Q` - Quit
  - `Ctrl/Cmd + R` - Reload
  - `Ctrl/Cmd + Shift + I` - Developer tools
  - `Ctrl/Cmd + 0/-/+` - Zoom controls
  - `F11` - Fullscreen
- **About Dialog** with version info and citation
- **Native File Operations** - Copy, paste, cut, undo, redo

### Technical Implementation
- Built with **Electron** for cross-platform desktop applications
- Packaged with **electron-builder** for easy distribution
- Optimized build configuration for offline operation
- Comprehensive error handling and menu integration

---

## 📋 Full Feature List

All features from the web version are included:

### Core CDI Calculation
- ✅ **Circadian Duration Index** calculation using Richardson et al. (2023) method
- ✅ **Custom CDI thresholds** - Editable inline with real-time validation
- ✅ **Bottom 5% filtering** - Improved accuracy by filtering noise
- ✅ **Multi-day data support** - Up to 14 days with automatic averaging

### Advanced Analysis
- ✅ **Phase shift analysis** - Automatic calculation using Δφ = τ - 24h
- ✅ **Custom circadian period** - Support for non-24h periods
- ✅ **Baseline comparison** - Compare experimental data against control
- ✅ **Auto-detection** - Automatic time resolution and day detection

### Data Import/Export
- ✅ **Multiple input methods** - Manual entry, CSV upload, sample data
- ✅ **CSV parser** - Supports various CSV formats
- ✅ **JSON export** - Complete results with metadata
- ✅ **Sample data** - Built-in example for testing

### Visualization
- ✅ **Activity distribution charts** - Bar charts with activity patterns
- ✅ **Cumulative activity curves** - Line charts showing 95% threshold
- ✅ **Interactive charts** - Powered by Recharts
- ✅ **Responsive design** - Adapts to window size

---

## 🖥️ System Requirements

### Windows
- Windows 7 or later (64-bit)
- ~500 MB disk space
- 4 GB RAM recommended

### Linux
- 64-bit Linux distribution
- GLIBC 2.17 or later
- ~500 MB disk space
- 4 GB RAM recommended

---

## 📖 Documentation

- **[OFFLINE_EXECUTABLE_GUIDE.md](OFFLINE_EXECUTABLE_GUIDE.md)** - Detailed user guide with download and usage instructions
- **[ELECTRON_BUILD.md](ELECTRON_BUILD.md)** - Technical documentation for building from source
- **[README.md](README.md)** - Complete project documentation

---

## 🔧 Building from Source

If you want to build the executables yourself:

```bash
# Install dependencies
npm install

# Build for your platform
npm run electron:build:win      # Windows
npm run electron:build:linux    # Linux
npm run electron:build:mac      # macOS (requires macOS)
npm run electron:build          # All platforms

# Development mode
npm run electron:dev
```

---

## 🐛 Known Issues & Troubleshooting

### Windows SmartScreen Warning
**Issue**: Windows shows "Windows protected your PC" warning
**Solution**: Click "More info" → "Run anyway" (the app is unsigned but safe)

### Linux AppImage Won't Run
**Issue**: Permission denied or FUSE errors
**Solution**:
```bash
# Make executable
chmod +x "CDI Calculator-3.1.1.AppImage"

# Install FUSE if needed
sudo apt install fuse libfuse2  # Ubuntu/Debian
sudo dnf install fuse fuse-libs # Fedora
```

---

## 📧 Support

### Technical Support
**Email**: joey.taylor.exe@gmail.com
**Subject**: CDI Calculator v3.1.1 - [Your Issue]

### Scientific Methodology
**Email**: mrichardson@oakwood.edu
**Contact**: Dr. Melissa E. Richardson PhD

---

## 🔬 Citation

If using this tool in research, please cite:

**Richardson, M.E.S., et al. (2023)**. "Reversible suppression of circadian-driven locomotor rhythms in mice using a gradual fragmentation of the day-night cycle." *Scientific Reports*, 13(1), 14423. https://doi.org/10.1038/s41598-023-41029-0

---

## 📄 License

This software is licensed under **GPL-3.0**

---

## 🙏 Acknowledgments

- **Author**: Yeshuwa Taylor
- **Scientific Methodology**: Dr. Melissa E. Richardson PhD
- **Based on**: Richardson et al. (2023) CDI method
- **Built with**: React, Electron, Recharts, Tailwind CSS

---

## 📚 Version History

### v3.1.1 (Current - Offline Executable Release)
- Added Electron-based desktop application
- Windows portable executable (.zip)
- Linux AppImage and .deb packages
- Native desktop menus and keyboard shortcuts
- Complete offline functionality
- Updated documentation

### v3.1.0
- Version badge display
- Enhanced sample data
- Full CSV display
- Perfect backspace support
- Aesthetic CDI interpretation
- Clear baseline feature

### v3.0.0
- Custom CDI thresholds
- Circadian phase shift (Δφ = τ - 24h)
- Bottom 5% filtering
- Integer hour displays
- Fixed CSV parser bug
- Enhanced UI/UX

### v2.0.0
- Automatic time resolution detection
- Extended multi-day support (14 days)
- Simplified user interface
- Period lengthening feature

### v1.0.0
- Initial release
- Basic CDI calculation
- Multi-day support (3 days)
- Interactive visualizations

---

**Release Date**: November 13, 2025
**Release Tag**: v3.1.1
**Commit**: bc18851

Made with ❤️ for Circadian Research
