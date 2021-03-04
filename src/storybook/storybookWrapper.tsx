import React from "react";
import { ThemeProvider } from "styled-components";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Story } from "@storybook/react/types-6-0";

import "./index.scss";

import "./initializeStorybooks";

import { TypographyGlobalStyle } from "../primitives/Typography";
import { makeTheme } from "../styles/makeTheme";

export const history = createMemoryHistory();

const defaultTheme = makeTheme();

export function storybookWrapper(Story: Story) {
  // @ts-ignore
  const element = Story({ history });

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="ws-box" style={{ display: "flex" }}>
        <TypographyGlobalStyle />
        <Router history={history}>{element}</Router>
      </div>
    </ThemeProvider>
  );
}
