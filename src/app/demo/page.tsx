"use client"

import { useRef } from "react";
const Konva = require("react-konva");
const { Stage, Layer, Rect} = Konva;

// export interface BoardProps {
//   width: number;
//   height: number;

//   canvasRef?: object;
//   children?: any;
// }

const Demo = () => {
  const canvasRef = useRef<any>(null);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer ref={canvasRef}>
        <Rect fill='#00ff00' width={500} height={500} draggable />
      </Layer>
    </Stage>
  );
};

export default Demo;
