"use client"

import { BiscuitBoard } from "@/components";
import { applyDefaults } from "@/lib";

const fallBackData = {
  contentIDs: ["eye_0", "eye_1"],
  contentArray: [
    {
      innerXY: {
        x: 0,
        y: 0,
      },
      innerRotation: 0,
      outerRotation: 0,
      w2h: 1,
      sensitivity: 1,
      movementFactor: 1,
      innerShape: "Circle",
      outerShape: "Circle",
      innerFill: "#ff00ff",
      outerFill: "#00f000",
      innerStroke: "#ff0000",
      outerStroke: "#000000",
      disableClip: false,
      innerStrokeEnabled: true,
      innerFillEnabled: true,
      outerStrokeEnabled: true,
      outerFillEnabled: true,
      r_outerSize: 0.05,
      r_outer2inner: 0.5,
      r_x: 0.4,
      r_y: 0.3,
      r_innerStrokeWidth: 0.1,
      r_outerStrokeWidth: 0.01,
      active: true,
      contentID: "eye_0",
      stroke: "",
    },
    {
      innerXY: {
        x: 0,
        y: 0,
      },
      innerRotation: 0,
      outerRotation: 0,
      w2h: 1,
      sensitivity: 1,
      movementFactor: 1,
      innerShape: "Circle",
      outerShape: "Circle",
      innerFill: "#00ff00",
      outerFill: "#000000",
      innerStroke: "#000000",
      outerStroke: "#000000",
      disableClip: false,
      innerStrokeEnabled: true,
      innerFillEnabled: true,
      outerStrokeEnabled: true,
      outerFillEnabled: true,
      r_outerSize: 0.05,
      r_outer2inner: 0.5,
      r_x: 0.6,
      r_y: 0.3,
      r_innerStrokeWidth: 0.1,
      r_outerStrokeWidth: 0.01,
      active: true,
      contentID: "eye_1",
    },
  ],
  biscuitID: "test-39",
};

// var contentIDs = [];
// var contentArray = [];

let contentIDs = fallBackData.contentIDs;
let contentArray = fallBackData.contentArray;
// let biscuitID = fallBackData.biscuitID;
const contentObject: any = {};
contentArray.forEach((item: any) => {
  const { contentID } = item;
  Object.keys(item).forEach((key) => {
    if (item[key] === null) {
      delete item[key];
    }
  });
  const mergeDefaults = applyDefaults(item);
  contentObject[contentID] = { ...mergeDefaults, contentID };
});

// export async function getStaticProps() {
//   return { props: { title: 'HomePage' } }
// }


const Demo = () => {
  return (
    <div style={{
      backgroundImage: `linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)`,
      backgroundSize: `20px 20px`, 
      backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`
    }}>
    <BiscuitBoard contentIDs={contentIDs} contentObject={contentObject} />
    </div>

  );
};

export default Demo;
