"use client"

import { useRef, useEffect, useState} from "react";
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
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(()=>{
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  },
  [])

  return (
    <Stage width={width} height={height}>
      <Layer ref={canvasRef}>
        <Rect fill='#00ff00' width={500} height={500} draggable />
      </Layer>
    </Stage>
  );
};

export default Demo;
