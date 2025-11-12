# Circadian Duration Index (CDI) Calculator

A web-based calculator for the Circadian Duration Index (CDI) method created by Richardson et al. (2023) for analyzing circadian behavior in mice. This tool allows researchers to calculate CDI scores from their own wheel-running or circadian activity data.

**Version 3.1.1** - Now with custom thresholds, circadian phase shift, bottom 5% filtering, and enhanced UI

---

## Quickstart

### Installation
```bash
# Clone or download this repository
npm install
npm start
```

### Basic Usage
1. **Launch**: Open `http://localhost:3000` in your browser
2. **Input Data**: Copy/paste from CSV or upload file
3. **Auto-Detection**: System automatically detects time resolution and days
4. **Calculate**: Click "Calculate CDI" to get results
5. **Export**: Download JSON results for research records

### Sample Data
Click "Sample" to load example data that yields CDI ≈ 0.667

---

## Overview

### Scientific Background

#### Primary Research Paper
Based on the research paper:
- **Title**: "Reversible suppression of circadian-driven locomotor rhythms in mice using a gradual fragmentation of the day-night cycle"
- **Authors**: Richardson, M.E.S., et al. (2023)
- **Journal**: Scientific Reports, 13(1), 14423
- **DOI**: https://doi.org/10.1038/s41598-023-41029-0

#### Circadian Mathematics Framework
The phase shift implementation is based on established circadian rhythm theory:

**Van der Pol Oscillator Model**:
- Mathematical model of biological oscillators
- Describes self-sustained oscillations in circadian systems
- Foundation for understanding endogenous period generation

**Phase Response Curve (PRC) Theory**:
- Describes how external stimuli shift circadian phase
- Quantifies sensitivity to zeitgebers across circadian cycle
- Fundamental to understanding entrainment mechanisms

**Free-Running Period Analysis**:
- In constant darkness (DD), organisms express intrinsic period (τ)
- Phase shift accumulates daily: Δφ = τ - 24h
- Examples from research:
  - Wild-type mice: τ ≈ 23.7h (Δφ ≈ -0.3h/day)
  - Clock mutants: τ ≈ 27h (Δφ ≈ +3h/day)
  - Per mutants: τ ≈ 21h (Δφ ≈ -3h/day)

**Key References**:
- Johnson, C.H. (1999). "Forty years of PRCs—what have we learned?" *Chronobiology International*, 16(6), 711-743
- Pittendrigh, C.S. & Daan, S. (1976). "A functional analysis of circadian pacemakers in nocturnal rodents" *Journal of Comparative Physiology*, 106, 291-331
- Refinetti, R. (2016). "Circadian Physiology" (3rd ed.). CRC Press
- Aschoff, J. (1965). "Circadian rhythms in man" *Science*, 148(3676), 1427-1432

**Online Resources**:
- SCN Network Models: https://www.webofscience.com (search: circadian phase models)
- Chronobiology simulators: Various research group tools
- NIST Circadian Time: https://www.nist.gov/pml/time-and-frequency-division

### CDI Method Definition
The Circadian Duration Index (CDI) measures **the fraction of a 24-hour day needed to complete 95% of total activity**, expressed as a value between 0-1.

### CDI Interpretation Scale
- **≤ 0.33**: Strong consolidation (normal circadian rhythms)
- **0.34-0.66**: Moderate consolidation
- **≥ 0.67**: Weak/Absent consolidation (disrupted/arrhythmic)

**Note**: As of Version 3.0.0, these threshold values can be customized inline within the CDI Interpretation section to match your specific research requirements.

### Key Features

#### Core Functionality
- **Multiple Input Methods**: Manual entry, CSV upload, and sample data loading
- **Automatic Detection**: Auto-detects time resolution (15, 30, 45, 60 minutes) and number of days (1-14 days)
- **Multi-day Support**: Automatic averaging across multiple days with period lengthening option
- **Interactive Visualizations**: Activity distribution and cumulative activity charts
- **Data Export**: JSON format for research records
- **Responsive Design**: Works on desktop and tablet

#### New in Version 3.1.1
- **Two-Line Threshold Labels**: CDI threshold labels now display on two lines for better readability
  - "Strong consolidation" → displays as "Strong" / "consolidation"
  - "Moderate consolidation" → displays as "Moderate" / "consolidation"
  - "Weak/absent consolidation" → displays as "Weak/absent" / "consolidation"
  - Improved visual organization in CDI Interpretation section

#### New in Version 3.1.0
- **Version Badge**: Visible version number in app header for easy identification
- **Enhanced Sample Data**: Multi-day CSV format matching real user data (24 rows, 3 days)
- **Full CSV Display**: Complete data view in scrollable textarea (no truncation)
- **Perfect Backspace Support**: Full editing capability for threshold values (can delete first digit)
- **Aesthetic CDI Interpretation**: Perfectly aligned icons, inputs, and labels with consistent spacing
- **Clear Baseline Button**: Easy way to unset baseline data (appears only when baseline is set)

#### New in Version 3.0.0
- **Custom CDI Thresholds**: Inline-editable threshold values with real-time validation
- **Circadian Phase Shift**: Automatic phase shift calculation using Δφ = τ - 24h formula
- **Bottom 5% Filtering**: Improved 95% calculation by filtering out bottom 5% of activity data
- **Integer Hour Displays**: All hour values now display as whole numbers (no decimals)
- **Fixed CSV Parser**: Now correctly uses uploaded data instead of hardcoded samples
- **Enhanced UI**: Perfect icon alignment and improved input validation
- **Custom Circadian Period**: Support for non-24h circadian periods with automatic phase shift

#### Version 2.0.0
- **Smart Auto-Detection**: Automatically determines optimal time resolution and number of days from data
- **Enhanced Multi-day Support**: Extended support for up to 14 days of data
- **Simplified Interface**: Removed manual configuration options in favor of automatic detection
- **Improved CSV Parsing**: Better handling of various CSV formats and multi-day data structures
- **Period Lengthening**: Optional feature for circadian rhythm analysis

### Data Requirements

- **Single day**: 24 values (hourly) or 48 values (30-min) or 96 values (15-min)
- **Multi-day**: Up to 14 days of data automatically detected
- **Values**: Non-negative numerical values representing activity counts
- **Format**: Wheel revolutions, movement counts, or similar activity metrics

### Results

The tool provides:
- CDI score with 3 decimal precision
- Consolidation classification (Strong/Moderate/Weak)
- Time to 95% activity in hours
- Activity onset time and duration
- Total activity count
- Interactive charts showing distribution and cumulative activity
- Export functionality for research records

---

## Technical Reference

### Installation and Setup

#### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Modern web browser

#### Installation Steps
```bash
# Clone or download the project
cd "C:\Users\Joey9\OneDrive\Documents\Python\New CDI"

# Install dependencies
npm install

# Start development server
npm start
```

#### Project Structure
```
New CDI/
├── package.json          # Dependencies and scripts
├── public/
│   └── index.html        # Main HTML file
├── src/
│   ├── index.js          # React entry point
│   ├── index.css         # Tailwind CSS imports
│   └── CDICalculator.js  # Main component
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── README.md            # Documentation
```

#### Dependencies
- **React 18.2.0**: Frontend framework
- **Recharts 2.8.0**: Data visualization
- **Lucide React 0.263.1**: Icons
- **Tailwind CSS 3.3.3**: Styling
- **React Scripts 5.0.1**: Build tools

### Data Input Methods

#### 1. Manual Input
- **Format**: Copy and paste numerical values from CSV files or data tables
- **Example**: `45,65,56,56,54,32,32,56,43,67,54,33...`
- **Validation**: Non-negative numbers only
- **Use Case**: Small datasets, quick testing

#### 2. CSV Upload
- **Format**: Standard CSV with activity data
- **Structure**: 
  ```
  Time,Activity
  0,45
  0.5,65
  1,56
  ...
  ```
- **Validation**: Automatic parsing and error checking
- **Use Case**: Large datasets, external data sources

#### 3. Multi-day Data
- **Format**: Sequential data for multiple days
- **Example**: 72 values for 3 days of 30-min bins
- **Processing**: Automatic averaging or period lengthening
- **Use Case**: Longitudinal studies, circadian disruption research

### Automatic Detection

The calculator automatically:
- Detects optimal time resolution (15, 30, 45, or 60 minutes)
- Determines number of days (1-14 days)
- Handles various data formats and structures
- Provides visual feedback on detected parameters

### CDI Calculation

The calculator uses a **truly circular algorithm** that:
- Tests **all possible starting points** around the full 24-hour cycle (circular data handling)
- Wraps around from end to beginning, treating midnight as a continuous point
- Finds the minimum consecutive duration needed to capture 95% of total activity
- Calculates the CDI score as: `CDI = (minimum bins to 95%) / (total bins in period)`
- Provides detailed results including consolidation classification
- Supports period lengthening for circadian rhythm analysis

**Why Circular?** Circadian rhythms are cyclical by nature. Activity patterns can span across midnight, so the algorithm must consider the data as a continuous cycle, not a linear sequence. This ensures accurate CDI calculations for all activity patterns, including those with peaks near midnight.

### Advanced Features

#### Baseline Calibration System
The baseline calibration system allows researchers to establish a control or reference condition and compare experimental data against it.

**How It Works:**
1. **Set Baseline**: Enter control/healthy data and click "Set Baseline"
2. **Store Results**: System saves baseline CDI and consolidation level
3. **Compare Data**: Enter experimental data and calculate CDI
4. **View Comparison**: Automatic comparison shows:
   - Baseline vs current CDI scores
   - Absolute difference
   - Percentage change
   - Color-coded indicators

**Use Cases:**
- **Drug Studies**: Compare treated vs untreated groups
- **Environmental Effects**: Analyze light/dark cycle impacts
- **Disease Models**: Compare healthy vs pathological conditions
- **Behavioral Interventions**: Assess therapy effectiveness

#### Period Lengthening Feature
Period lengthening refers to the phenomenon where circadian rhythms shift later each day, often observed in free-running conditions or circadian disruption studies.

**Implementation:**
- **Day 1**: No shift (baseline)
- **Day 2**: Shifted by 1 bin
- **Day 3**: Shifted by 2 bins
- **Day N**: Shifted by (N-1) bins

**Use Cases:**
- **Free-running Studies**: Simulate constant darkness conditions
- **Jet Lag Research**: Model circadian disruption
- **Shift Work Analysis**: Study irregular schedules
- **Circadian Disorder Modeling**: Simulate pathological conditions

#### Circadian Phase Shift Feature (New in v3.0.0)
The circadian phase shift feature implements the mathematical framework for free-running circadian rhythms based on the Van der Pol oscillator model and Phase Response Curve (PRC) theory.

**Mathematical Foundation:**
The phase shift per day (Δφ) is calculated using:
```
Δφ = τ - 24h
```
where τ is the intrinsic circadian period.

**Examples:**
- **τ = 24h**: Δφ = 0h (no shift, entrained rhythm)
- **τ = 25h**: Δφ = +1h (shift later by 1h each day)
- **τ = 23h**: Δφ = -1h (shift earlier by 1h each day)
- **τ = 24.5h**: Δφ = +0.5h (shift later by 30min each day)

**How It Works:**
1. **Enable Custom Period**: Check the custom circadian period option
2. **Set Period**: Enter the intrinsic circadian period (e.g., 25h)
3. **Auto-Calculate**: Check "Auto-calculate phase shift" to use Δφ = τ - 24h
4. **Manual Override**: Or manually enter phase shift per day
5. **Warning System**: Warns if phase shift is enabled without custom period

**Use Cases:**
- **Free-Running Conditions**: Analyze constant darkness (DD) experiments
- **Intrinsic Period Analysis**: Study endogenous circadian rhythms
- **Circadian Phenotyping**: Characterize mutant or disease models
- **Longitudinal Studies**: Track rhythm progression over multiple days

**Technical Implementation:**
- Each day's data is shifted by: (day number - 1) × Δφ bins
- Data wraps circularly to maintain continuity
- Compatible with multi-day averaging and bottom 5% filtering

#### Custom CDI Thresholds (New in v3.0.0)
The custom threshold feature allows researchers to define their own CDI interpretation boundaries based on their specific experimental needs.

**Features:**
- **Inline Editing**: Click on any threshold value to edit directly
- **Real-time Validation**: Immediate feedback on invalid entries
- **Constraint Checking**: Ensures thresholds are properly ordered
- **Flexible Precision**: Support for up to 4 decimal places

**Validation Rules:**
- Values must be between 0 (exclusive) and 1 (inclusive)
- Strong threshold must be < Moderate threshold
- Maximum 4 decimal places allowed
- Cannot be 0 (CDI values range from >0 to 1)
- Cannot be negative

**Error Messages:**
- **"Cannot be 0"**: CDI values range from >0 to 1
- **"Cannot be negative"**: Thresholds must be positive
- **"Cannot exceed 1"**: Maximum CDI value is 1
- **"More than 4 decimal places"**: Precision limit exceeded
- **"Must be less than moderate"**: Threshold ordering violated

**Use Cases:**
- **Species-Specific Analysis**: Different organisms may have different baseline rhythms
- **Experimental Protocols**: Custom lighting schedules may require adjusted thresholds
- **Disease Models**: Pathological conditions may shift normal ranges
- **Developmental Studies**: Age-related changes in rhythm consolidation

**Example Custom Thresholds:**
- **Strict Analysis**: Strong ≤ 0.25, Moderate 0.26-0.50, Weak ≥ 0.51
- **Lenient Analysis**: Strong ≤ 0.40, Moderate 0.41-0.70, Weak ≥ 0.71
- **Fine-grained**: Strong ≤ 0.30, Moderate 0.31-0.65, Weak ≥ 0.66

#### Bottom 5% Filtering (New in v3.0.0)
The bottom 5% filtering feature improves CDI calculation accuracy by excluding low-activity noise from the analysis.

**Algorithm:**
1. **Sort Activity**: All activity bins sorted in ascending order
2. **Find 5th Percentile**: Calculate threshold at bottom 5%
3. **Filter Data**: Remove bins below threshold (set to 0)
4. **Recalculate Total**: Sum remaining filtered activity
5. **Calculate CDI**: Find duration to reach 95% of filtered total

**Benefits:**
- **Noise Reduction**: Eliminates low-level background activity
- **Improved Accuracy**: Focuses on biologically relevant activity
- **Consistent Results**: Reduces variability from measurement noise
- **Better Consolidation Detection**: Highlights primary activity periods

**Example:**
```
Original data: [1, 2, 2, 3, 45, 65, 56, 54, 67, 43]
Sorted: [1, 2, 2, 3, 43, 45, 54, 56, 65, 67]
5th percentile threshold: 2
Filtered data: [0, 0, 0, 3, 45, 65, 56, 54, 67, 43]
95% of filtered total: used for CDI calculation
```

**Use Cases:**
- **Noisy Data**: Experiments with low-level sensor noise
- **Sporadic Activity**: Eliminate random non-circadian movements
- **High-Resolution Data**: Fine-grained time bins with variable noise
- **Quality Control**: Standardize analysis across different datasets

### Data Validation

- Values must be non-negative numbers
- Data length must be compatible with detected time resolution
- Missing values are filled with 0
- Consistent time intervals are required
- Multi-day data must have identical bins per day

### Export Format

Results can be exported in JSON format containing:
```json
{
  "cdi": 0.708,
  "consolidation": "Weak/Absent",
  "totalActivity": 769.67,
  "hoursTo95Percent": 17,
  "resolution": 30,
  "timeRange95Percent": {
    "startTimeFormatted": "00:00",
    "endTimeFormatted": "17:00",
    "duration": 17
  },
  "customThresholds": {
    "strong": 0.33,
    "moderate": 0.66
  },
  "circadianParameters": {
    "customPeriod": 24,
    "phaseShiftPerDay": 0,
    "autoCalculateShift": false
  },
  "dataProcessing": {
    "multiDay": false,
    "numDays": 1,
    "bottom5PercentFiltering": true
  },
  "timestamp": "2025-01-15T10:30:00.000Z",
  "version": "3.1.1"
}
```

**Note**: As of v3.0.0, hour values are exported as integers (no decimals) and additional parameters include custom thresholds, circadian phase shift settings, and data processing options.

### Technical Architecture

#### Frontend Framework
- **React 18.2.0**: Component-based architecture
- **Hooks**: useState, useCallback for state management
- **Functional Components**: Modern React patterns

#### Styling
- **Tailwind CSS 3.3.3**: Utility-first CSS framework
- **Responsive Design**: Mobile-friendly interface
- **Color System**: Consistent visual indicators

#### Data Visualization
- **Recharts 2.8.0**: Chart library
- **Bar Charts**: Activity distribution
- **Line Charts**: Cumulative curves
- **Responsive Containers**: Adaptive sizing

#### Build System
- **React Scripts 5.0.1**: Webpack-based build
- **PostCSS**: CSS processing
- **Autoprefixer**: Browser compatibility

#### Key Functions
1. **detectDaysFromData()**: Auto-detection algorithm for time resolution and days
2. **calculateCDI()**: Core CDI algorithm with bottom 5% filtering
3. **parseCSV()**: CSV file parsing (fixed to use actual uploaded data)
4. **parseManualData()**: Manual input processing
5. **parseMultiDayData()**: Multi-day data processing with phase shift support
6. **getEffectiveHourShift()**: Calculates Δφ = τ - 24h for phase shift
7. **validateThreshold()**: Real-time threshold validation (0 < value ≤ 1)
8. **handleStrongThresholdChange()**: Strong threshold input handler
9. **handleModerateThresholdChange()**: Moderate threshold input handler
10. **setBaseline()**: Baseline calibration
11. **exportResults()**: JSON export with all custom parameters

#### Code Architecture Highlights

**Bottom 5% Filtering Implementation** (CDICalculator.js:274-284):
```javascript
// Sort activity values to find the bottom 5% threshold
const sortedActivities = [...normalizedData].sort((a, b) => a - b);
const bottom5PercentIndex = Math.floor(sortedActivities.length * 0.05);
const bottom5Threshold = sortedActivities[bottom5PercentIndex];

// Filter out bins below the bottom 5% threshold
const filteredData = normalizedData.map(val => val > bottom5Threshold ? val : 0);
const filteredTotalActivity = filteredData.reduce((sum, val) => sum + val, 0);

// Calculate 95% of filtered activity
const target95 = filteredTotalActivity * 0.95;
```

**Phase Shift Calculation** (CDICalculator.js:180-190):
```javascript
const getEffectiveHourShift = () => {
  if (autoCalculateShift && enableCustomPeriod) {
    // Free-running phase shift: each day shifts by (period - 24) hours
    return customPeriod - 24;
  }
  return hourShiftPerDay;
};
```

**Threshold Validation** (CDICalculator.js:118-178):
```javascript
const validateThreshold = (value, thresholdName) => {
  if (value === '') return true; // Allow empty during editing
  const num = parseFloat(value);
  if (isNaN(num)) {
    setThresholdError(`${thresholdName} must be a valid number`);
    return false;
  }
  if (num === 0) {
    setThresholdError(`${thresholdName} cannot be 0. CDI values range from >0 to 1.`);
    return false;
  }
  // Additional validations...
  return true;
};
```

**Integer Hour Display** (CDICalculator.js:337, 821):
```javascript
// In hourlyData array
hour: Math.round(hour), // Changed from hour.toFixed(1)

// In results display
{Math.round(results.hoursTo95Percent)}h // Changed from .toFixed(1)
```

### Troubleshooting

#### Common Issues

**1. Port 3000 Not Working**
- **Symptoms**: Server fails to start, webpack errors
- **Cause**: Empty or corrupted package.json
- **Solution**: Recreate package.json and reinstall dependencies

**2. CDI Values Too High (>0.8)**
- **Symptoms**: Unrealistic CDI scores
- **Cause**: Incorrect algorithm implementation
- **Solution**: Ensure chronological calculation method

**3. Multi-day Data Errors**
- **Symptoms**: "Data length must be divisible by number of days"
- **Cause**: Mismatched data length and day count
- **Solution**: Verify data length = days × bins_per_day

**4. CSV Upload Failures**
- **Symptoms**: Parsing errors, empty results
- **Cause**: Incorrect CSV format
- **Solution**: Ensure activity data in second column

**5. Baseline Comparison Not Showing**
- **Symptoms**: No baseline comparison section
- **Cause**: Baseline not set
- **Solution**: Click "Set Baseline" before calculating

**6. Phase Shift Giving Unexpected Results**
- **Symptoms**: CDI changes dramatically when enabling phase shift
- **Cause**: Default hourShiftPerDay was 1h instead of 0h (fixed in v3.0.0)
- **Solution**: Use auto-calculate feature or manually set to 0h for 24h data
- **Prevention**: Warning shown if phase shift enabled without custom period

**7. Custom Threshold Validation Errors**
- **Symptoms**: Cannot enter desired threshold value
- **Cause**: Value violates validation rules
- **Solutions**:
  - Ensure value is between 0 (exclusive) and 1 (inclusive)
  - Strong threshold must be < moderate threshold
  - Use maximum 4 decimal places
  - Cannot use 0 (CDI values range from >0 to 1)

**8. CSV Data Not Being Used**
- **Symptoms**: Same results regardless of uploaded data
- **Cause**: Bug in v2.0.0 where hardcoded sample data was used (fixed in v3.0.0)
- **Solution**: Update to v3.0.0 or later
- **Verification**: Check that results change with different input data

**9. Backspace Not Working in Threshold Inputs**
- **Symptoms**: Cannot delete all digits in threshold inputs
- **Cause**: Input reset to default when empty (fixed in v3.0.0)
- **Solution**: Update to v3.0.0 which allows complete deletion
- **Note**: Value resets to default on blur if left empty

#### Error Messages
- **"Please provide valid activity data"**: Empty or invalid input
- **"Data length must be divisible by number of days"**: Multi-day mismatch
- **"Please provide valid baseline data"**: Empty baseline input
- **"Error processing data"**: General parsing error
- **"Threshold must be a valid number"**: Non-numeric threshold input
- **"Threshold cannot be 0"**: CDI values range from >0 to 1
- **"Threshold cannot be negative"**: Thresholds must be positive
- **"Threshold cannot exceed 1"**: Maximum CDI value is 1
- **"Cannot have more than 4 decimal places"**: Precision limit exceeded
- **"Strong threshold must be less than moderate threshold"**: Threshold ordering violated
- **"Warning: Phase shift enabled without custom period"**: Configure custom period first

### Version History

#### Version 3.1.1 (Current)
- **Two-Line Threshold Labels**: Improved readability in CDI Interpretation section
  - Changed threshold labels to display on two lines using `<br/>` tags
  - "Strong consolidation" → "Strong" / "consolidation"
  - "Moderate consolidation" → "Moderate" / "consolidation"
  - "Weak/absent consolidation" → "Weak/absent" / "consolidation"
  - Changed from `<span>` to `<p>` elements for better semantic structure
  - Improved visual organization and reduced horizontal crowding

#### Version 3.1.0
- **Version Badge Display**: Added visible version number (v3.1.0) in app header
  - Appears as pill-shaped badge in top-right corner
  - Easy verification of current version
  - Updates automatically from APP_VERSION constant
- **Enhanced Sample Data**: Fixed sample data format
  - Changed from concatenated single-line format to multi-day CSV format
  - Now shows all 24 rows with "day 1, day 2, day 3" columns
  - Automatically switches to CSV tab when loading sample
  - Matches real user data format exactly
- **Full CSV Display**: Improved CSV data visibility
  - Removed 500-character truncation limit
  - Increased textarea height from h-20 to h-64 for better viewing
  - Added scrollable interface with overflow-auto
  - Monospace font for better data alignment
  - Made editable so users can paste or modify data directly
- **Perfect Backspace Support**: Enhanced threshold input editing
  - Users can now backspace and delete first decimal digit completely
  - Validation only happens onBlur (when clicking away)
  - During typing, accepts any partial value like "0.", "0.2", etc.
  - No premature resets during editing
  - Allows full control to change 0.33 to 0.25, 0.45, etc.
- **Aesthetic CDI Interpretation**: Complete visual redesign
  - Increased icon size from 4×4 to 5×5 for better visibility
  - Fixed width (w-4) for symbols (≤, ≥) ensuring perfect vertical alignment
  - Increased gap spacing from gap-2 to gap-3 for breathing room
  - Standardized all input boxes to w-20 width with py-1.5 padding
  - Made weak threshold value styled like input box (read-only, gray bg)
  - Upgraded text size from text-xs to text-sm for readability
  - Added font-semibold to symbols, font-medium to inputs
  - Perfect horizontal and vertical alignment across all three rows
- **Clear Baseline Feature**: Added baseline management
  - New clearBaseline() function to unset baseline data
  - "Clear Baseline" button appears conditionally when baseline is set
  - Red color scheme distinguishes from "Set Baseline" (green)
  - Provides user feedback via alert message
  - Allows easy workflow: set → clear → reset new baseline

#### Version 3.0.0
- **Custom CDI Thresholds**: Inline-editable threshold values with comprehensive validation
  - Real-time error checking (0 < threshold ≤ 1)
  - Support for up to 4 decimal places
  - Constraint checking (strong < moderate)
  - User-friendly error messages
- **Circadian Phase Shift**: Automatic phase shift calculation
  - Implements Δφ = τ - 24h formula
  - Auto-calculate checkbox for convenience
  - Manual override option
  - Warning system for configuration issues
  - Default phase shift = 0h (prevents unexpected behavior)
- **Bottom 5% Filtering**: Improved 95% calculation accuracy
  - Sorts activity bins to find 5th percentile
  - Filters out low-activity noise
  - Recalculates on filtered data
  - Better consolidation detection
- **Integer Hour Displays**: All hour values now use Math.round()
  - Removed decimal places for cleaner display
  - Applies to all hour-based outputs
  - Improved readability
- **Fixed CSV Parser**: Critical bug fix
  - Now correctly uses uploaded data
  - Previously used hardcoded sample data
  - Multi-day data properly parsed and concatenated
  - Supports both tab and comma delimiters
- **Enhanced UI/UX**:
  - Perfect icon alignment using flexbox
  - Consistent gap spacing (gap-2)
  - Uniform input box widths (w-20)
  - Fixed backspace behavior (allows complete deletion)
  - Improved threshold input validation
- **Custom Circadian Period**: Full support for non-24h periods
  - Integration with phase shift feature
  - Seamless multi-day analysis
  - Compatible with all other features

#### Version 2.0.0
- Added automatic time resolution detection
- Extended multi-day support to 14 days
- Simplified user interface
- Enhanced CSV parsing capabilities
- Added period lengthening feature
- Improved error handling and validation
- Updated documentation and examples

#### Version 1.0.0
- Initial release
- Basic CDI calculation functionality
- Manual and CSV input methods
- Multi-day data support (up to 3 days)
- Interactive visualizations
- Data export functionality

### Known Issues

- **CSV Format**: Some complex CSV structures may require manual data entry
- **Large Datasets**: Very large datasets (>14 days) may need to be split
- **Browser Compatibility**: Requires modern browsers with ES6+ support
- **Phase Shift Limits**: Very large phase shifts (>12h/day) may produce unexpected results
- **Threshold Edge Cases**: Values exactly at threshold boundaries may show inconsistent categorization

### Recent Bug Fixes (v3.0.0)

- ✅ **Fixed**: CSV parser now uses uploaded data instead of hardcoded samples
- ✅ **Fixed**: Phase shift default changed from 1h to 0h to prevent unexpected behavior
- ✅ **Fixed**: Backspace now works correctly in threshold inputs
- ✅ **Fixed**: Icon alignment improved with consistent flexbox spacing
- ✅ **Fixed**: Hour displays now show integers instead of decimals
- ✅ **Fixed**: Input boxes now have uniform widths and alignment

### Future Development

#### Planned Features
1. **Statistical Analysis**
   - T-test for baseline comparison
   - Confidence intervals
   - Effect size calculations
   - Multi-group comparisons
   - ANOVA support

2. **Advanced Period Analysis**
   - ~~Custom shift patterns~~ ✅ Completed in v3.0.0
   - Multiple period lengths simultaneously
   - Phase response curve visualization
   - Period estimation from data
   - Autocorrelation analysis

3. **Data Management**
   - Multiple baseline support
   - Data import/export enhancements (CSV, Excel, JSON)
   - Batch processing multiple datasets
   - Project save/load functionality
   - Data versioning and history

4. **Visualization Improvements**
   - Interactive charts with zoom/pan
   - Custom time ranges
   - Export visualizations (PNG, SVG, PDF)
   - Actogram view for multi-day data
   - Heat map representations
   - Side-by-side comparison charts

5. **User Experience**
   - Tutorial mode for new users
   - Comprehensive help documentation
   - Keyboard shortcuts
   - Dark mode support
   - Accessibility improvements
   - Mobile app version

6. **Advanced CDI Features**
   - ~~Custom thresholds~~ ✅ Completed in v3.0.0
   - ~~Bottom 5% filtering~~ ✅ Completed in v3.0.0
   - Top 10% analysis option
   - Variable percentile selection (e.g., 90%, 95%, 99%)
   - Multi-threshold analysis
   - Threshold recommendations based on data distribution

#### Technical Improvements
1. **Performance Optimization**
   - Lazy loading
   - Memoization
   - Code splitting

2. **Accessibility**
   - Screen reader support
   - Keyboard navigation
   - High contrast mode

3. **Mobile Optimization**
   - Touch-friendly interface
   - Responsive charts
   - Offline capability

### Research Applications

1. **Circadian Medicine**
   - Drug efficacy studies
   - Treatment monitoring
   - Personalized medicine

2. **Environmental Health**
   - Light pollution effects
   - Shift work analysis
   - Jet lag research

3. **Behavioral Studies**
   - Sleep disorder research
   - Activity pattern analysis
   - Intervention studies

---

## Support

### Bug Reports

If you encounter any issues or bugs:

**Technical Support**: Yeshuwa Taylor - joey.taylor.exe@gmail.com

Please include:
- Description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Browser and version information
- Sample data (if applicable)

### Research Support

For questions about the CDI methodology or circadian rhythm research:

**Circadian Rhythm Research Support**: Dr. Melissa E. Richardson PhD - mrichardson@oakwood.edu

---

## License

This project is intended for scientific research use. Please cite the original Richardson et al. (2023) paper when using this tool in your research.

## Citation

Richardson, M.E.S., et al. (2023). "Reversible suppression of circadian-driven locomotor rhythms in mice using a gradual fragmentation of the day-night cycle." *Scientific Reports*, 13(1), 14423. https://doi.org/10.1038/s41598-023-41029-0

- **Technical Support**: joey.taylor.exe@gmail.com
- **Circadian Rhythm Research Support**: mrichardson@oakwood.edu