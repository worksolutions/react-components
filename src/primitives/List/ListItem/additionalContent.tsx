import React from "react";
import { isString } from "@worksolutions/utils";

import { ai, child, flex, flexShrink, hover, jc, opacity } from "../../../styles";
import Icon, { InternalIcons } from "../../Icon";
import Wrapper from "../../Wrapper";

interface HoveredStylesRightContentInterface {
  disabled?: boolean;
  showArrowOnSelection?: boolean;
  showIconRightOnHover?: boolean;
  showIconLeftOnHover?: boolean;
}

export function getHoveredStylesForRightContent({
  disabled,
  showArrowOnSelection,
  showIconRightOnHover,
}: HoveredStylesRightContentInterface) {
  if (disabled || showArrowOnSelection) return null;
  if (showIconRightOnHover) {
    return [hover(child(opacity(1), ".rightIcon")), child(opacity(0), ".rightIcon")];
  }
  return null;
}

export function getHoveredStylesForLeftContent({ disabled, showIconLeftOnHover }: HoveredStylesRightContentInterface) {
  if (disabled) return null;

  if (showIconLeftOnHover) {
    return [hover(child(opacity(1), ".leftIcon")), child(opacity(0), ".leftIcon")];
  }
  return null;
}

export function makeIcon(icon?: React.ReactNode | InternalIcons, styles?: any) {
  if (!icon) return null;
  const content = isString(icon) ? <Icon icon={icon} /> : icon;
  return <Wrapper styles={[flex, ai("center"), jc("center"), flexShrink(0), styles]}>{content}</Wrapper>;
}
