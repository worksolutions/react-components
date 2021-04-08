import React from "react";
import { stopPropagation } from "@worksolutions/react-utils";

import {
  ai,
  backgroundColor,
  borderNone,
  borderRadius,
  child,
  disableOutline,
  fillColor,
  flex,
  horizontalPadding,
  hover,
  maxWidth,
  padding,
  paddingLeft,
  paddingRight,
  pointer,
  transition,
} from "../../styles";

import Typography from "../Typography";
import Icon from "../Icon";
import Wrapper from "../Wrapper";
import { duration160 } from "../../constants/durations";

export interface TokenInterface {
  title: string | number;
  styles?: any;
  canRemove?: boolean;
  onRemove?: () => void;
}

function Token({ title, styles, onRemove, canRemove }: TokenInterface) {
  return (
    <Wrapper
      styles={[
        maxWidth("100%"),
        flex,
        ai("center"),
        padding(0),
        backgroundColor("gray-blue/02"),
        disableOutline,
        borderNone,
        borderRadius(4),
        child(transition(`fill ${duration160}`), ".icon use"),
        canRemove
          ? [pointer, paddingLeft(8), paddingRight(2), hover(fillColor("gray-blue/05"), ".icon use")]
          : [horizontalPadding(8)],
        styles,
      ]}
      as="button"
      onClick={canRemove && stopPropagation(onRemove)}
    >
      <Typography dots>{title}</Typography>
      {canRemove && <Icon className="icon" icon="cross-small" color="gray-blue/07" />}
    </Wrapper>
  );
}

export default React.memo(Token);
