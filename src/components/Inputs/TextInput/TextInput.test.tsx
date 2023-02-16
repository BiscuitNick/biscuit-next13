import React from "react";
import { render } from "@testing-library/react"; //, screen
import TextInput from "./";
import { describe, test } from "node:test";

describe("TextInput", () => {
  test("Renders TogleSwitch", () => {
    render(
      <TextInput
        id="TextInputId"
        value={"some text"}
        onChange={(e: { target: { value: any } }) =>
          console.log(!e.target.value)
        }
      />
    );
    // screen.debug();
  });
});
