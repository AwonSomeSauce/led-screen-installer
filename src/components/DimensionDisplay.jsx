import React from 'react';
import './DimensionDisplay.css';

const DimensionDisplay = ({ title, data }) => {
  return (
    <div className="dimension-display">
      <h3>{title}</h3>
      <div className="dimension-rows">
        {Object.entries(data).map(([key, value]) => (
          <div className="dimension-row" key={key}>
            <div className="dimension-key">{key}</div>
            <div className="dimension-value">{value}"</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DimensionDisplay;
