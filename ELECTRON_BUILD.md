# CDI Calculator - Offline Executable Version

This document explains how to run and build the offline executable version of the CDI Calculator using Electron.

## Overview

The CDI Calculator has been packaged with Electron to create standalone desktop applications that can run without internet connection or any installation requirements (once built).

## Features

- **Standalone Application**: Runs without browser or internet connection
- **Cross-Platform**: Build for Windows, macOS, and Linux
- **All Original Features**: Complete CDI Calculator functionality
- **Desktop Integration**: Native menus, keyboard shortcuts, and window management

## Development Mode

To test the Electron application in development mode:

```bash
npm run electron:dev
```

This will:
1. Start the React development server
2. Launch the Electron window
3. Enable hot-reloading for development
4. Open developer tools automatically

## Building Executables

### Windows Executable (.exe)

```bash
npm run electron:build:win
```

This creates:
- **Installer**: `dist/CDI Calculator Setup 3.1.1.exe` (NSIS installer)
- **Portable**: Files in `dist/win-unpacked/` folder

The installer includes:
- Installation directory selection
- Desktop shortcut creation
- Start menu shortcut
- Uninstaller

### macOS Application (.dmg)

```bash
npm run electron:build:mac
```

This creates:
- **DMG Image**: `dist/CDI Calculator-3.1.1.dmg`
- **App Bundle**: `dist/mac/CDI Calculator.app`

Note: Requires macOS to build

### Linux Packages

```bash
npm run electron:build:linux
```

This creates:
- **AppImage**: `dist/CDI Calculator-3.1.1.AppImage` (portable)
- **Debian Package**: `dist/cdi-calculator_3.1.1_amd64.deb`

### Build All Platforms

```bash
npm run electron:build
```

Note: Some platforms may require specific operating systems to build (e.g., macOS for .dmg)

## Output Files

After building, find your executables in the `dist/` directory:

```
dist/
├── CDI Calculator Setup 3.1.1.exe       # Windows installer
├── CDI Calculator-3.1.1.dmg             # macOS disk image
├── CDI Calculator-3.1.1.AppImage        # Linux portable
├── cdi-calculator_3.1.1_amd64.deb       # Debian package
├── win-unpacked/                         # Windows portable folder
├── mac/                                  # macOS app bundle
└── linux-unpacked/                       # Linux files
```

## Distribution

### Windows
- **For End Users**: Distribute `CDI Calculator Setup 3.1.1.exe`
- **Portable Version**: Zip the `win-unpacked/` folder

### macOS
- Distribute `CDI Calculator-3.1.1.dmg`
- Users drag the app to Applications folder

### Linux
- **Modern Distros**: `CDI Calculator-3.1.1.AppImage` (no installation needed)
- **Debian/Ubuntu**: `cdi-calculator_3.1.1_amd64.deb`

## Application Features

### Keyboard Shortcuts

- **Ctrl/Cmd + Q**: Quit application
- **Ctrl/Cmd + R**: Reload window
- **Ctrl/Cmd + Shift + I**: Toggle developer tools
- **Ctrl/Cmd + 0**: Reset zoom
- **Ctrl/Cmd + Plus**: Zoom in
- **Ctrl/Cmd + Minus**: Zoom out
- **F11**: Toggle fullscreen

### Menu Bar

The application includes a full menu bar with:
- **File**: Exit
- **Edit**: Undo, Redo, Cut, Copy, Paste, Select All
- **View**: Reload, Zoom, Fullscreen
- **Help**: About, Developer Tools

### About Dialog

Access from Help > About CDI Calculator to see:
- Application version
- Author information
- Scientific methodology credit
- Research paper reference

## Technical Details

### Architecture

- **Electron**: v39.1.2
- **React**: v18.2.0
- **Electron Builder**: v26.0.12

### File Structure

```
CDI Calculator/
├── electron.js              # Electron main process
├── package.json             # Updated with Electron scripts
├── build/                   # React production build
├── dist/                    # Built executables
├── public/                  # Static assets
└── src/                     # React source code
```

### Build Configuration

The build configuration in `package.json` includes:

- **App ID**: com.cdi.calculator
- **Product Name**: CDI Calculator
- **Icon**: public/logo192.png
- **Installer Type**: NSIS (Windows), DMG (macOS), AppImage/DEB (Linux)

## Troubleshooting

### Build Fails

1. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

2. Try rebuilding native modules:
   ```bash
   npm run build
   ```

3. Clear electron-builder cache:
   ```bash
   rm -rf dist/
   npm run electron:build
   ```

### App Won't Start

1. Check if port 3000 is available (dev mode)
2. Verify the build/ folder exists (production)
3. Check electron.js for errors

### Icon Not Showing

- Ensure `public/logo192.png` exists
- Rebuild the application
- On Windows, installer must be reinstalled for icon changes

## Size Optimization

The built executables include:
- Chromium rendering engine (~150MB)
- Node.js runtime (~50MB)
- Application code (~10MB)

Total size: ~200-250MB per platform

This is standard for Electron apps and ensures compatibility and offline functionality.

## System Requirements

### Windows
- Windows 7 or later (64-bit)
- ~500MB disk space

### macOS
- macOS 10.11 (El Capitan) or later
- ~500MB disk space

### Linux
- 64-bit Linux distribution
- ~500MB disk space
- GLIBC 2.17 or later

## Notes

- First launch may take a few seconds
- No internet connection required after installation
- All CDI calculation features work identically to web version
- Data is processed locally (privacy-safe)
- Can run multiple instances simultaneously

## Support

For issues with the Electron build:
- Technical Support: joey.taylor.exe@gmail.com
- Scientific Support: mrichardson@oakwood.edu

## Version

Current Version: 3.1.1

Based on CDI Calculator v3.1.1 with offline executable capabilities.
