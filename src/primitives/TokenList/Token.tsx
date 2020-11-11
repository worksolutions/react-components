import React from "react";
import { stopPropagation } from "@worksolutions/utils";

import {
  ai,
  borderNone,
  borderRadius,
  child,
  disableOutline,
  flex,
  hover,
  maxWidth,
  padding,
  paddingRight,
  pointer,
  transition,
  backgroundColor,
  fillColor,
} from "../../styles";

import Typography from "../Typography";
import Icon from "../Icon";
import Wrapper from "../Wrapper";
import { duration160 } from "../../constants/durations";

interface TokenInterface {
  title: string | number;
  styles?: any;
  canRemove?: boolean;
  remove?: () => void;
}

function Token({ title, styles, remove, canRemove }: TokenInterface) {
  return (
    <Wrapper
      styles={[
        maxWidth("100%"),
        flex,
        ai("center"),
        padding("0 2px 0 8px"),
        backgroundColor("gray-blue/02"),
        disableOutline,
        borderNone,
        borderRadius(4),
        child(transition(`fill ${duration160}`), ".icon use"),
        canRemove ? [pointer, hover(fillColor("gray-blue/05"), ".icon use")] : [paddingRight(8)],
        styles,
      ]}
      as="button"
      onClick={canRemove && stopPropagation(remove)}
    >
      <Typography dots>{title}</Typography>
      {canRemove && <Icon className="icon" icon="cross-small" color="gray-blue/07" />}
    </Wrapper>
  );
}

export default React.memo(Token);
