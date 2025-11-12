# Changelog

All notable changes to the Circadian Duration Index (CDI) Calculator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2025-11-12

### Added
- **Version Badge**: Visible version number displayed in app header
  - Pill-shaped badge showing current version (v3.1.0)
  - Positioned in top-right corner of header
  - Automatically updates from APP_VERSION constant
  - Indigo color scheme matching app theme

- **Clear Baseline Button**: Ability to unset baseline data
  - New clearBaseline() function to reset baseline state
  - Button appears conditionally only when baseline is set
  - Red color scheme to distinguish from Set Baseline (green)
  - Alert confirmation when baseline is cleared
  - Enables easy workflow: set → clear → reset

### Changed
- **Sample Data Format**: Complete redesign of sample data
  - Changed from single-line concatenated format to multi-day CSV format
  - Now displays all 24 rows with "day 1, day 2, day 3" columns
  - Automatically switches to CSV tab when loading
  - Matches real user data format exactly
  - Better demonstrates multi-day functionality

- **CSV Data Display**: Enhanced visibility and usability
  - Removed 500-character truncation limit
  - Increased textarea height from h-20 to h-64
  - Added scrollable interface with overflow-auto
  - Changed to monospace font for better alignment
  - Made fully editable for direct data entry
  - Shows complete dataset without "..." truncation

- **Threshold Input Behavior**: Improved editing experience
  - Validation now only occurs onBlur (when clicking away)
  - During typing, accepts any partial values ("0.", "0.2", etc.)
  - No premature resets while editing
  - Full backspace support including first decimal digit
  - Can change 0.33 to 0.25, 0.45, or any valid value
  - Better user control over input values

- **CDI Interpretation Aesthetics**: Complete visual redesign
  - Increased icon size from 4×4 to 5×5 pixels
  - Added fixed width (w-4) to symbols (≤, ≥) for vertical alignment
  - Increased gap spacing from gap-2 to gap-3
  - Standardized all input boxes to w-20 width with py-1.5 padding
  - Styled weak threshold to match input boxes (read-only, gray bg)
  - Upgraded label text from text-xs to text-sm
  - Added font-semibold to symbols and font-medium to inputs
  - Perfect horizontal and vertical alignment across all rows

### Technical
- Updated package.json version to 3.1.0
- Updated APP_VERSION constant in CDICalculator.js
- Enhanced documentation with 3.1.0 features
- Added migration notes for UI improvements

---

## [3.0.0] - 2025-11-12

### Added
- **Custom CDI Thresholds**: Inline-editable threshold values in CDI Interpretation section
  - Real-time validation for threshold values (0 < threshold ≤ 1)
  - Support for up to 4 decimal places
  - Constraint checking ensures strong threshold < moderate threshold
  - User-friendly error messages for validation failures
  - Click-to-edit interface for seamless customization

- **Circadian Phase Shift Feature**: Automatic phase shift calculation based on circadian mathematics
  - Implements Δφ = τ - 24h formula from Van der Pol oscillator model
  - Auto-calculate checkbox for automatic phase shift from custom period
  - Manual override option for flexible analysis
  - Warning system when phase shift enabled without custom period
  - Integration with multi-day data processing

- **Bottom 5% Filtering**: Improved 95% calculation accuracy
  - Sorts activity bins to find 5th percentile threshold
  - Filters out low-activity noise before CDI calculation
  - Recalculates total activity on filtered data
  - Better consolidation detection by focusing on biologically relevant activity

- **Custom Circadian Period Support**: Full support for non-24h circadian periods
  - Seamless integration with phase shift feature
  - Compatible with multi-day averaging
  - Works with all visualization and export features

- **Scientific Documentation**: Comprehensive circadian mathematics framework
  - Van der Pol oscillator model references
  - Phase Response Curve (PRC) theory
  - Free-running period analysis examples
  - Key research references and online resources

### Changed
- **Integer Hour Displays**: All hour values now display as whole numbers
  - Changed from `.toFixed(1)` to `Math.round()` throughout codebase
  - Applies to: hourly data tables, results display, time range outputs
  - Improved readability and cleaner UI

- **Phase Shift Default**: Changed default hourShiftPerDay from 1h to 0h
  - **CRITICAL BUG FIX**: Prevents unexpected phase shift on 24h data
  - Users must explicitly enable and configure phase shift
  - Maintains backward compatibility for existing workflows

- **Enhanced UI/UX**:
  - Perfect icon alignment using flexbox with consistent `gap-2` spacing
  - Uniform input box widths (`w-20`) for better visual consistency
  - Improved threshold input boxes with hover and focus states
  - Better spacing and alignment in CDI Interpretation section
  - `flex-shrink-0` on icons to prevent compression

### Fixed
- **CSV Parser Bug**: Critical fix for data processing
  - **BREAKING BUG**: v2.0.0 used hardcoded sample data instead of uploaded data
  - Now correctly parses and uses actual uploaded CSV data
  - Multi-day data properly concatenated (day1Data, day2Data, day3Data)
  - Supports both tab and comma delimiters
  - Fixed line 81 in CDICalculator.js

- **Backspace Behavior in Threshold Inputs**:
  - Users can now delete all digits without premature reset
  - Allow empty string during editing
  - Reset to default only on blur if left empty
  - Fixed onChange and onBlur handlers

- **Icon Alignment**: Removed misalignment issues
  - Changed from `justify-between` to consistent `gap-2` spacing
  - Added `flex-shrink-0` to prevent icon compression
  - Aligned input boxes with uniform widths

### Technical
- Updated README.md with comprehensive v3.0.0 documentation
- Added CHANGELOG.md for version tracking
- Documented all code architecture highlights with line references
- Added troubleshooting section for new features
- Updated export format to include custom parameters
- Added error message documentation

### Resources
- Added references to Van der Pol oscillator model
- Added Phase Response Curve (PRC) theory documentation
- Added free-running period analysis examples
- Added key circadian rhythm research citations

---

## [2.0.0] - 2025-01-10

### Added
- **Smart Auto-Detection**: Automatically determines optimal time resolution and number of days from data
- **Extended Multi-day Support**: Support for up to 14 days of data (increased from 3 days)
- **Period Lengthening Feature**: Optional feature for circadian rhythm analysis in free-running conditions
- **Improved CSV Parsing**: Better handling of various CSV formats and multi-day data structures
- **Enhanced Visualizations**: Improved charts and data displays

### Changed
- **Simplified Interface**: Removed manual configuration options in favor of automatic detection
- **Better Data Validation**: Enhanced error checking and user feedback
- **Improved Documentation**: More comprehensive README with examples and troubleshooting

### Technical
- Refactored data detection algorithms
- Optimized multi-day data processing
- Improved state management

---

## [1.0.0] - 2024-12-01

### Added
- **Initial Release**: First public version of CDI Calculator
- **Core CDI Calculation**: Implements Richardson et al. (2023) methodology
- **Multiple Input Methods**:
  - Manual data entry
  - CSV file upload
  - Sample data loading
- **Multi-day Support**: Up to 3 days of data with automatic averaging
- **Interactive Visualizations**:
  - Activity distribution bar charts
  - Cumulative activity line charts
  - Responsive chart containers
- **Data Export**: JSON format for research records
- **Baseline Calibration**: Compare experimental data against control conditions
- **Responsive Design**: Works on desktop and tablet devices
- **CDI Interpretation**:
  - Color-coded consolidation levels (Strong/Moderate/Weak)
  - Automatic classification based on thresholds
  - Visual indicators with icons

### Technical
- Built with React 18.2.0
- Recharts 2.8.0 for visualizations
- Tailwind CSS 3.3.3 for styling
- React Scripts 5.0.1 build system

---

## Version Comparison

| Feature | v1.0.0 | v2.0.0 | v3.0.0 | v3.1.0 |
|---------|--------|--------|--------|--------|
| CDI Calculation | ✅ | ✅ | ✅ | ✅ |
| Multi-day Support | 3 days | 14 days | 14 days | 14 days |
| Auto-detection | ❌ | ✅ | ✅ | ✅ |
| Period Lengthening | ❌ | ✅ | ✅ | ✅ |
| Custom Thresholds | ❌ | ❌ | ✅ | ✅ |
| Phase Shift (Δφ = τ - 24h) | ❌ | ❌ | ✅ | ✅ |
| Bottom 5% Filtering | ❌ | ❌ | ✅ | ✅ |
| Custom Circadian Period | ❌ | ❌ | ✅ | ✅ |
| Integer Hour Display | ❌ | ❌ | ✅ | ✅ |
| CSV Parser Fix | ❌ | ⚠️ Bug | ✅ | ✅ |
| Threshold Validation | ❌ | ❌ | ✅ | ✅ |
| Inline Editing | ❌ | ❌ | ✅ | ✅ |
| Version Badge | ❌ | ❌ | ❌ | ✅ |
| Clear Baseline | ❌ | ❌ | ❌ | ✅ |
| Full CSV Display | ❌ | ❌ | ❌ | ✅ |
| Perfect Backspace | ❌ | ❌ | ❌ | ✅ |
| Aesthetic CDI UI | ❌ | ❌ | ❌ | ✅ |

---

## Migration Guide

### Upgrading from v2.0.0 to v3.0.0

**Breaking Changes:**
- None - v3.0.0 is fully backward compatible

**Important Changes:**
1. **CSV Data Processing**: If you were affected by the CSV parser bug in v2.0.0, your results will now be different (and correct). Recommend re-analyzing any data uploaded in v2.0.0.

2. **Phase Shift Default**: If you were using phase shift in a custom workflow, note that the default is now 0h instead of 1h. Update your workflows accordingly.

3. **Hour Display**: Results now show integer hours instead of decimals (e.g., "17h" instead of "17.0h"). Update any automated result parsing if needed.

**New Features to Explore:**
- Try the custom threshold feature in CDI Interpretation section
- Use auto-calculate phase shift for free-running circadian data
- Benefit from automatic bottom 5% filtering for cleaner results

### Upgrading from v1.0.0 to v3.0.0

Follow the v1.0.0 → v2.0.0 migration guide first, then apply v2.0.0 → v3.0.0 changes above.

**Major Improvements:**
- Automatic data detection (no manual configuration needed)
- Support for up to 14 days of data
- Custom circadian period and phase shift analysis
- Custom threshold values for your specific research needs
- Much more accurate results with bottom 5% filtering and CSV parser fix

---

## Support

For issues, bugs, or feature requests:
- **Technical Support**: joey.taylor.exe@gmail.com
- **Circadian Research Support**: mrichardson@oakwood.edu

## Citation

When using this tool in your research, please cite:

Richardson, M.E.S., et al. (2023). "Reversible suppression of circadian-driven locomotor rhythms in mice using a gradual fragmentation of the day-night cycle." *Scientific Reports*, 13(1), 14423. https://doi.org/10.1038/s41598-023-41029-0
