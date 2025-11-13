# CDI Calculator - Offline Executable Guide

## 🎉 Quick Start

Your offline executables are ready in the `dist/` folder!

### Windows Users (Recommended)
**Download**: `CDI-Calculator-3.1.1-Windows-Portable.zip` (214 MB)

**How to Use:**
1. Extract the ZIP file to any folder
2. Open the extracted `win-unpacked` folder
3. Double-click `CDI Calculator.exe`
4. The application will start immediately - no installation needed!

**Note**: Windows may show a SmartScreen warning since the app isn't code-signed. Click "More info" → "Run anyway" to proceed.

### Linux Users

#### Option 1: AppImage (Recommended - Works on any Linux distro)
**Download**: `CDI Calculator-3.1.1.AppImage` (194 MB)

**How to Use:**
```bash
chmod +x "CDI Calculator-3.1.1.AppImage"
./"CDI Calculator-3.1.1.AppImage"
```

#### Option 2: Debian Package (Ubuntu, Debian, Mint, etc.)
**Download**: `cdi-calculator_3.1.1_amd64.deb` (136 MB)

**How to Install:**
```bash
sudo dpkg -i cdi-calculator_3.1.1_amd64.deb
# Or double-click in file manager to install via Software Center
```

Then launch from Applications menu or run:
```bash
cdi-calculator
```

## 📦 Distribution Files Summary

| File | Size | Platform | Type | Recommended |
|------|------|----------|------|-------------|
| `CDI-Calculator-3.1.1-Windows-Portable.zip` | 214 MB | Windows | Portable | ✅ **YES** |
| `CDI Calculator-3.1.1.AppImage` | 194 MB | Linux | Portable | ✅ **YES** |
| `cdi-calculator_3.1.1_amd64.deb` | 136 MB | Debian/Ubuntu | Installable | ✅ **YES** |
| `CDI Calculator Setup 3.1.1.exe` | 185 KB | Windows | Installer | ❌ Incomplete |

## ✨ Features

All offline executables include:
- ✅ **No Internet Required**: Runs completely offline
- ✅ **No Installation Required**: Portable versions run directly
- ✅ **Complete Functionality**: All CDI Calculator features included
- ✅ **Native Performance**: Desktop-grade performance
- ✅ **Privacy-Safe**: All data processed locally on your machine
- ✅ **Cross-Platform**: Windows and Linux versions available

## 🔧 Building Your Own Executables

### Prerequisites
```bash
npm install
```

### Build Commands

#### Windows (Best on Windows machine, but works on Linux without signing)
```bash
npm run electron:build:win
```

#### Linux
```bash
npm run electron:build:linux
```

#### macOS (Requires macOS)
```bash
npm run electron:build:mac
```

#### All Platforms
```bash
npm run electron:build
```

### Development Mode
Test the Electron app before building:
```bash
npm run electron:dev
```

This will:
1. Start React dev server
2. Open Electron window
3. Enable hot-reload
4. Show developer tools

## 📝 Application Features

### Keyboard Shortcuts
- **Ctrl/Cmd + Q**: Quit application
- **Ctrl/Cmd + R**: Reload window
- **Ctrl/Cmd + Shift + I**: Developer tools
- **Ctrl/Cmd + 0**: Reset zoom
- **Ctrl/Cmd + Plus/Minus**: Zoom in/out
- **F11**: Fullscreen

### Menu Bar
- **File**: Exit
- **Edit**: Undo, Redo, Cut, Copy, Paste, Select All
- **View**: Reload, Zoom controls, Fullscreen
- **Help**: About dialog, Developer tools

### Full CDI Calculator Features
- Custom CDI thresholds
- Phase shift analysis
- Bottom 5% filtering
- Multi-day data support
- CSV import/export
- Interactive visualizations
- Baseline comparison
- Results export (JSON)

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

### macOS (if building)
- macOS 10.11 (El Capitan) or later
- ~500 MB disk space
- 4 GB RAM recommended

## 🐛 Troubleshooting

### Windows: "Windows protected your PC" Warning
This happens because the app isn't code-signed (signing costs $$$).

**Solution:**
1. Click "More info"
2. Click "Run anyway"
3. The app is safe - it's just unsigned

### Windows: Antivirus False Positive
Some antivirus software may flag unsigned executables.

**Solution:**
1. Add an exception for `CDI Calculator.exe`
2. Or temporarily disable antivirus during first run
3. The executable is safe - just unsigned

### Linux: "Permission denied"
The AppImage needs execute permission.

**Solution:**
```bash
chmod +x "CDI Calculator-3.1.1.AppImage"
```

### Linux: AppImage Won't Run
You may need FUSE libraries.

**Solution:**
```bash
# Ubuntu/Debian
sudo apt install fuse libfuse2

# Fedora
sudo dnf install fuse fuse-libs

# Or extract and run directly
./"CDI Calculator-3.1.1.AppImage" --appimage-extract
./squashfs-root/AppRun
```

### Application Won't Start
1. Check system requirements
2. Try running from terminal to see error messages:
   - Windows: Open terminal in the folder and run `"CDI Calculator.exe"`
   - Linux: Run from terminal with `./"CDI Calculator-3.1.1.AppImage"`
3. Check antivirus/firewall settings

### Application Crashes
1. Delete application data:
   - Windows: `%APPDATA%/CDI Calculator/`
   - Linux: `~/.config/CDI Calculator/`
2. Restart the application

## 📊 File Sizes Explained

The executables are ~200 MB because they include:
- **Chromium Engine**: ~150 MB (for rendering the React UI)
- **Node.js Runtime**: ~50 MB (for JavaScript execution)
- **Application Code**: ~10 MB (your CDI Calculator)

This is standard for Electron apps and ensures:
- ✅ No external dependencies needed
- ✅ Consistent behavior across systems
- ✅ Complete offline functionality

## 🔐 Security & Privacy

- ✅ **No Telemetry**: No data sent anywhere
- ✅ **No Internet**: Doesn't require or use internet
- ✅ **Local Processing**: All calculations done on your machine
- ✅ **No Updates**: Won't auto-update without your permission
- ✅ **Open Source**: Code available for inspection

## 📧 Support

### Technical Support
**Email**: joey.taylor.exe@gmail.com
**Subject**: CDI Calculator Offline Executable - [Your Issue]

### Scientific Support
**Email**: mrichardson@oakwood.edu
**Subject**: CDI Calculator Methodology

## 📄 License

GPL-3.0 License

## 🔬 Citation

If using this tool in research, please cite:

**Richardson, M.E.S., et al. (2023)**. "Reversible suppression of circadian-driven locomotor rhythms in mice using a gradual fragmentation of the day-night cycle." *Scientific Reports*, 13(1), 14423. https://doi.org/10.1038/s41598-023-41029-0

## 📚 Version History

### v3.1.1 - Offline Executable Release
- ✅ Windows portable executable (.zip)
- ✅ Linux AppImage (portable)
- ✅ Linux Debian package (.deb)
- ✅ Full offline functionality
- ✅ Native desktop integration
- ✅ Menu bar with keyboard shortcuts
- ✅ About dialog

### Previous Web Version Features
- Custom CDI thresholds
- Phase shift analysis (Δφ = τ - 24h)
- Bottom 5% filtering
- Multi-day data support (up to 14 days)
- Baseline comparison
- Interactive visualizations
- Data export (JSON)

## 🚀 Future Plans

- [ ] macOS executable (.dmg)
- [ ] Code signing for Windows (removes SmartScreen warning)
- [ ] Auto-update functionality
- [ ] Drag-and-drop CSV import
- [ ] Built-in tutorial
- [ ] Multiple data file comparison

---

**Made with ❤️ for Circadian Research**

Version: 3.1.1 | Build Date: November 2025
