import React from "react";
import { useSpring, animated } from "@react-spring/web"; //config

export interface DiceFace {
  img: string | null;
  text: string | null;
  backgroundColor: string | null;
  border: string | null;
  divStyle?: any;
}

interface DiceProps {
  size: number;
  n: number;
  counter: number;
  onClick?: () => void;
  faces: DiceFace[];
  margin: number;

  minRotation: boolean;

  sides?: number;
}

const random360 = (min = 1, max = 5) =>
  (Math.floor(Math.random() * max) + min) * 360;


const dotMatrix = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0], // 1 center dot 
  [1, 0, 0, 0, 0, 0, 0, 0, 1], // 2 corner dots
  [1, 0, 0, 0, 1, 0, 0, 0, 1], // 3, 2 corner dots + center dot
  [1, 0, 1, 0, 0, 0, 1, 0, 1], // 4 corner dots
  [1, 0, 1, 0, 1, 0, 1, 0, 1], // 5, 4 corner dots + center dot
  [1, 0, 1, 1, 0, 1, 1, 0, 1], // 6, 4 corner dots + 2 side dots
];

const baseTenDotMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
  ...dotMatrix,
  [1, 0, 1, 1, 1, 1, 1, 0, 1], // 7, 4 corner dots + 2 side dots + center dot
  [1, 1, 1, 1, 0, 1, 1, 1, 1], // 8, 4 corner dots + 4 side dots
  [1, 1, 1, 1, 1, 1, 1, 1, 1], // 9, 4 corner dots + 4 side dots + center dot
]


const Dots = dotMatrix.map( (dotMap,i):any => (
  <div key={i} style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gridTemplateRows:'1fr 1fr 1fr', width: '100%', height: '100%', padding:10, boxSizing:'border-box'}}>
    {dotMap.map( (dot,i) => dot ? <div key={i} style={{background:'black', width: '80%', height:'80%', margin:'auto', padding:5, boxSizing:'border-box', borderRadius:'100%'}}/> : <div key={i} />)}
  </div>
  ) 
)

const BaseTenDots = baseTenDotMatrix.map( (dotMap,i) => <div key={i} style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gridTemplateRows:'1fr 1fr 1fr', width: '100%', height: '100%', padding:10, boxSizing:'border-box'}}>
{dotMap.map( (dot,i) => dot ? <div key={i} style={{background:'black', width: '80%', height:'80%', margin:'auto', padding:5, boxSizing:'border-box', borderRadius:'100%'}}/> : <div key={i}/>)}
</div> )



const Dice = (props: DiceProps) => {
  const {
    size,
    n,
    counter = 0,
    onClick,
    faces,
    // margin,
    minRotation = false,
    sides = 6 // 'standard-10 // 
  } = props;

  const width = size;
  const height = size;
  const DotFaces = sides===10 ? BaseTenDots : Dots;


  const rotations = [
    { y: 180, x: 0, z: 0, side: "back" },
    { y: -90, x: 0, z: 0, side: "left" },
    { y: 0, x: 90, z: 0, side: "top" },
    { y: 0, x: -90, z: 0, side: "bottom" },
    { y: 90, x: 0, z: 0, side: "right" },
    { y: 0, x: 0, z: 0, side: "front" },
  ];

  const { x, y, z,  } = rotations[n % 6]; 

  var xRotation = x + random360();
  var yRotation = y + random360();
  var zRotation = z + random360();

  if (minRotation) {
    xRotation = x || 0;
    yRotation = y || 0;
    zRotation = z || 0;
  }

  const [{ transform }] = useSpring(
    () => ({
      transform: `translateZ(${
        -size / 2
      }px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) rotateZ(${zRotation}deg) `,
    }),
    [n, counter]
  );

  const transforms = [
    `rotateY(180deg) translateZ(${size / 2}px)`,
    `rotateY(90deg) translateZ(${size / 2}px)`,
    `rotateX(-90deg) translateZ(${size / 2}px)`,
    `rotateX(90deg) translateZ(${size / 2}px)`,
    `rotateY(-90deg) translateZ(${size / 2}px)`,
    `rotateY(0deg) translateZ(${size / 2}px)`,
  ];

  const Cube = (
    <div
      style={{
        width,
        height,
        perspective: size * 2,
      }}
      onClick={onClick}
    >
      <animated.div
        style={{
          transform,
          width,
          height,
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {transforms.map((transform, i) => {
          let face = faces[i % faces.length];
          const { divStyle } = face; //img, text, backgroundColor, border,  

          const style = {
            width,
            height,
            ...divStyle,
            display: "grid",
            backgroundColor: 'white',
            backgroundSize: `cover`,
            border: 'solid 2px black', //border || "",
            boxSizing: "border-box",
          };

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                // display: "grid",
                width,
                height,
                transform,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  ...style,
                  boxSizing: "border-box",
                  display: "grid",
                }}
              >
                {DotFaces[n%6 === i%6 ? n%DotFaces.length : i%DotFaces.length]}
                {/* <span style={{position:'absolute'}}>{i} {n}</span> */}
              </div>
            </div>
          );
        })}
      </animated.div>
    </div>
  );

  return Cube;
};

export default Dice;
