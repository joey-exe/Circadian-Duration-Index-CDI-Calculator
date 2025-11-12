# Changelog

All notable changes to the Circadian Duration Index (CDI) Calculator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

| Feature | v1.0.0 | v2.0.0 | v3.0.0 |
|---------|--------|--------|--------|
| CDI Calculation | ✅ | ✅ | ✅ |
| Multi-day Support | 3 days | 14 days | 14 days |
| Auto-detection | ❌ | ✅ | ✅ |
| Period Lengthening | ❌ | ✅ | ✅ |
| Custom Thresholds | ❌ | ❌ | ✅ |
| Phase Shift (Δφ = τ - 24h) | ❌ | ❌ | ✅ |
| Bottom 5% Filtering | ❌ | ❌ | ✅ |
| Custom Circadian Period | ❌ | ❌ | ✅ |
| Integer Hour Display | ❌ | ❌ | ✅ |
| CSV Parser Fix | ❌ | ⚠️ Bug | ✅ |
| Threshold Validation | ❌ | ❌ | ✅ |
| Inline Editing | ❌ | ❌ | ✅ |

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
