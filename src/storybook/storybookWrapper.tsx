import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Story } from "@storybook/react/types-6-0";
import "./initializeStorybooks";

import { TypographyGlobalStyle } from "../primitives/Typography";
import "../styles/index.scss";

export const history = createMemoryHistory();

export function storybookWrapper(Story: Story) {
  // @ts-ignore
  const element = Story({ history });
  return (
    <div className="ws-box" style={{ display: "flex" }}>
      <TypographyGlobalStyle />
      <Router history={history}>{element}</Router>
    </div>
  );
}
