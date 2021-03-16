import { nbspString } from "@worksolutions/utils";
import React from "react";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { Colors } from "../../../constants/colors";
import { marginTop, maxHeight, opacity, overflow, transition } from "../../../styles";
import { duration160 } from "../../../constants/durations";

interface TipInterface {
  tip: string | undefined;
  color: Colors;
}

function Tip({ tip, color }: TipInterface) {
  const hasTip = !!tip;

  return (
    <Wrapper
      styles={[
        overflow("hidden"),
        tip ? maxHeight("auto") : maxHeight(0),
        transition(`opacity ${duration160}`),
        hasTip ? opacity(1) : opacity(0),
      ]}
    >
      <Typography styles={marginTop(4)} type="caption-regular" color={color}>
        {tip || nbspString}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(Tip);
