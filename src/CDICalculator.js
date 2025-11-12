import React, { useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Upload, Download, Calculator, Info, AlertCircle } from 'lucide-react';

const CDICalculator = () => {
  const APP_VERSION = '3.0.0';

  const [data, setData] = useState([]);
  const [results, setResults] = useState(null);
  const [resolution, setResolution] = useState(30);
  const [csvData, setCsvData] = useState('');
  const [manualData, setManualData] = useState('');
  const [activeTab, setActiveTab] = useState('manual');
  const [multiDay, setMultiDay] = useState(false);
  const [numDays, setNumDays] = useState(3);
  const [autoDetectedDays, setAutoDetectedDays] = useState(null);
  const [baselineData, setBaselineData] = useState(null);
  const [baselineResults, setBaselineResults] = useState(null);
  const [enablePeriodLengthening, setEnablePeriodLengthening] = useState(false);
  const [customPeriod, setCustomPeriod] = useState(24);
  const [enableCustomPeriod, setEnableCustomPeriod] = useState(false);
  const [detectedPeriod, setDetectedPeriod] = useState(null);
  const [enableCustomThresholds, setEnableCustomThresholds] = useState(false);
  const [strongThreshold, setStrongThreshold] = useState(0.33);
  const [moderateThreshold, setModerateThreshold] = useState(0.66);
  const [hourShiftPerDay, setHourShiftPerDay] = useState(0);
  const [autoCalculateShift, setAutoCalculateShift] = useState(false);
  const [thresholdError, setThresholdError] = useState('');

  const parseMultiDayData = (data, days, enablePeriodLengthening = false, shiftBinsPerDay = 1) => {
    if (data.length % days !== 0) {
      throw new Error(`Data length (${data.length}) must be divisible by number of days (${days})`);
    }

    const binsPerDay = data.length / days;

    if (enablePeriodLengthening) {
      // For period lengthening: shift each day by specified number of bins
      const shiftedData = [];
      for (let day = 0; day < days; day++) {
        const dayStart = day * binsPerDay;
        const dayData = data.slice(dayStart, dayStart + binsPerDay);
        // Shift by day number * bins per day
        const shiftAmount = (day * shiftBinsPerDay) % binsPerDay;
        const shiftedDayData = [
          ...dayData.slice(shiftAmount),
          ...dayData.slice(0, shiftAmount)
        ];
        shiftedData.push(...shiftedDayData);
      }
      return shiftedData;
    } else {
      // Standard averaging
      const averagedData = [];
      for (let bin = 0; bin < binsPerDay; bin++) {
        let sum = 0;
        for (let day = 0; day < days; day++) {
          sum += data[day * binsPerDay + bin];
        }
        averagedData.push(sum / days);
      }
      return averagedData;
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.trim().split('\n');
    const data = [];
    
    // Check if this is a multi-day format (day 1, day 2, day 3)
    const header = lines[0].toLowerCase();
    if (header.includes('day 1') && header.includes('day 2') && header.includes('day 3')) {
      // Multi-day format: each row has 3 values (one per day)
      // Reorganize data in chronological order: day1, day2, day3
      const day1Data = [];
      const day2Data = [];
      const day3Data = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(/[\t,]+/).map(v => parseFloat(v.trim()));
        if (values.length >= 3 && !isNaN(values[0]) && !isNaN(values[1]) && !isNaN(values[2])) {
          day1Data.push(values[0]);
          day2Data.push(values[1]);
          day3Data.push(values[2]);
        }
      }

      // Combine all days in chronological sequence: day1, then day2, then day3
      data.push(...day1Data, ...day2Data, ...day3Data);
    } else {
      // Standard format: timestamp, activity
      const timeBinMap = new Map();
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length >= 2) {
          const timeBin = values[0]; // Use timestamp as key
          const activity = parseFloat(values[1]);
          
          if (!isNaN(activity)) {
            if (!timeBinMap.has(timeBin)) {
              timeBinMap.set(timeBin, []);
            }
            timeBinMap.get(timeBin).push(activity);
          }
        }
      }
      
      // Average multiple measurements per time bin
      for (const [timeBin, activities] of timeBinMap) {
        const average = activities.reduce((sum, val) => sum + val, 0) / activities.length;
        data.push(average);
      }
    }
    
    return data;
  };

  const parseManualData = (text) => {
    return text.split(/[,\s]+/)
      .map(v => parseFloat(v.trim()))
      .filter(v => !isNaN(v));
  };

  // Validate threshold input
  const validateThreshold = (value, thresholdName) => {
    // Allow empty string during editing
    if (value === '') return true;

    const num = parseFloat(value);

    // Check if it's a valid number
    if (isNaN(num)) {
      setThresholdError(`${thresholdName} must be a valid number`);
      return false;
    }

    // Check if it's zero
    if (num === 0) {
      setThresholdError(`${thresholdName} cannot be 0. CDI values range from >0 to 1. A threshold of 0 would classify all data as weak consolidation.`);
      return false;
    }

    // Check if it's negative
    if (num < 0) {
      setThresholdError(`${thresholdName} cannot be negative. CDI values are always positive (0-1 range).`);
      return false;
    }

    // Check if it's greater than 1
    if (num > 1) {
      setThresholdError(`${thresholdName} cannot exceed 1. CDI values range from 0 to 1 by definition.`);
      return false;
    }

    // Check decimal places (max 4)
    const decimalPart = value.split('.')[1];
    if (decimalPart && decimalPart.length > 4) {
      setThresholdError(`${thresholdName} cannot have more than 4 decimal places for calculation precision.`);
      return false;
    }

    setThresholdError('');
    return true;
  };

  const handleStrongThresholdChange = (value) => {
    if (validateThreshold(value, 'Strong threshold')) {
      if (value !== '') {
        const num = parseFloat(value);
        setStrongThreshold(num);
        setEnableCustomThresholds(num !== 0.33 || moderateThreshold !== 0.66);
      }
    }
  };

  const handleModerateThresholdChange = (value) => {
    if (validateThreshold(value, 'Moderate threshold')) {
      if (value !== '') {
        const num = parseFloat(value);
        setModerateThreshold(num);
        setEnableCustomThresholds(strongThreshold !== 0.33 || num !== 0.66);
      }
    }
  };

  // Calculate effective hour shift based on circadian period (free-running phase shift)
  // Mathematical principle: Δφ per day = τ - 24h (where τ is intrinsic period)
  const getEffectiveHourShift = () => {
    if (autoCalculateShift && enableCustomPeriod) {
      // Free-running phase shift: each day shifts by (period - 24) hours
      return customPeriod - 24;
    }
    // If phase shift is enabled but no custom period, use manual shift
    // BUT warn user if shift is non-zero with 24h period
    return hourShiftPerDay;
  };

  // Check if phase shift configuration makes sense
  const isPhaseShiftValid = () => {
    if (!enablePeriodLengthening) return true;

    // Auto-calculate requires custom period
    if (autoCalculateShift && !enableCustomPeriod) return false;

    // Manual shift with 24h period should be 0 (or user knows what they're doing)
    if (!autoCalculateShift && !enableCustomPeriod && hourShiftPerDay !== 0) {
      return true; // Allow but it's unusual
    }

    return true;
  };

  // ClockLab-inspired circadian period detection using autocorrelation
  const detectCircadianPeriod = (data, resolution) => {
    if (!data || data.length === 0) return null;
    
    const binsPerHour = 60 / resolution;
    const minPeriodHours = 20; // Minimum circadian period
    const maxPeriodHours = 28; // Maximum circadian period
    const minPeriodBins = minPeriodHours * binsPerHour;
    const maxPeriodBins = maxPeriodHours * binsPerHour;
    
    let bestPeriod = 24; // Default to 24 hours
    let bestCorrelation = 0;
    
    // Test different periods within circadian range
    for (let periodBins = minPeriodBins; periodBins <= maxPeriodBins; periodBins += binsPerHour) {
      let correlation = 0;
      let validComparisons = 0;
      
      // Calculate autocorrelation for this period
      for (let i = 0; i < data.length - periodBins; i++) {
        const current = data[i];
        const shifted = data[i + periodBins];
        
        if (current > 0 && shifted > 0) {
          // Normalize and correlate
          const normalizedCurrent = current / Math.max(...data);
          const normalizedShifted = shifted / Math.max(...data);
          correlation += normalizedCurrent * normalizedShifted;
          validComparisons++;
        }
      }
      
      if (validComparisons > 0) {
        correlation /= validComparisons;
        
        if (correlation > bestCorrelation) {
          bestCorrelation = correlation;
          bestPeriod = periodBins / binsPerHour; // Convert back to hours
        }
      }
    }
    
    // Only return detected period if correlation is significant
    return bestCorrelation > 0.3 ? {
      period: bestPeriod,
      correlation: bestCorrelation,
      confidence: bestCorrelation > 0.6 ? 'high' : bestCorrelation > 0.4 ? 'medium' : 'low'
    } : null;
  };

  const detectDaysFromData = (data) => {
    if (!data || data.length === 0) return null;
    
    // Try different resolutions to find the best fit
    const resolutions = [15, 30, 45, 60]; // minutes
    let bestMatch = null;
    let bestScore = Infinity;
    
    for (const testResolution of resolutions) {
      const binsPerHour = 60 / testResolution;
      const expectedBinsPerDay = 24 * binsPerHour;
      
      // Check if data length is divisible by expected bins per day
      if (data.length % expectedBinsPerDay === 0) {
        const detectedDays = data.length / expectedBinsPerDay;
        if (detectedDays >= 1 && detectedDays <= 14) {
          // Perfect match - use this resolution
          return { days: detectedDays, resolution: testResolution };
        }
      }
      
      // Calculate how close we are to a perfect match
      const possibleDays = Math.round(data.length / expectedBinsPerDay);
      if (possibleDays >= 1 && possibleDays <= 14) {
        const remainder = data.length % expectedBinsPerDay;
        const score = Math.abs(remainder);
        if (score < bestScore) {
          bestScore = score;
          bestMatch = { days: possibleDays, resolution: testResolution };
        }
      }
    }
    
    return bestMatch;
  };

  // Enhanced algorithm to find consistent activity start point
  const findConsistentActivityStart = (data, threshold = 0.1) => {
    if (!data || data.length === 0) return 0;
    
    const totalActivity = data.reduce((sum, val) => sum + val, 0);
    const activityThreshold = totalActivity * threshold;
    
    // First, try to find where low activity ends (transition from low to high)
    // This handles cases like your 20-hour pattern where there's a gap in the middle
    let bestTransitionPoint = 0;
    let maxTransitionScore = 0;
    
    for (let i = 0; i < data.length; i++) {
      const currentActivity = data[i];
      const nextActivity = data[(i + 1) % data.length];
      
      // Look for transition from low activity to high activity
      if (currentActivity < totalActivity * 0.05 && nextActivity > totalActivity * 0.1) {
        const transitionScore = nextActivity - currentActivity;
        if (transitionScore > maxTransitionScore) {
          maxTransitionScore = transitionScore;
          bestTransitionPoint = (i + 1) % data.length;
        }
      }
    }
    
    // If we found a clear transition point, use it
    if (maxTransitionScore > totalActivity * 0.05) {
      return bestTransitionPoint;
    }
    
    // Fallback to original threshold method
    let cumulativeActivity = 0;
    for (let i = 0; i < data.length; i++) {
      cumulativeActivity += data[i];
      if (cumulativeActivity >= activityThreshold) {
        return i;
      }
    }
    
    return 0; // Fallback to start if no clear threshold found
  };

  const calculateCDI = useCallback((activityData, customPeriodHours = null) => {
    if (!activityData || activityData.length === 0) return null;

    const binsPerHour = 60 / resolution;
    const periodHours = customPeriodHours || (enableCustomPeriod ? customPeriod : 24);
    const expectedBins = periodHours * binsPerHour;
    
    // Don't pad with zeros - use the data as-is
    // The data should already be in the correct format for the resolution
    let normalizedData = [...activityData];
    
    // Only pad if we have fewer bins than expected for the resolution
    // But don't pad if we have exactly 24 values and resolution is 30 (hourly data)
    if (normalizedData.length < expectedBins && !(normalizedData.length === 24 && resolution === 30)) {
      while (normalizedData.length < expectedBins) {
        normalizedData.push(0);
      }
    }
    
    // If we have more data than expected, truncate
    if (normalizedData.length > expectedBins) {
      normalizedData = normalizedData.slice(0, expectedBins);
    }

    const totalActivity = normalizedData.reduce((sum, val) => sum + val, 0);
    if (totalActivity === 0) return null;

    // Sort activity values to find the bottom 5% threshold
    const sortedActivities = [...normalizedData].sort((a, b) => a - b);
    const bottom5PercentIndex = Math.floor(sortedActivities.length * 0.05);
    const bottom5Threshold = sortedActivities[bottom5PercentIndex];

    // Filter out bins below the bottom 5% threshold
    const filteredData = normalizedData.map(val => val > bottom5Threshold ? val : 0);
    const filteredTotalActivity = filteredData.reduce((sum, val) => sum + val, 0);

    // Calculate 95% of filtered activity
    const target95 = filteredTotalActivity * 0.95;

    // Find consistent activity start point (where activity begins) - for reference only
    const consistentStartBin = findConsistentActivityStart(normalizedData);

    // CDI calculation: Find the minimum duration needed to reach 95% activity
    // Test ALL possible starting points to ensure truly circular calculation
    let minBinsTo95Percent = normalizedData.length;
    let optimalStartBin = 0;

    // Test EVERY possible starting point around the full cycle (truly circular)
    for (let startBin = 0; startBin < filteredData.length; startBin++) {
      let cumulativeActivity = 0;
      let binsNeeded = 0;

      // Try consecutive bins starting from this point, wrapping around
      for (let i = 0; i < filteredData.length; i++) {
        const binIndex = (startBin + i) % filteredData.length;
        cumulativeActivity += filteredData[binIndex];
        binsNeeded++;

        if (cumulativeActivity >= target95) {
          break;
        }
      }

      // Keep track of the minimum bins needed across all starting points
      if (binsNeeded < minBinsTo95Percent) {
        minBinsTo95Percent = binsNeeded;
        optimalStartBin = startBin;
      }
    }

    // CDI is the fraction of the period needed to reach 95% activity
    const cdi = minBinsTo95Percent / normalizedData.length;
    
    // Calculate the time range for the optimal starting point
    const startTime = (optimalStartBin * resolution) / 60;
    const endTime = ((optimalStartBin + minBinsTo95Percent) * resolution) / 60;
    
    // Convert to clock format (0-24 hours)
    const startClock = startTime % 24;
    const endClock = endTime % 24;
    
    // Format as clock time
    const formatClockTime = (hours) => {
      const hour = Math.floor(hours);
      const minute = Math.round((hours - hour) * 60);
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    };

    // For visualization, use the original data order
    const hourlyData = [];
    let cumSum = 0;

    for (let i = 0; i < normalizedData.length; i++) {
      const hour = (i * resolution / 60) % 24;
      const activity = normalizedData[i];
      cumSum += activity;
      
      hourlyData.push({
        bin: i,
        hour: Math.round(hour),
        activity: activity,
        cumulativePercent: (cumSum / totalActivity) * 100
      });
    }

    // Use custom thresholds if enabled
    const threshold1 = enableCustomThresholds ? strongThreshold : 0.33;
    const threshold2 = enableCustomThresholds ? moderateThreshold : 0.66;

    return {
      cdi: cdi,
      totalActivity: totalActivity,
      binsTo95Percent: minBinsTo95Percent,
      hoursTo95Percent: (minBinsTo95Percent * resolution) / 60,
      onsetBin: optimalStartBin,
      onsetHour: startClock,
      consolidation: cdi <= threshold1 ? 'Strong' : cdi <= threshold2 ? 'Moderate' : 'Weak/Absent',
      consolidationLevel: cdi <= threshold1 ? 0 : cdi <= threshold2 ? 1 : 2, // 0=Strong, 1=Moderate, 2=Weak
      hourlyData: hourlyData,
      periodHours: periodHours,
      consistentStartBin: consistentStartBin,
      // Time range for 95% activity
      timeRange95Percent: {
        startTime: startClock,
        endTime: endClock,
        startTimeFormatted: formatClockTime(startClock),
        endTimeFormatted: formatClockTime(endClock),
        duration: endClock - startClock + (endClock < startClock ? periodHours : 0) // Handle period wrap-around
      },
      thresholds: {
        strong: threshold1,
        moderate: threshold2
      }
    };
  }, [resolution, customPeriod, enableCustomPeriod, enableCustomThresholds, strongThreshold, moderateThreshold]);

  const handleCalculate = () => {
    let activityData = [];
    
    try {
      if (activeTab === 'csv' && csvData) {
        activityData = parseCSV(csvData);
      } else if (activeTab === 'manual' && manualData) {
        activityData = parseManualData(manualData);
      }

      if (activityData.length === 0) {
        alert('Please provide valid activity data');
        return;
      }

      if (multiDay) {
        // Calculate bins per hour for shift conversion
        const binsPerHour = 60 / resolution;
        const effectiveShift = getEffectiveHourShift();
        const shiftBins = Math.round(effectiveShift * binsPerHour);
        activityData = parseMultiDayData(activityData, numDays, enablePeriodLengthening, shiftBins);
      }

      // Detect circadian period for multi-day data
      let detectedPeriodInfo = null;
      if (multiDay && activityData.length > 0) {
        detectedPeriodInfo = detectCircadianPeriod(activityData, resolution);
        if (detectedPeriodInfo) {
          setDetectedPeriod(detectedPeriodInfo);
          setCustomPeriod(detectedPeriodInfo.period);
        }
      }

      const result = calculateCDI(activityData, detectedPeriodInfo?.period);
      setResults(result);
    } catch (error) {
      alert(`Error processing data: ${error.message}`);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCsvData(e.target.result);
        // Auto-detect days from CSV data
        const parsedData = parseCSV(e.target.result);
        const detection = detectDaysFromData(parsedData);
        if (detection) {
          setAutoDetectedDays(detection.days);
          setNumDays(detection.days);
          setMultiDay(detection.days > 1);
          setResolution(detection.resolution);
        }
      };
      reader.readAsText(file);
    }
  };

  const exportResults = () => {
    if (!results) return;
    
    const exportData = {
      cdi: results.cdi,
      consolidation: results.consolidation,
      totalActivity: results.totalActivity,
      hoursTo95Percent: results.hoursTo95Percent,
      onsetHour: results.onsetHour,
      resolution: resolution,
      periodHours: results.periodHours,
      consistentStartBin: results.consistentStartBin,
      timeRange95Percent: results.timeRange95Percent,
      detectedPeriod: detectedPeriod,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cdi_results.json';
    a.click();
  };

  const loadSampleData = () => {
    // Sample data: 3 days of hourly bins (24 bins per day) in CSV format
    // Represents continuous activity pattern with strong consolidation (CDI ≈ 0.667)
    // Pattern: Low activity during rest phase, high activity during active phase
    const sampleData = `day 1\tday 2\tday 3
45\t35\t24
65\t65\t24
56\t35\t35
56\t24\t14
54\t54\t35
32\t24\t24
32\t15\t35
56\t45\t45
43\t43\t43
67\t67\t35
54\t35\t35
33\t33\t35
45\t35\t35
33\t6\t6
23\t6\t6
3\t3\t3
4\t4\t4
5\t5\t5
1\t1\t1
2\t2\t2
3\t3\t3
67\t56\t56
78\t78\t78
65\t65\t65`;

    // Switch to CSV tab and load the data
    setActiveTab('csv');
    setCsvData(sampleData);

    // Auto-process the CSV data
    try {
      const parsedData = parseCSV(sampleData);
      const detection = detectDaysFromData(parsedData);
      if (detection) {
        setAutoDetectedDays(detection.days);
        setNumDays(detection.days);
        setMultiDay(detection.days > 1);
        setResolution(detection.resolution);
      } else {
        // Fallback: Unable to auto-detect, assume single day
        setMultiDay(false);
        setNumDays(1);
      }
    } catch (error) {
      console.error('Error loading sample data:', error);
    }
  };

  const setBaseline = () => {
    let activityData = [];
    
    try {
      if (activeTab === 'csv' && csvData) {
        activityData = parseCSV(csvData);
      } else if (activeTab === 'manual' && manualData) {
        activityData = parseManualData(manualData);
      }

      if (activityData.length === 0) {
        alert('Please provide valid baseline data');
        return;
      }

      if (multiDay) {
        // Calculate bins per hour for shift conversion
        const binsPerHour = 60 / resolution;
        const effectiveShift = getEffectiveHourShift();
        const shiftBins = Math.round(effectiveShift * binsPerHour);
        activityData = parseMultiDayData(activityData, numDays, enablePeriodLengthening, shiftBins);
      }

      const result = calculateCDI(activityData);
      setBaselineData(activityData);
      setBaselineResults(result);
      alert(`Baseline set! CDI: ${result.cdi.toFixed(3)} (${result.consolidation})`);
    } catch (error) {
      alert(`Error processing baseline data: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Circadian Duration Index (CDI) Calculator</h1>
            <span className="ml-auto px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
              v{APP_VERSION}
            </span>
          </div>
          <p className="text-gray-600">
            Calculate the fraction of a circadian period needed to complete 95% of total activity.
            Supports both 24-hour and custom circadian periods (20-28h). Features ClockLab-compatible
            period detection and enhanced activity start point detection.<br/>
            Based on the method developed by Richardson et al. (2023).<br/>
            <small className="text-gray-500">Tool created by Yeshuwa Taylor | Methodology by Dr. Melissa E. Richardson PhD</small>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Data Input</h2>
              
              {/* Auto-detected Resolution Display */}
              {autoDetectedDays && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-800">
                      Time Resolution: {resolution} minutes
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Auto-detected from data structure
                  </p>
                </div>
              )}

              {/* Auto-detected Days Display */}
              {autoDetectedDays && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">
                      Auto-detected: {autoDetectedDays} day{autoDetectedDays > 1 ? 's' : ''} of data
                    </span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Supports 1-14 days | Auto-detected from data structure
                  </p>
                </div>
              )}

              {/* Multi-day checkbox - now auto-managed */}
              <div className="mb-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-800">
                      {multiDay ? 'Multi-day data detected' : 'Single-day data detected'}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    {multiDay 
                      ? 'Data will be averaged across multiple days' 
                      : 'Processing single day of data'
                    }
                  </p>
                </div>
              </div>

              {/* Period Lengthening checkbox */}
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={enablePeriodLengthening}
                    onChange={(e) => setEnablePeriodLengthening(e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    disabled={!multiDay}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Enable phase shift per day
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Aligns data for free-running circadian rhythms (non-24h periods)
                </p>

                {enablePeriodLengthening && multiDay && (
                  <div className="mt-2 space-y-2">
                    {/* Warning if no custom period set */}
                    {!enableCustomPeriod && (
                      <div className="p-2 bg-yellow-50 border border-yellow-300 rounded-md">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-yellow-800">Phase shift requires custom period</p>
                            <p className="text-xs text-yellow-700 mt-1">
                              Enable "Custom circadian period" below to use phase shift properly.
                              Phase shift aligns data for free-running rhythms (non-24h periods).
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Auto-calculate from period */}
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={autoCalculateShift}
                        onChange={(e) => setAutoCalculateShift(e.target.checked)}
                        className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        disabled={!enableCustomPeriod}
                      />
                      <span className="text-xs font-medium text-gray-700">
                        Auto-calculate from period (Δφ = τ - 24h)
                      </span>
                    </label>

                    {!autoCalculateShift && (
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Phase shift per day (hours):
                        </label>
                        <input
                          type="number"
                          value={hourShiftPerDay}
                          onChange={(e) => setHourShiftPerDay(parseFloat(e.target.value) || 0)}
                          min="-12"
                          max="12"
                          step="0.1"
                          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Manual: {hourShiftPerDay > 0 ? '+' : ''}{hourShiftPerDay.toFixed(2)}h shift/day
                        </p>
                      </div>
                    )}

                    {/* Display effective shift */}
                    {enableCustomPeriod && (
                      <div className="p-2 bg-purple-50 border border-purple-200 rounded-md">
                        <p className="text-xs text-purple-800">
                          <strong>Effective shift: {getEffectiveHourShift() > 0 ? '+' : ''}{getEffectiveHourShift().toFixed(2)}h/day</strong>
                          {autoCalculateShift && (
                            <span className="block mt-1 text-purple-600">
                              Calculated: {customPeriod}h - 24h = {(customPeriod - 24).toFixed(2)}h
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-purple-600 mt-1">
                          Free-running phase shift: Δφ = τ - 24h
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Custom Period Settings */}
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={enableCustomPeriod}
                    onChange={(e) => setEnableCustomPeriod(e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Custom circadian period (non-24h)
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Enable for behaviors with periods other than 24 hours
                </p>
                
                {enableCustomPeriod && (
                  <div className="mt-2">
                    <label className="block text-xs text-gray-600 mb-1">
                      Period (hours):
                    </label>
                    <input
                      type="number"
                      value={customPeriod}
                      onChange={(e) => setCustomPeriod(parseFloat(e.target.value) || 24)}
                      min="20"
                      max="28"
                      step="0.1"
                      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Range: 20-28 hours (circadian range)
                    </p>
                  </div>
                )}
              </div>

              {/* Detected Period Display */}
              {detectedPeriod && (
                <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-purple-800">
                      Detected Period: {detectedPeriod.period.toFixed(1)}h
                    </span>
                  </div>
                  <p className="text-xs text-purple-600 mt-1">
                    Confidence: {detectedPeriod.confidence} (r={detectedPeriod.correlation.toFixed(3)})
                  </p>
                  <p className="text-xs text-purple-600">
                    ClockLab-compatible autocorrelation analysis
                  </p>
                </div>
              )}

              {/* Tab Selection */}
              <div className="flex mb-4 border-b">
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'manual' 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('manual')}
                >
                  Manual Input
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'csv' 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('csv')}
                >
                  CSV Upload
                </button>
              </div>

              {/* Manual Input */}
              {activeTab === 'manual' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity Data
                  </label>
                  <textarea
                    value={manualData}
                    onChange={(e) => {
                      setManualData(e.target.value);
                      // Auto-detect days from manual data
                      const parsedData = parseManualData(e.target.value);
                      const detection = detectDaysFromData(parsedData);
                      if (detection) {
                        setAutoDetectedDays(detection.days);
                        setNumDays(detection.days);
                        setMultiDay(detection.days > 1);
                        setResolution(detection.resolution);
                      }
                    }}
                    placeholder="Copy and paste data from CSV or similar table..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Copy and paste numerical values from CSV files or data tables
                  </p>
                </div>
              )}

              {/* CSV Upload */}
              {activeTab === 'csv' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload CSV File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-indigo-400 transition-colors">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer text-indigo-600 hover:text-indigo-500">
                      Click to upload CSV file
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Activity data should be in the second column</p>
                  </div>
                  
                  {csvData && (
                    <div className="mt-3">
                      <p className="text-sm text-green-600 mb-2">File uploaded successfully</p>
                      <textarea
                        value={csvData.slice(0, 500) + (csvData.length > 500 ? '...' : '')}
                        readOnly
                        className="w-full h-20 p-2 text-xs border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Calculate CDI
                </button>
                <button
                  onClick={setBaseline}
                  className="px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                >
                  Set Baseline
                </button>
                <button
                  onClick={loadSampleData}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                >
                  Sample
                </button>
              </div>
            </div>

              {/* CDI Guide */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">CDI Interpretation</h3>
              </div>

              {/* Threshold Error Message */}
              {thresholdError && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-red-800">{thresholdError}</p>
                  </div>
                </div>
              )}

              <div className="space-y-3 text-sm">
                {/* Strong threshold */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded flex-shrink-0"></div>
                  <div className="flex items-center gap-1 flex-1">
                    <span className="font-medium">≤</span>
                    <input
                      type="text"
                      value={strongThreshold}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty string for backspacing
                        if (value === '') {
                          setStrongThreshold('');
                          setThresholdError('');
                          return;
                        }
                        handleStrongThresholdChange(value);
                      }}
                      onBlur={(e) => {
                        // Reset to default only if empty
                        if (e.target.value === '') {
                          setStrongThreshold(0.33);
                          setThresholdError('');
                        }
                      }}
                      className="w-20 px-2 py-1 text-sm text-center border border-gray-300 rounded hover:border-indigo-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                    <span className="text-xs text-gray-500 ml-2">Strong consolidation</span>
                  </div>
                </div>

                {/* Moderate threshold */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded flex-shrink-0"></div>
                  <div className="flex items-center gap-1 flex-1">
                    <span className="font-medium text-xs">{strongThreshold ? (parseFloat(strongThreshold) + 0.01).toFixed(2) : '0.34'}</span>
                    <span className="font-medium">-</span>
                    <input
                      type="text"
                      value={moderateThreshold}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty string for backspacing
                        if (value === '') {
                          setModerateThreshold('');
                          setThresholdError('');
                          return;
                        }
                        handleModerateThresholdChange(value);
                      }}
                      onBlur={(e) => {
                        // Reset to default only if empty
                        if (e.target.value === '') {
                          setModerateThreshold(0.66);
                          setThresholdError('');
                        }
                      }}
                      className="w-20 px-2 py-1 text-sm text-center border border-gray-300 rounded hover:border-indigo-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                    <span className="text-xs text-gray-500 ml-2">Moderate consolidation</span>
                  </div>
                </div>

                {/* Weak threshold */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded flex-shrink-0"></div>
                  <div className="flex items-center gap-1 flex-1">
                    <span className="font-medium">≥ {moderateThreshold ? (parseFloat(moderateThreshold) + 0.01).toFixed(2) : '0.67'}</span>
                    <span className="text-xs text-gray-500 ml-2">Weak/absent consolidation</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-600">
                  <strong>Click threshold values to edit.</strong> Valid range: 0.0001-1.0000 (max 4 decimals)
                </p>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Enhanced Features:</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Custom circadian periods (20-28h)</li>
                  <li>• ClockLab-compatible period detection</li>
                  <li>• Consistent activity start point detection</li>
                  <li>• Multi-day analysis with period averaging</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {results ? (
              <div className="space-y-6">
                {/* Results Summary */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800">CDI Results</h2>
                    <button
                      onClick={exportResults}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-indigo-600">
                        {results.cdi.toFixed(3)}
                      </div>
                      <div className="text-sm text-gray-600">CDI Score</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-3 h-3 rounded ${
                          results.consolidationLevel === 0 ? 'bg-green-500' :
                          results.consolidationLevel === 1 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-xs text-gray-500">
                          {results.consolidationLevel === 0 ? 'Strong' :
                           results.consolidationLevel === 1 ? 'Moderate' : 'Weak'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(results.hoursTo95Percent)}h
                      </div>
                      <div className="text-sm text-gray-600">Time to 95% Activity</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {results.binsTo95Percent} bins at {resolution}min resolution
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">
                        {results.timeRange95Percent.startTimeFormatted} - {results.timeRange95Percent.endTimeFormatted}
                      </div>
                      <div className="text-sm text-gray-600">95% Activity Range</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round(results.timeRange95Percent.duration)}h duration
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {results.totalActivity.toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-600">Total Activity</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-lg">
                      <div className="text-lg font-bold text-teal-600">
                        {Math.round(results.periodHours)}h
                      </div>
                      <div className="text-sm text-gray-600">Circadian Period</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {results.periodHours !== 24 ? 'Custom period' : 'Standard 24h'}
                      </div>
                    </div>
                  </div>

                  {/* Baseline Comparison */}
                  {baselineResults && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Baseline Comparison</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Baseline CDI:</span>
                          <span className="ml-2 font-medium">{baselineResults.cdi.toFixed(3)}</span>
                          <div className={`inline-block w-2 h-2 rounded ml-2 ${
                            baselineResults.consolidationLevel === 0 ? 'bg-green-500' :
                            baselineResults.consolidationLevel === 1 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                        <div>
                          <span className="text-gray-600">Current CDI:</span>
                          <span className="ml-2 font-medium">{results.cdi.toFixed(3)}</span>
                          <div className={`inline-block w-2 h-2 rounded ml-2 ${
                            results.consolidationLevel === 0 ? 'bg-green-500' :
                            results.consolidationLevel === 1 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                        <div>
                          <span className="text-gray-600">Difference:</span>
                          <span className={`ml-2 font-medium ${
                            results.cdi > baselineResults.cdi ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {(results.cdi - baselineResults.cdi).toFixed(3)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">% Change:</span>
                          <span className={`ml-2 font-medium ${
                            results.cdi > baselineResults.cdi ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {(((results.cdi - baselineResults.cdi) / baselineResults.cdi) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Activity Distribution Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {Math.round(results.periodHours)}-Hour Activity Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results.hourlyData.filter((_, i) => i % Math.max(1, Math.floor(results.hourlyData.length / 48)) === 0)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="hour" 
                        label={{ value: 'Hour of Day', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis label={{ value: 'Activity', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="activity" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Cumulative Activity Chart */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Cumulative Activity (95% Threshold)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={results.hourlyData.filter((_, i) => i % Math.max(1, Math.floor(results.hourlyData.length / 100)) === 0)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="bin" 
                        label={{ value: 'Time Bin', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        domain={[0, 100]}
                        label={{ value: 'Cumulative %', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Cumulative Activity']} />
                      <Line 
                        type="monotone" 
                        dataKey="cumulativePercent" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={() => 95} 
                        stroke="#ef4444" 
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                        dot={false}
                        name="95% Threshold"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 h-full flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">No Results Yet</h3>
                  <p className="text-gray-400">Enter activity data and click "Calculate CDI" to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-lg shadow-lg p-4 mt-6 text-center text-sm text-gray-500">
          Based on the Circadian Duration Index method by Richardson, M.E.S., et al. (2023). 
          <em>Scientific Reports</em>, 13(1), 14423.<br/>
          <small>Tool created by Yeshuwa Taylor | Methodology by Dr. Melissa E. Richardson PhD</small><br/>
          <small>Technical Support: joey.taylor.exe@gmail.com | Research Questions: mrichardson@oakwood.edu</small>
        </div>
      </div>
    </div>
  );
};

export default CDICalculator;
