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
  title: string;
  active: boolean;
  onClick: () => void;
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
        backgroundColor("white"),
        flex,
        flexColumn,
        ai("center"),
        borderNone,
        !activeProp && [pointer, hover(child(color("gray-blue/07"))), active(child(color("gray-blue/09")))],
      ]}
      onClick={onClick}
    >
      <Typography
        type="body-semi-bold"
        color={activeProp ? "gray-blue/09" : "gray-blue/05"}
        styles={[transition(`border-bottom-color ${duration160}, color ${duration160}`), padding("8px 4px")]}
      >
        {title}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(Tab, makeExcludingDeepEqual(["onClick"]));
