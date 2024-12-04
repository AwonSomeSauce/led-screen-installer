import React from 'react';
import './NotesCard.css';

const NotesCard = ({ title, notes, dimensions }) => {
  return (
    <div className="notes-card">
      <h3 className="notes-title">{title}</h3>
      <div className="notes-content">
        <ul className="notes-list">
          {notes.map((note, index) => (
            <li key={index} className="notes-item">
              {note}
            </li>
          ))}
        </ul>
        <div className="notes-dimensions">
          {dimensions.map((dim, index) => (
            <div className="dimension" key={index}>
              <div className="dimension-key">{dim.label}</div>
              <div className="dimension-value">{dim.value}"</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesCard;
