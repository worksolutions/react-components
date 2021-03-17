import React from "react";

import Wrapper from "../../Wrapper";

import { ai, flex, flexValue, pointer, textAlign } from "../../../styles";

export interface DropdownMainButtonInterface {
  styles?: any;
  children: React.ReactNode;
}

function DropdownMainButton({ styles, children }: DropdownMainButtonInterface) {
  return (
    <Wrapper as="button" styles={[flexValue(1), textAlign("left"), flex, ai("center"), pointer, styles]}>
      {children}
    </Wrapper>
  );
}

export default React.memo(DropdownMainButton);
