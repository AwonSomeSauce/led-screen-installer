import { useState, useEffect } from 'react';

import Configurations from './components/Configurations';
import CanvasContainer from './components/CanvasContainer';
import './App.css';

function App() {
  const [config, setConfig] = useState({
    model: {},
    mount: '',
    media_player: '',
    receptacle_box: '',
    orientation: 'horizontal',
    floorDistance: 0,
  });

  return (
    <div className="app-container">
      {/* Canvas Section */}
      <div className="canvas-container">
        <h2>Canvas Area</h2>
        {/* Placeholder for the canvas */}
        <CanvasContainer config={config} />
      </div>

      {/* Controls Section */}
      <div className="controls-container">
        {/* Configuration */}
        <Configurations config={config} setConfig={setConfig} />

        {/* Description */}
        <div className="description">
          <h3>Description</h3>
          <p>Configure the options above to update the installation diagram.</p>
          <p>Details about the selected configuration will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default App;