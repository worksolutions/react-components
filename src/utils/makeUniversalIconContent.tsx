import React from "react";
import { isString } from "@worksolutions/utils";
import { IncomeColorVariant } from "@worksolutions/react-utils";

import { ai, flex, flexShrink, jc } from "../styles";
import Icon, { InternalIcons } from "../primitives/Icon";
import Wrapper from "../primitives/Wrapper";

import { Colors } from "../constants/colors";

export type UniversalSideContentType = InternalIcons | JSX.Element | undefined;

export function makeUniversalIconContent({
  icon,
  color,
  styles,
}: {
  icon?: UniversalSideContentType;
  styles?: any;
  color?: IncomeColorVariant<Colors>;
}) {
  if (!icon) return null;
  const content = isString(icon) ? <Icon icon={icon} color={color} /> : icon;
  return <Wrapper styles={[flex, ai("center"), jc("center"), flexShrink(0), styles]}>{content}</Wrapper>;
}
