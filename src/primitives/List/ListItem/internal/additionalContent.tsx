import React from "react";
import { isString } from "@worksolutions/utils";

import { ai, child, flex, flexShrink, hover, jc, opacity } from "../../../../styles";
import Icon, { InternalIcons } from "../../../Icon";
import Wrapper from "../../../Wrapper";

export function getHoveredStylesForBorderContent(borderContentSelector: string, showOnHover?: boolean) {
  if (showOnHover) {
    return [child(opacity(0), borderContentSelector), hover(child(opacity(1), borderContentSelector))];
  }

  return null;
}

export function makeIcon(icon?: React.ReactNode | InternalIcons, styles?: any) {
  if (!icon) return null;
  const content = isString(icon) ? <Icon icon={icon} color="definitions.ListItem.BorderIcon.color" /> : icon;
  return <Wrapper styles={[flex, ai("center"), jc("center"), flexShrink(0), styles]}>{content}</Wrapper>;
}
