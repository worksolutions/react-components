import React from "react";
import { fullHeight, horizontalPadding, transition, width, borderLeft } from "../../styles";

import Wrapper from "../Wrapper";
import { duration200 } from "../../constants/durations";

interface DividerInterface {
  styles?: any;
}

function Divider({ styles }: DividerInterface) {
  return (
    <Wrapper styles={[transition(`opacity ${duration200}`), horizontalPadding(2), styles]}>
      <Wrapper styles={[width(1), fullHeight, borderLeft(1, "definitions.RadioGroup.dividerColor")]} />
    </Wrapper>
  );
}

export default React.memo(Divider);
