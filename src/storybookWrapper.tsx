import React from "react";
import { INTL } from "@worksolutions/utils";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Story } from "@storybook/react/types-6-0";
import "moment/locale/ru";

import { TypographyGlobalStyle } from "./primitives/Typography";
import "./styles/index.scss";
import { intl, setIntl } from "./intl";
import { ruIntlDictionary } from "./intl/ru";

setIntl(new INTL(ruIntlDictionary));
intl.init();

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
