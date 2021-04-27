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
  horizontalPadding,
  hover,
  opacity,
  padding,
  pointer,
  transition,
} from "../../styles";
import Wrapper from "../Wrapper";
import Typography, { TypographyInterface } from "../Typography";
import { duration160 } from "../../constants/durations";

export interface TabItemInterface {
  title: string;
  active: boolean;
  styles?: any;
  typographyStyles?: any;
  typographyType: TypographyInterface["type"];
  disabled?: boolean;
  onClick?: () => void;
}

export const tabHorizontalPadding = 6;

function Tab({
  styles,
  active,
  title,
  disabled,
  typographyStyles,
  typographyType = "body-semi-bold",
  onClick,
}: TabItemInterface) {
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
        !active && !disabled && [pointer, hover(child(color("definitions.Tabs.Tab.hoverColor")))],
        disabled && opacity(0.7),
        styles,
      ]}
      onClick={!disabled && onClick}
    >
      <Typography
        type={typographyType}
        styles={[
          transition(`border-bottom-color ${duration160}, color ${duration160}`),
          padding("8px 4px"),
          color(active ? "definitions.Tabs.TabTabActive.color" : "definitions.Tabs.Tab.color"),
          typographyStyles,
        ]}
      >
        {title}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(Tab, makeExcludingDeepEqual(["onClick"]));
