import React, { useRef, useEffect } from 'react';

function Lines({ firstPoint, secondPoint, movingPoint, mouseDown }) {
  const canvas = useRef();
  let ctx = null;
 
  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
 
    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, [movingPoint, secondPoint]);

  useEffect(() =>　{
    const drawLine = (info, style = {}) => {
      const { x, y, x1, y1 } = info;
      const { color = 'black', width = 1 } = style;
  
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    }

    if (mouseDown) {
      if (firstPoint.length >= 2) {
        drawLine({ x: firstPoint[0], y: firstPoint[1], x1: movingPoint[0], y1: movingPoint[1] });
      }
    }
    drawLine({ x: firstPoint[0], y: firstPoint[1], x1: secondPoint[0], y1: secondPoint[1] });
  }, [movingPoint, secondPoint]);

  return (
    <div className="canvas-wrapper">
      <canvas ref={canvas}></canvas>
    </div>
  );
}
 
export default Lines;