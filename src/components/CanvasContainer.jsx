import React, { useRef } from 'react';
import { Stage, Layer, Rect, Text, Line, Arrow } from 'react-konva';

import './CanvasContainer.css';

const CanvasContainer = ({ config }) => {
  const stageRef = useRef();

  // Canvas dimensions
  const canvasWidth = 600;
  const canvasHeight = 400;

  // Input dimensions in inches from config
  const screenWidthInInches = config.model ? config.model.width : 0;
  const screenHeightInInches = config.model ? config.model.height : 0;
  // const screenCenterHeightInInches = config.screenCenterHeight || 0;
  const screenCenterHeightInInches = 50;

  // Maximum expected dimensions in inches (adjust based on your requirements)
  const maxScreenWidthInInches = 100; // Example maximum width
  const maxScreenHeightInInches = 100; // Example maximum height

  // Calculate scale factor to convert inches to pixels
  const scaleX = canvasWidth / maxScreenWidthInInches;
  const scaleY = canvasHeight / maxScreenHeightInInches;
  const scale = Math.min(scaleX, scaleY); // Use the smaller scale to fit both dimensions

  // Convert dimensions from inches to pixels
  const screenWidth = screenWidthInInches * scale;
  const screenHeight = screenHeightInInches * scale;
  const screenCenterHeight = screenCenterHeightInInches * scale;

  // Calculate positions
  const screenX = (canvasWidth - screenWidth) / 2;
  const screenY = canvasHeight - screenCenterHeight - screenHeight / 2;

  // Calculate the center coordinates of the screen
  const centerX = screenX + screenWidth / 2;
  const centerY = screenY + screenHeight / 2;

  console.log(screenX);
  console.log(screenY);

  return (
    <div className="canvas-container">
      <Stage width={canvasWidth} height={canvasHeight} ref={stageRef}>
        <Layer>
          {/* Floor Line */}
          <Line
            points={[0, canvasHeight, canvasWidth, canvasHeight]}
            stroke="gray"
            strokeWidth={2}
          />

          {/* Screen Rectangle */}
          <Rect
            x={screenX}
            y={screenY}
            width={screenWidth}
            height={screenHeight}
            fill="lightblue"
            stroke="black"
            strokeWidth={2}
          />

          {/* Dashed Axes Through Screen Center */}
          {/* Vertical Axis */}
          <Line
            points={[centerX, 0, centerX, canvasHeight]}
            stroke="black"
            strokeWidth={1}
            dash={[5, 5]}
          />
          {/* Horizontal Axis */}
          <Line
            points={[0, centerY, canvasWidth, centerY]}
            stroke="black"
            strokeWidth={1}
            dash={[5, 5]}
          />

          {/* Screen Width Measurement */}
          <Line
            points={[
              screenX,
              screenY + screenHeight + 20,
              screenX + screenWidth,
              screenY + screenHeight + 20,
            ]}
            stroke="black"
            strokeWidth={1}
          />
          <Arrow
            points={[
              screenX,
              screenY + screenHeight + 20,
              screenX,
              screenY + screenHeight + 15,
            ]}
            stroke="black"
            fill="black"
            strokeWidth={1}
          />
          <Arrow
            points={[
              screenX + screenWidth,
              screenY + screenHeight + 20,
              screenX + screenWidth,
              screenY + screenHeight + 15,
            ]}
            stroke="black"
            fill="black"
            strokeWidth={1}
          />
          <Text
            x={screenX + screenWidth / 2 - 40}
            y={screenY + screenHeight + 25}
            text={`${screenWidthInInches}"`}
            fontSize={12}
            fill="black"
          />

          {/* Screen Height Measurement */}
          <Line
            points={[
              screenX - 20,
              screenY,
              screenX - 20,
              screenY + screenHeight,
            ]}
            stroke="black"
            strokeWidth={1}
          />
          <Arrow
            points={[screenX - 20, screenY, screenX - 15, screenY]}
            stroke="black"
            fill="black"
            strokeWidth={1}
          />
          <Arrow
            points={[
              screenX - 20,
              screenY + screenHeight,
              screenX - 15,
              screenY + screenHeight,
            ]}
            stroke="black"
            fill="black"
            strokeWidth={1}
          />
          <Text
            x={screenX - 60}
            y={screenY + screenHeight / 2 - 6}
            text={`${screenHeightInInches}"`}
            fontSize={12}
            fill="black"
          />

          {/* Floor Distance Line */}
          <Line
            points={[centerX, canvasHeight, centerX, centerY]}
            stroke="black"
            strokeWidth={1}
          />
          <Arrow
            points={[centerX, canvasHeight, centerX + 5, canvasHeight - 5]}
            stroke="black"
            fill="black"
            strokeWidth={1}
          />
          <Arrow
            points={[centerX, centerY, centerX + 5, centerY + 5]}
            stroke="black"
            fill="black"
            strokeWidth={1}
          />
          <Text
            x={centerX + 10}
            y={(canvasHeight + centerY) / 2 - 6}
            text={`${screenCenterHeightInInches}"`}
            fontSize={12}
            fill="black"
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasContainer;
