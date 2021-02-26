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
import { Colors } from "../../constants/colors";

interface TabInterface {
  title: string | React.ReactNode;
  active: boolean;
  onClick: () => void;
  tabBackgroundColor?: Colors;
  tabTitleColor?: Colors;
  tabTitleHoverColor?: Colors;
  tabTitleActiveColor?: Colors;
  activeTabTitleColor?: Colors;
}

export const tabHorizontalPadding = 8;

function Tab({
  active: activeProp,
  title,
  onClick,
  tabBackgroundColor = "transparent",
  tabTitleColor = "gray-blue/05",
  tabTitleHoverColor = "gray-blue/07",
  tabTitleActiveColor = "gray-blue/09",
  activeTabTitleColor = "gray-blue/09",
}: TabInterface) {
  return (
    <Wrapper
      as="button"
      disabled={activeProp}
      styles={[
        disableOutline,
        verticalPadding(0),
        horizontalPadding(tabHorizontalPadding),
        backgroundColor(tabBackgroundColor),
        flex,
        flexColumn,
        ai("center"),
        borderNone,
        !activeProp && [pointer, hover(child(color(tabTitleHoverColor))), active(child(color(tabTitleActiveColor)))],
      ]}
      onClick={onClick}
    >
      <Typography
        type="body-semi-bold"
        color={activeProp ? activeTabTitleColor : tabTitleColor}
        styles={[transition(`border-bottom-color ${duration160}, color ${duration160}`), padding("8px 4px")]}
      >
        {title}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(Tab, makeExcludingDeepEqual(["onClick"]));
