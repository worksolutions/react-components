import React from "react";

import Wrapper from "../../Wrapper";

import { ai, flex, flexValue, lineHeight, pointer, textAlign, textDots } from "../../../styles";
import { Typography } from "../../../index";

export interface DropdownMainButtonInterface {
  stylesTextMainButton: any;
  styles?: any;
  text: string;
}

function DropdownMainButton({ styles, stylesTextMainButton, text }: DropdownMainButtonInterface) {
  return (
    <Wrapper as="button" styles={[flexValue(1), textAlign("left"), flex, ai("center"), pointer, styles]}>
      <Typography
        color="definitions.DropdownMainButton.colorText"
        styles={[textDots, lineHeight("143%"), stylesTextMainButton]}
      >
        {text}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(DropdownMainButton);
