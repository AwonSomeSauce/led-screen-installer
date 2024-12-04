import React from 'react';
import './InformationCard.css';

const InformationCard = () => {
  return (
    <div className="information-card">
      <div className="information-header">
        <div className="logo-section">
          <img
            src="https://via.placeholder.com/150" /* Replace with the actual logo URL */
            alt="SignCast Media Logo"
            className="logo"
          />
          <div className="contact-info">
            <p>361 Steelcase RD. W, #1,</p>
            <p>MARKHAM, ONTARIO</p>
            <p>Phone: (416) 900-2233</p>
          </div>
        </div>
        <div className="description">
          <strong>Description:</strong>
          <span>Horizontal + PC In Niche</span>
        </div>
      </div>
      <div className="information-details">
        <div className="row">
          <div className="cell">
            <strong>Drawn</strong>
          </div>
          <div className="cell">SignCast</div>
          <div className="cell">
            <strong>Screen Size</strong>
          </div>
          <div className="cell">LG 55" Touch Display</div>
        </div>
        <div className="row">
          <div className="cell">
            <strong>Date</strong>
          </div>
          <div className="cell">09/12/2023</div>
          <div className="cell">
            <strong>Department</strong>
          </div>
          <div className="cell">Installations</div>
        </div>
        <div className="row">
          <div className="cell">
            <strong>Sheet</strong>
          </div>
          <div className="cell">1 of 1</div>
          <div className="cell">
            <strong>Revision</strong>
          </div>
          <div className="cell">00</div>
        </div>
      </div>
    </div>
  );
};

export default InformationCard;
