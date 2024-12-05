import { useState, useEffect } from 'react';
import Papa from 'papaparse';

import DropdownSelector from './DropdownSelector';
import './Configurations.css';

const Configurations = ({ config, setConfig }) => {
  const [screenOptions, setScreenOptions] = useState([]);
  const [mountTypeOptions, setMountTypeOptions] = useState([]);
  const [mediaPlayerOptions, setMediaPlayerOptions] = useState([]);
  const [receptacleBoxOptions, setReceptacleBoxOptions] = useState([]);

  // Function to load and parse the CSV file
  const loadCSVData = async (filePath, setState, mapFunction) => {
    try {
      const response = await fetch(filePath);
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const mappedData = results.data
            .map(mapFunction)
            .filter((item) => item);
          setState(mappedData);
        },
      });
    } catch (error) {
      console.error('Error loading CSV data:', error);
    }
  };

  useEffect(() => {
    // Load screen options with additional details
    loadCSVData('/data/screen_mfr.csv', setScreenOptions, (row) => ({
      model: row['Screen MFR'] || '',
      make: row['Make'] || '',
      screenSize: row['Screen Size'] || '',
      height: row['Height'] || '',
      width: row['Width'] || '',
      depth: row['Depth'] || '',
      weight: row['Weight (LBS)'] || '',
    }));

    // Load other options as simple strings
    loadCSVData(
      '/data/equipment_data.csv',
      setMountTypeOptions,
      (row) => row['Mount Type']
    );
    loadCSVData(
      '/data/equipment_data.csv',
      setMediaPlayerOptions,
      (row) => row['Media Player']
    );
    loadCSVData(
      '/data/equipment_data.csv',
      setReceptacleBoxOptions,
      (row) => row['Receptacle Box']
    );
  }, []);

  const dropdowns = [
    {
      label: 'LED Screen Model',
      key: 'model',
      options: screenOptions,
      isComplex: true, // Indicates that the options are objects
    },
    { label: 'Mount Type', key: 'mount', options: mountTypeOptions },
    {
      label: 'Media Player',
      key: 'media_player',
      options: mediaPlayerOptions,
    },
    {
      label: 'Receptacle Box',
      key: 'receptacle_box',
      options: receptacleBoxOptions,
    },
  ];

  // Handle either-or options
  const handleToggleChange = (key, value) => {
    // If toggling orientation to different than the current one swap height and width
    if (value !== config.orientation) {
      const updatedModel = {
        ...config.model,
        height: config.model.width,
        width: config.model.height,
      };
      setConfig({ ...config, [key]: value, model: updatedModel });
    } else {
      setConfig({ ...config, [key]: value });
    }
  };

  // Handle input field changes
  const handleInputChange = (key, value) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <div className="configuration">
      <h3>Configuration</h3>
      {dropdowns.map((dropdown) => (
        <DropdownSelector
          key={dropdown.key}
          label={dropdown.label}
          options={dropdown.options}
          onChange={(value) => {
            setConfig({ ...config, [dropdown.key]: value });
          }}
          // Handle label for complex options (e.g., showing the model name)
          getOptionLabel={
            dropdown.isComplex ? (option) => option.model : undefined
          }
        />
      ))}
      {/* Either-Or Options */}
      <div className="toggle-group">
        <div className="toggle-option">
          <button
            className={`toggle-button ${
              config.orientation === 'vertical' ? 'active' : ''
            }`}
            onClick={() => handleToggleChange('orientation', 'vertical')}
          >
            Vertical
          </button>
          <button
            className={`toggle-button ${
              config.orientation === 'horizontal' ? 'active' : ''
            }`}
            onClick={() => handleToggleChange('orientation', 'horizontal')}
          >
            Horizontal
          </button>
        </div>

        <div className="toggle-option">
          <button
            className={`toggle-button ${
              config.installType === 'niche' ? 'active' : ''
            }`}
            onClick={() => handleToggleChange('installType', 'niche')}
          >
            Niche
          </button>
          <button
            className={`toggle-button ${
              config.installType === 'flat_wall' ? 'active' : ''
            }`}
            onClick={() => handleToggleChange('installType', 'flat_wall')}
          >
            Flat Wall
          </button>
        </div>
      </div>
      {/* Input Fields */}
      <div className="input-group">
        <div className="input-field">
          <label htmlFor="floorDistance">Floor Distance (in)</label>
          <input
            type="number"
            id="floorDistance"
            value={config.floorDistance || ''}
            onChange={(e) => handleInputChange('floorDistance', e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="nicheDepthVar">Niche Depth Var (in)</label>
          <input
            type="number"
            id="nicheDepthVar"
            value={config.nicheDepthVar || ''}
            onChange={(e) => handleInputChange('nicheDepthVar', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Configurations;
