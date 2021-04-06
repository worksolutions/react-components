import React from "react";
import { makeExcludingDeepEqual } from "@worksolutions/utils";

import {
  ai,
  backgroundColor,
  borderNone,
  borderRadius,
  child,
  color,
  disableOutline,
  flex,
  flexColumn,
  horizontalMargin,
  horizontalPadding,
  hover,
  padding,
  pointer,
  transition,
} from "../../styles";
import Wrapper from "../Wrapper";
import Typography from "../Typography";
import { duration160 } from "../../constants/durations";

export interface TabItemInterface {
  title: string;
  active: boolean;
  onClick: () => void;
}

export const tabHorizontalPadding = 8;

function Tab({ active, title, onClick }: TabItemInterface) {
  return (
    <Wrapper
      as="button"
      disabled={active}
      styles={[
        disableOutline,
        padding(0),
        horizontalPadding(tabHorizontalPadding),
        backgroundColor("definitions.Tabs.Tab.backgroundColor"),
        flex,
        flexColumn,
        ai("center"),
        borderNone,
        borderRadius(4),
        transition(`box-shadow ${duration160}`),
        !active && [pointer, hover(child(color("definitions.Tabs.Tab.hoverColor")))],
      ]}
      onClick={onClick}
    >
      <Typography
        type="body-semi-bold"
        styles={[
          transition(`border-bottom-color ${duration160}, color ${duration160}`),
          padding("8px 4px"),
          color(active ? "definitions.Tabs.TabTabActive.color" : "definitions.Tabs.Tab.color"),
        ]}
      >
        {title}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(Tab, makeExcludingDeepEqual(["onClick"]));
