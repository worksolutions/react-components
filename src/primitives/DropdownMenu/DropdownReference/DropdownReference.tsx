import React from "react";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { ai, color, flex, flexValue, pointer, textAlign } from "../../../styles";
import { Colors } from "../../../constants/colors";

export interface DropdownHeaderProps {
  styles?: any;
  text?: string;
  colorTextHeader?: Colors;
  textReferenceStyles: any;
}

function DropdownReference({
  styles,
  text,
  colorTextHeader = "gray-blue/05",
  textReferenceStyles,
}: DropdownHeaderProps) {
  return (
    <Wrapper
      as="button"
      styles={[flexValue(1), textAlign("left"), color("definitions.DropdownReference.text"), pointer, styles]}
    >
      <Wrapper styles={[flex, ai("center")]}>
        <Typography dots color={colorTextHeader} styles={textReferenceStyles}>
          {text}
        </Typography>
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(DropdownReference);
