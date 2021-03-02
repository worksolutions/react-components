import { InputIconProp } from "../../Input/InputWrapper";
import { isString } from "@worksolutions/utils";
import Icon from "../../Icon";
import Wrapper from "../../Wrapper";
import { ai, borderRadius, flex, flexShrink, jc, overflow } from "../../../styles";
import React from "react";

export function makeIcon(icon?: InputIconProp, styles?: any, circledIcon = true) {
  const content = icon ? isString(icon) ? <Icon icon={icon} /> : icon : null;
  if (!content) return null;
  return (
    <Wrapper
      styles={[
        flex,
        borderRadius(circledIcon ? "100%" : 4),
        overflow("hidden"),
        ai("center"),
        jc("center"),
        flexShrink(0),
        styles,
      ]}
    >
      {content}
    </Wrapper>
  );
}
