import React from "react";
import { ThemeProvider } from "styled-components";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Story } from "@storybook/react/types-6-0";
import { useLocalStorage } from "react-use";

import "./initializeStorybooks";
import { colors as darkColors } from "../constants/colorsMap/dark";

import { TypographyGlobalStyle } from "../primitives/Typography";
import "../css/index.scss";
import { makeTheme } from "../styles/makeTheme";
import { position, right, Toggle, top } from "../index";

export const history = createMemoryHistory();

const defaultTheme = { name: "default", theme: makeTheme() };

const darkTheme = {
  name: "dark",
  theme: makeTheme({
    colors: darkColors,
    definitions: {
      Button: {
        primary: {
          color: "white",
          backgroundColor: "blue/09",
        },
      },
      Tabs: {
        bottomLineColor: "red/05",
        tabBackgroundColor: "transparent",
        tabTitleColor: "gray-blue/05",
        tabTitleHoverColor: "gray-blue/07",
        tabTitleActiveColor: "gray-blue/09",
      },
    },
  }),
};

export function storybookWrapper(Story: Story) {
  // @ts-ignore
  const element = Story({ history });

  const [localStorageTheme, setLocalStorageTheme] = useLocalStorage("theme", defaultTheme);

  const changeTheme = React.useCallback((enabled: boolean) => {
    setLocalStorageTheme(enabled ? darkTheme : defaultTheme);
  }, []);

  if (!localStorageTheme) return null;

  return (
    <ThemeProvider theme={localStorageTheme.theme}>
      <div className="ws-box" style={{ display: "flex" }}>
        <TypographyGlobalStyle />
        <Router history={history}>{element}</Router>
        <Toggle
          styles={[position("absolute"), top(20), right(20)]}
          enabled={localStorageTheme.name === "dark"}
          onChange={changeTheme}
          text="Темная тема"
          textOnRight={false}
        />
      </div>
    </ThemeProvider>
  );
}
