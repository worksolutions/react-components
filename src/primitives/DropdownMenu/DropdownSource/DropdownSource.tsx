import React from "react";

import Wrapper from "../../Wrapper";

import { ai, color, flex, flexValue, lineHeight, pointer, textAlign, textDots } from "../../../styles";

export interface DropdownSourceInterface {
  stylesTextSource: any;
  styles?: any;
  text: string;
}

function DropdownSource({ styles, stylesTextSource, text }: DropdownSourceInterface) {
  return (
    <Wrapper
      as="button"
      styles={[flexValue(1), textAlign("left"), color("definitions.DropdownSource.text"), pointer, styles]}
    >
      <Wrapper styles={[flex, ai("center")]}>
        <Wrapper styles={[color("gray-blue/05"), textDots, lineHeight("143%"), stylesTextSource]}>{text}</Wrapper>
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(DropdownSource);
