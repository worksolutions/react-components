import React from "react";

import { ai, flex, flexColumn, padding, textAlign } from "../../../styles";
import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

export type ListItemEmptyInterface = {
  styles?: any;
  text?: string;
  beforeText?: React.ReactNode;
  afterText?: React.ReactNode;
};

function ListItemEmpty({ styles, text, beforeText, afterText }: ListItemEmptyInterface) {
  return (
    <Wrapper styles={[padding("20px 16px"), flex, flexColumn, ai("center"), styles]}>
      {beforeText}
      {text && (
        <Typography styles={textAlign("center")} color="definitions.ListItemEmpty.textColor">
          {text}
        </Typography>
      )}
      {afterText}
    </Wrapper>
  );
}

export default React.memo(ListItemEmpty);
