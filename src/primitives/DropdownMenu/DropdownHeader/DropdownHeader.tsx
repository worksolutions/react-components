import Wrapper from "../../Wrapper";
import { ai, flex, flexValue, pointer, textAlign } from "../../../styles";
import Typography from "../../Typography";
import React from "react";

export interface DropdownHeaderProps {
  styles?: any;
  text: string;
}

function DropdownHeader({ styles, text }: DropdownHeaderProps) {
  return (
    <Wrapper as="button" styles={[styles, pointer]}>
      <Wrapper styles={[flex, ai("center")]}>
        <Typography color={"gray-blue/05"} styles={[flexValue(1), textAlign("left")]} dots>
          {text}
        </Typography>
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(DropdownHeader);
