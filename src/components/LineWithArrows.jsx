import React from 'react';
import { Line, Arrow, Text } from 'react-konva';

function LineWithArrows({
  x1,
  y1,
  x2,
  y2,
  arrowLength = 5,
  stroke = 'black',
  strokeWidth = 1,
  text = '',
  textColor = 'black',
  textFontSize = 14,
}) {
  // Calculate the direction vector
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);

  // Normalize the direction vector
  const unitDx = dx / length;
  const unitDy = dy / length;

  // Calculate points for the arrows
  const arrowStartPoints = [
    x1,
    y1,
    x1 - arrowLength * unitDx,
    y1 - arrowLength * unitDy,
  ];

  const arrowEndPoints = [
    x2,
    y2,
    x2 + arrowLength * unitDx,
    y2 + arrowLength * unitDy,
  ];

  // Calculate midpoint for text
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Determine if the line is vertical
  const isVertical = dx === 0;

  return (
    <>
      {/* Main Line */}
      <Line
        points={[x1, y1, x2, y2]}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {/* Arrow at the start */}
      <Arrow
        points={arrowStartPoints}
        stroke={stroke}
        fill={stroke}
        strokeWidth={strokeWidth}
      />
      {/* Arrow at the end */}
      <Arrow
        points={arrowEndPoints}
        stroke={stroke}
        fill={stroke}
        strokeWidth={strokeWidth}
      />
      {/* Text in the middle */}
      {text && (
        <Text
          x={isVertical ? midX + 5 : midX}
          y={isVertical ? midY : midY + 5}
          text={text}
          fill={textColor}
          fontSize={textFontSize}
          align="center"
        />
      )}
    </>
  );
}

export default LineWithArrows;
