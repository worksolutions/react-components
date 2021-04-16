import React from "react";
import { isString } from "@worksolutions/utils";

import { ai, flex, flexShrink, jc } from "../styles";
import Icon, { InternalIcons } from "../primitives/Icon";
import Wrapper from "../primitives/Wrapper";

export type UniversalSideContentType = InternalIcons | JSX.Element | undefined;

export function makeUniversalIconContent(icon?: UniversalSideContentType, styles?: any) {
  if (!icon) return null;
  const content = isString(icon) ? <Icon icon={icon} color="definitions.ListItem.BorderIcons.color" /> : icon;
  return <Wrapper styles={[flex, ai("center"), jc("center"), flexShrink(0), styles]}>{content}</Wrapper>;
}
