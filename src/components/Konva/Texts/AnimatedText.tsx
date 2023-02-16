import { useMemo } from "react";
import getTextLines from "../../../utils/getTextLines";

const SpringKonva = require("@react-spring/konva");
const { animated, useSprings, useSpring } = SpringKonva;
// const Konva = require("react-konva");
// const { Group, Text } = Konva;

interface AnimatedTextProps {
  //Size & Position
  x: number;
  y: number;
  width: number;
  height: number;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;

  align?: string;

  //Style
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeWidthFactor?: number;
  //Events
  handleClick?: any;
  handleDrag?: any;

  //Meta
  contentID: string;
  box: { width: number; height: number };
  canvasRef: any;

  draggable?: boolean;
  immediateXY?: boolean;
  listening?: boolean;
  fillEnabled?: boolean;
  strokeEnabled?: boolean;
  textBoxStrokeEnabled?: boolean;
  textBoxFillEnabled?: boolean;

  //Text Specific
  fontFamily?: string;
  fontStyle?: string;
  textContent?: string;

  minLines?: number;
  maxLines?: number;
  textBoxStroke?: string;
  textBoxFill?: string;
}

const AnimatedText = (props: AnimatedTextProps) => {
  const {
    x,
    y,
    width,
    height,
    offsetX,
    offsetY,
    rotation,

    strokeWidthFactor,
    fill,
    stroke,
    fontFamily,

    handleClick,
    handleDrag,

    contentID,
    box,
    canvasRef,

    fontStyle,

    draggable,
    // immediateXY,
    // listening,
    fillEnabled,
    strokeEnabled,
    // textBoxFillEnabled,
    // textBoxStrokeEnabled,
    textContent,
  } = props;

  const align = props.align || "center";

  const textLines = useMemo(() => {
    const mytexts = getTextLines({
      box: { width: width || 0, height: height || 0 },
      content: props,
      canvasRef,
    });

    return mytexts || [];
  }, [textContent, width, height, fontFamily, fontStyle]); //box.width, box.height,

  const [textspring] = useSprings(
    textLines.length,
    (i: number) => {
      const line = textLines[i];
      const {
        fontSize, //: unAdjustedFontSize,
        text,
        fontWeight,
      } = line;

      const strokeWidth = fontSize * (strokeWidthFactor || 0);
      //   const fontSize = unAdjustedFontSize - strokeWidth * 0;

      return {
        text,
        fontSize,
        strokeWidth,
        y: line.y,
        width: line.width,
        height: line.height,
        fill,
        stroke,
        fontFamily,

        fontStyle: fontStyle || fontWeight,
        align,
        hitStrokeWidth: fontSize,

        // immediate: true,

        immmediate: [
          // "text",
          // "fontSize",
          // "width",
          // "height",
          // "fontFamily",
          // "fontStyle",
          // "strokeWidth",
          // "stroke",
          // "fill",
          "x",
          "y",
          // "align",
        ],
      }; //, fontSize: adjustedFontSize, strokeWidth };
    },
    [textLines, strokeWidthFactor, fill, stroke, align]
  );

  const SizedTexts = textspring.map((txt: any, i: number) => (
    <animated.Text
      key={"txt-" + i}
      {...txt}
      contentID={contentID}
      draggable={false}
      fillEnabled={fillEnabled}
      strokeEnabled={strokeEnabled}
      shadowForStrokeEnabled={false}
      onClick={handleClick}
    ></animated.Text>
  ));

  const groupSpring = useSpring({
    x,
    y,
    width,
    height,
    offsetX,
    offsetY,
    rotation,
    immediate: ["x", "y", "offsetX", "offsetY", "width", "height"],
  });

  return (
    <animated.Group
      {...groupSpring}
      contentID={contentID}
      id={contentID}
      box={box}
      onClick={handleClick}
      onDragStart={handleDrag}
      onDragEnd={handleDrag}
      draggable={draggable}
      listening={true}
    >
      {SizedTexts}
    </animated.Group>
  );
};

export default AnimatedText;
