import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react"; //ComponentStory, 
import ColorPickerSwitch from "./";
// import "../../../../styles/globals.css";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Biscuit-Library/Inputs/ColorPickerSwitch",
  component: ColorPickerSwitch,
  argTypes: {
    value: {
      defaultValue: "#ff00ff",
    },
    toggleValue: {
      defaultValue: true,
    },
  },
} as ComponentMeta<typeof ColorPickerSwitch>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof ColorPickerSwitch> = (args) => (
//   <ColorPickerSwitch {...args} />
// );

export const Example = ({ value }: any) => {
  const [color, setState] = useState(value);
  const [toggleValue, setToggle] = useState(true);

  return (
    <ColorPickerSwitch
      value={color}
      toggleValue={toggleValue}
      label={"PickerSwitch"}
      id={"ColorPickerSwitch"}
      toggleId={"ToggleID"}
      onChange={(e: { target: { value: string } }) => setState(e.target.value)}
      onToggle={() => setToggle(!toggleValue)}
    />
  );
};
