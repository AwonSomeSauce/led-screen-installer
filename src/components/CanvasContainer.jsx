import React, { useRef } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';

import DimensionDisplay from './DimensionDisplay';
import NotesCard from './NotesCard';
import InformationCard from './InformationCard';
import LineWithArrows from './LineWithArrows';
import './CanvasContainer.css';

const CanvasContainer = ({ config }) => {
  const stageRef = useRef();

  // Canvas dimensions
  const canvasWidth = 600;
  const canvasHeight = 750;

  // Input dimensions in inches from config
  const screenWidthInInches =
    config.model && config.model.width ? Number(config.model.width) : 1; // Default to 1 to avoid division by zero
  const screenHeightInInches =
    config.model && config.model.height ? Number(config.model.height) : 1;
  const floorDistance =
    config.model && config.model.floorDistance
      ? Number(config.model.floorDistance)
      : 50;
  const nicheWidthInInches = screenWidthInInches + 2;
  const nicheHeightInInches = screenHeightInInches + 2;

  // Margins and clearances in pixels
  const padding = 100; // Padding around the screen in pixels
  const clearance = 10; // Clearance for niche around the screen in pixels

  // Calculate the aspect ratio of the screen
  const aspectRatio = screenWidthInInches / screenHeightInInches;

  // Determine scaling factor to fit the screen within the canvas
  let scaledScreenWidth, scaledScreenHeight;

  if (aspectRatio > canvasWidth / canvasHeight) {
    // Screen is wider relative to canvas
    scaledScreenWidth = canvasWidth - padding * 2;
    scaledScreenHeight = scaledScreenWidth / aspectRatio;
  } else {
    // Screen is taller relative to canvas
    scaledScreenHeight = canvasHeight - padding * 2;
    scaledScreenWidth = scaledScreenHeight * aspectRatio;
  }

  // Position the screen at the center of the canvas
  const screenX = (canvasWidth - scaledScreenWidth) / 2;
  const screenY = (canvasHeight - scaledScreenHeight) / 2;

  // Niche dimensions and positions
  const nicheWidth = scaledScreenWidth + clearance * 2;
  const nicheHeight = scaledScreenHeight + clearance * 2;
  const nicheX = screenX - clearance;
  const nicheY = screenY - clearance;

  // Calculate the center coordinates of the screen
  const centerX = screenX + scaledScreenWidth / 2;
  const centerY = screenY + scaledScreenHeight / 2;

  return (
    <div className="canvas-container">
      {/* Canvas Area */}
      <div className="canvas-area">
        <div className="canvas-stage">
          <Stage width={canvasWidth} height={canvasHeight} ref={stageRef}>
            <Layer>
              {/* Screen Rectangle */}
              <Rect
                x={screenX}
                y={screenY}
                width={scaledScreenWidth}
                height={scaledScreenHeight}
                stroke="black"
                strokeWidth={5}
              />
              {/* Niche Rectangle */}
              <Rect
                x={nicheX}
                y={nicheY}
                width={nicheWidth}
                height={nicheHeight}
                stroke="black"
                strokeWidth={2}
              />
              {/* Measurement Lines and Labels */}
              {/* Horizontal Measurement (Screen Width) */}
              <Line
                points={[
                  screenX,
                  screenY - 15,
                  screenX,
                  screenY - 35,
                  screenX + scaledScreenWidth,
                  screenY - 35,
                  screenX + scaledScreenWidth,
                  screenY - 15,
                ]}
                stroke="black"
                strokeWidth={1}
              />
              <LineWithArrows
                x1={screenX + 5}
                y1={screenY - 35}
                x2={screenX + scaledScreenWidth - 5}
                y2={screenY - 35}
                text={`${screenWidthInInches}"`}
              />
              {/* Vertical Measurement (Screen Height) */}
              <Line
                points={[
                  screenX + scaledScreenWidth + 15,
                  screenY,
                  screenX + scaledScreenWidth + 35,
                  screenY,
                  screenX + scaledScreenWidth + 35,
                  screenY + scaledScreenHeight,
                  screenX + scaledScreenWidth + 15,
                  screenY + scaledScreenHeight,
                ]}
                stroke="black"
                strokeWidth={1}
              />
              <LineWithArrows
                x1={screenX + scaledScreenWidth + 35}
                y1={screenY + 5}
                x2={screenX + scaledScreenWidth + 35}
                y2={screenY + scaledScreenHeight - 5}
                text={`${screenHeightInInches}"`}
              />
              {/* Measurement Lines and Labels for Niche */}
              {/* Horizontal Measurement (Niche Width) */}
              <Line
                points={[
                  nicheX,
                  nicheY + nicheHeight + 5,
                  nicheX,
                  nicheY + nicheHeight + 25,
                  nicheX + nicheWidth,
                  nicheY + nicheHeight + 25,
                  nicheX + nicheWidth,
                  nicheY + nicheHeight + 5,
                ]}
                stroke="black"
                strokeWidth={1}
              />
              <LineWithArrows
                x1={nicheX + 5}
                y1={nicheY + nicheHeight + 25}
                x2={nicheX + nicheWidth - 5}
                y2={nicheY + nicheHeight + 25}
                text={`${nicheWidthInInches}"`}
              />
              {/* Vertical Measurement (Niche Height) */}
              <Line
                points={[
                  nicheX - 5,
                  nicheY,
                  nicheX - 25,
                  nicheY,
                  nicheX - 25,
                  nicheY + nicheHeight,
                  nicheX - 5,
                  nicheY + nicheHeight,
                ]}
                stroke="black"
                strokeWidth={1}
              />
              <LineWithArrows
                x1={nicheX - 25}
                y1={nicheY + 5}
                x2={nicheX - 25}
                y2={nicheY + nicheHeight - 5}
                text={`${nicheHeightInInches}"`}
              />
              {/* Floor Line */}
              <Line
                points={[
                  0,
                  canvasHeight - padding,
                  canvasWidth,
                  canvasHeight - padding,
                ]}
                stroke="gray"
                strokeWidth={2}
              />
              {/* Vertical Axis */}
              <Line
                points={[centerX, 150, centerX, canvasHeight - 150]}
                stroke="black"
                strokeWidth={1}
                dash={[5, 5]}
              />
              {/* Horizontal Axis */}
              <Line
                points={[25, centerY, canvasWidth - 25, centerY]}
                stroke="black"
                strokeWidth={1}
                dash={[5, 5]}
              />

              {/* Floor Distance Line */}
              <LineWithArrows
                x1={30}
                y1={canvasHeight - padding - 5}
                x2={30}
                y2={centerY + 10}
                text={`${floorDistance}"`}
              />
            </Layer>
          </Stage>
        </div>
      </div>

      {/* Information and Notes */}
      {/* Uncomment and use these components as needed */}
      <div className="info-area">
        <InformationCard
          dimensions={{
            Width: screenWidthInInches,
            Height: screenHeightInInches,
          }}
        />
        {/* <NotesCard
          notes={[
            'Install recessed receptacle box with:',
            '2x Terminated Power Outlets',
            '1x Terminated Data CAT5 Ethernet Outlet',
          ]}
        /> */}
      </div>
    </div>
  );
};

export default CanvasContainer;
