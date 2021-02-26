import React from "react";
import { makeExcludingDeepEqual } from "@worksolutions/utils";

import {
  active,
  ai,
  borderNone,
  child,
  disableOutline,
  flex,
  flexColumn,
  horizontalPadding,
  hover,
  padding,
  pointer,
  transition,
  verticalPadding,
  backgroundColor,
  color,
} from "../../styles";
import Wrapper from "../Wrapper";
import Typography from "../Typography";
import { duration160 } from "../../constants/durations";

interface TabInterface {
  title: React.ReactNode;
  active: boolean;
  onClick: () => void;
  renderContent: () => React.ReactNode;
}

export const tabHorizontalPadding = 8;

function Tab({ active: activeProp, title, onClick }: TabInterface) {
  return (
    <Wrapper
      as="button"
      disabled={activeProp}
      styles={[
        disableOutline,
        verticalPadding(0),
        horizontalPadding(tabHorizontalPadding),
        backgroundColor("definitions.Tabs.tabBackgroundColor"),
        flex,
        flexColumn,
        ai("center"),
        borderNone,
        !activeProp && [
          pointer,
          hover(child(color("definitions.Tabs.tabTitleHoverColor"))),
          active(child(color("definitions.Tabs.tabTitleActiveColor"))),
        ],
      ]}
      onClick={onClick}
    >
      <Typography
        type="body-semi-bold"
        styles={[
          transition(`border-bottom-color ${duration160}, color ${duration160}`),
          padding("8px 4px"),
          color(activeProp ? "definitions.Tabs.tabTitleActiveColor" : "definitions.Tabs.tabTitleColor"),
        ]}
      >
        {title}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(Tab, makeExcludingDeepEqual(["onClick"]));
