import React from "react";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { ai, color, flex, flexValue, pointer, textAlign } from "../../../styles";
import { Colors } from "../../../constants/colors";

export interface DropdownHeaderProps {
  stylesTextReference: any;
  styles?: any;
  text?: string;
  colorTextHeader?: Colors;
}

function DropdownReference({
  styles,
  stylesTextReference,
  text,
  colorTextHeader = "gray-blue/05",
}: DropdownHeaderProps) {
  return (
    <Wrapper
      as="button"
      styles={[flexValue(1), textAlign("left"), color("definitions.DropdownReference.text"), pointer, styles]}
    >
      <Wrapper styles={[flex, ai("center")]}>
        <Typography dots color={colorTextHeader} styles={stylesTextReference}>
          {text}
        </Typography>
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(DropdownReference);
