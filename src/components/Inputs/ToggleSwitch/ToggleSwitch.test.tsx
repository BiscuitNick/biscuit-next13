import React from "react";
import { render } from "@testing-library/react";
import ToggleSwitch from "./";
import { describe, test } from "node:test";

describe("ToggleSwitch", () => {
  test("Renders TogleSwitch", () => {
    render(
      <ToggleSwitch
        id="ToggleSwitchId"
        value={true}
        onChange={(e: { target: { value: any } }) =>
          console.log(!e.target.value)
        }
      />
    );
  });
});
