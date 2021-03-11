import React from "react";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { ai, color, flex, flexValue, pointer, textAlign } from "../../../styles";
import { Colors } from "../../../constants/colors";

export interface DropdownHeaderProps {
  styles?: any;
  text?: string;
  colorTextHeader?: Colors;
}

function DropdownHeader({ styles, text, colorTextHeader }: DropdownHeaderProps) {
  return (
    <Wrapper
      as="button"
      styles={[flexValue(1), textAlign("left"), color("definitions.DropdownHeader.text"), pointer, styles]}
    >
      <Wrapper styles={[flex, ai("center")]}>
        <Typography dots color={colorTextHeader}>
          {text}
        </Typography>
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(DropdownHeader);
