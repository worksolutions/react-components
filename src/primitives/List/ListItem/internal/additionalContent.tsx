import React from "react";
import { isString } from "@worksolutions/utils";

import { ai, child, flex, flexShrink, hover, jc, opacity } from "../../../../styles";
import Icon, { InternalIcons } from "../../../Icon";
import Wrapper from "../../../Wrapper";

export function getHoveredStylesForLeftContent(showOnHover?: boolean) {
  if (showOnHover) {
    return [child(opacity(0), ".list-item-left-content"), hover(child(opacity(1), ".list-item-left-content"))];
  }

  return null;
}

export function getHoveredStylesForRightContent(showOnHover?: boolean) {
  if (showOnHover) {
    return [child(opacity(0), ".list-item-right-content"), hover(child(opacity(1), ".list-item-right-content"))];
  }

  return null;
}

export function makeIcon(icon?: React.ReactNode | InternalIcons, styles?: any) {
  if (!icon) return null;
  const content = isString(icon) ? <Icon icon={icon} /> : icon;
  return <Wrapper styles={[flex, ai("center"), jc("center"), flexShrink(0), styles]}>{content}</Wrapper>;
}
