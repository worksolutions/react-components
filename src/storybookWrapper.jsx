import React from "react";

import { TypographyGlobalStyle } from "./primitives/Typography";
import "./styles/index.scss";

export function storybookWrapper(Story) {
  return (
    <div className="ws-box" style={{ display: "flex" }}>
      <TypographyGlobalStyle />
      <Story />
    </div>
  );
}
