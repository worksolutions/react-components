import React from "react";

import Wrapper from "../../../Wrapper";

import { ai, flex, flexValue, pointer, textAlign } from "../../../../styles";

export interface SelectTriggerInterface {
  styles?: any;
  children: React.ReactNode;
}

function SelectTrigger({ styles, children }: SelectTriggerInterface) {
  return (
    <Wrapper as="button" styles={[flexValue(1), textAlign("left"), flex, ai("center"), pointer, styles]}>
      {children}
    </Wrapper>
  );
}

export default React.memo(SelectTrigger);
