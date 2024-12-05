import { useState, useEffect } from 'react';

import Configurations from './components/Configurations';
import CanvasContainer from './components/CanvasContainer';
import Description from './components/Description';
import './App.css';

function App() {
  const [config, setConfig] = useState({
    model: {},
    mount: '',
    media_player: '',
    receptacle_box: '',
    orientation: 'horizontal',
    installType: '',
    floorDistance: 50,
    title: '',
    drawer: '',
    department: '',
    screenSize: '',
    date: '',
  });

  return (
    <div className="app-container">
      {/* Canvas Section */}
      <CanvasContainer config={config} />

      {/* Controls Section */}
      <div className="controls-container">
        {/* Configuration */}
        <Configurations config={config} setConfig={setConfig} />
        <Description config={config} setConfig={setConfig} />
      </div>
    </div>
  );
}

export default App;
