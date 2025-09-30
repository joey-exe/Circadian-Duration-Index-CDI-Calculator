# Circadian Duration Index (CDI) Calculator

A web-based calculator for the Circadian Duration Index (CDI) method created by Richardson et al. (2023) for analyzing circadian behavior in mice. This tool allows researchers to calculate CDI scores from their own wheel-running or circadian activity data.

**Version 2.0.0** - Now with automatic data detection and enhanced multi-day support

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

Based on the research paper:
- **Title**: "Reversible suppression of circadian-driven locomotor rhythms in mice using a gradual fragmentation of the day-night cycle"
- **Authors**: Richardson, M.E.S., et al. (2023)
- **Journal**: Scientific Reports, 13(1), 14423
- **DOI**: https://doi.org/10.1038/s41598-023-41029-0

### CDI Method Definition
The Circadian Duration Index (CDI) measures **the fraction of a 24-hour day needed to complete 95% of total activity**, expressed as a value between 0-1.

### CDI Interpretation Scale
- **≤ 0.33**: Strong consolidation (normal circadian rhythms)
- **0.34-0.66**: Moderate consolidation
- **≥ 0.67**: Weak/Absent consolidation (disrupted/arrhythmic)

### Key Features

#### Core Functionality
- **Multiple Input Methods**: Manual entry, CSV upload, and sample data loading
- **Automatic Detection**: Auto-detects time resolution (15, 30, 45, 60 minutes) and number of days (1-14 days)
- **Multi-day Support**: Automatic averaging across multiple days with period lengthening option
- **Interactive Visualizations**: Activity distribution and cumulative activity charts
- **Data Export**: JSON format for research records
- **Responsive Design**: Works on desktop and tablet

#### New in Version 2.0.0
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

The calculator automatically:
- Tests all possible starting points chronologically to find minimum duration for 95% activity
- Calculates the CDI score based on optimal arrangement
- Provides detailed results including consolidation classification
- Supports period lengthening for circadian rhythm analysis

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
  "hoursTo95Percent": 17.0,
  "resolution": 30,
  "timeRange95Percent": {
    "startTimeFormatted": "00:00",
    "endTimeFormatted": "17:00",
    "duration": 17.0
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

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
1. **detectDaysFromData()**: Auto-detection algorithm
2. **calculateCDI()**: Core CDI algorithm
3. **parseCSV()**: CSV file parsing
4. **parseManualData()**: Manual input processing
5. **parseMultiDayData()**: Multi-day data processing
6. **setBaseline()**: Baseline calibration
7. **exportResults()**: JSON export

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

#### Error Messages
- **"Please provide valid activity data"**: Empty or invalid input
- **"Data length must be divisible by number of days"**: Multi-day mismatch
- **"Please provide valid baseline data"**: Empty baseline input
- **"Error processing data"**: General parsing error

### Version History

#### Version 2.0.0 (Current)
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

### Future Development

#### Planned Features
1. **Statistical Analysis**
   - T-test for baseline comparison
   - Confidence intervals
   - Effect size calculations

2. **Advanced Period Analysis**
   - Custom shift patterns
   - Multiple period lengths
   - Phase response curves

3. **Data Management**
   - Multiple baseline support
   - Data import/export enhancements
   - Batch processing

4. **Visualization Improvements**
   - Interactive charts
   - Custom time ranges
   - Export visualizations

5. **User Experience**
   - Tutorial mode
   - Help documentation
   - Keyboard shortcuts

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

**Technical Support**: Joey Taylor - joey.taylor.exe@gmail.com

Please include:
- Description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Browser and version information
- Sample data (if applicable)

### Research Support

For questions about the CDI methodology or circadian rhythm research:

**Circadian Rhythm Research Support**: Dr. Melissa Richardson PhD - mrichardson@oakwood.edu

---

## License

This project is intended for scientific research use. Please cite the original Richardson et al. (2023) paper when using this tool in your research.

## Citation

Richardson, M.E.S., et al. (2023). "Reversible suppression of circadian-driven locomotor rhythms in mice using a gradual fragmentation of the day-night cycle." *Scientific Reports*, 13(1), 14423. https://doi.org/10.1038/s41598-023-41029-0

- **Technical Support**: joey.taylor.exe@gmail.com
- **Circadian Rhythm Research Support**: mrichardson@oakwood.edu