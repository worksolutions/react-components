import React from "react";
import {
  ai,
  borderNone,
  borderRadius,
  child,
  disableOutline,
  flex,
  focus,
  fullHeight,
  fullWidth,
  hover,
  jc,
  padding,
  pointer,
  transition,
  backgroundColor,
  boxShadow,
  color,
} from "../../../styles";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { duration160 } from "../../../constants/durations";

type ItemVariants = { isToday?: boolean; selected?: boolean; holiday?: boolean };

function getItemData(data: ItemVariants) {
  if (data.selected) {
    return { styles: [child([color("white"), backgroundColor("blue/05")])], canClick: false };
  }

  if (data.isToday) {
    return {
      styles: [pointer, child(boxShadow([0, 0, 0, 1, "gray-blue/03"])), hover(child(backgroundColor("gray-blue/01")))],
      canClick: true,
    };
  }

  if (data.holiday) {
    return {
      styles: [pointer, hover(child(backgroundColor("gray-blue/01"))), child(color("red/05"))],
      canClick: true,
    };
  }

  return {
    styles: [pointer, hover(child(backgroundColor("gray-blue/01")))],
    canClick: true,
  };
}

function CalendarItem({
  value,
  selected,
  isToday,
  holiday,
  onClick,
}: {
  value?: string | number;
  onClick?: () => void;
} & ItemVariants) {
  const { styles, canClick } = getItemData({ selected, isToday, holiday });
  return (
    <Wrapper
      as="button"
      className="day"
      styles={[
        backgroundColor("transparent"),
        disableOutline,
        borderNone,
        padding("8px 6px"),
        canClick && focus(child(boxShadow([0, 0, 0, 2, "blue/04"]))),
        value && styles,
      ]}
      onClick={() => canClick && onClick && onClick()}
    >
      <Typography
        styles={[
          transition(`background-color ${duration160}, box-shadow ${duration160}, color ${duration160}`),
          flex,
          fullWidth,
          fullHeight,
          ai("center"),
          jc("center"),
          borderRadius(6),
        ]}
      >
        {value}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(CalendarItem);
