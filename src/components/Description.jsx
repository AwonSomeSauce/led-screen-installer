import React from 'react';
import './Description.css';

const Description = ({ config, setConfig }) => {
  const handleInputChange = (key, value) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <div className="description-container">
      <h3>Description</h3>
      <div className="description-field">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={config.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
      </div>
      <div className="description-field">
        <label htmlFor="drawer">Drawer</label>
        <input
          type="text"
          id="drawer"
          value={config.drawer || ''}
          onChange={(e) => handleInputChange('drawer', e.target.value)}
        />
      </div>
      <div className="description-field">
        <label htmlFor="department">Department</label>
        <input
          type="text"
          id="department"
          value={config.department || ''}
          onChange={(e) => handleInputChange('department', e.target.value)}
        />
      </div>
      <div className="description-field">
        <label htmlFor="screenSize">Screen Size</label>
        <input
          type="text"
          id="screenSize"
          value={config.screenSize || ''}
          onChange={(e) => handleInputChange('screenSize', e.target.value)}
        />
      </div>
      <div className="description-field">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={config.date || ''}
          onChange={(e) => handleInputChange('date', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Description;
