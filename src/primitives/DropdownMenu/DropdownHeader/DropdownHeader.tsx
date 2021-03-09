import React from "react";

import { ai, flex, flexValue, pointer, textAlign } from "../../../styles";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

export interface DropdownHeaderProps {
  styles?: any;
  text?: string;
}

function DropdownHeader({ styles, text }: DropdownHeaderProps) {
  return (
    <Wrapper as="button" styles={[styles, pointer]}>
      <Wrapper styles={[flex, ai("center")]}>
        <Typography color="definitions.DropdownHeader.text" styles={[flexValue(1), textAlign("left")]} dots>
          {text}
        </Typography>
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(DropdownHeader);
