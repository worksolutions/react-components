import React, { useMemo } from "react";
import { nbspString } from "@worksolutions/utils";
import { IncomeColorVariant } from "@worksolutions/react-utils";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { Colors } from "../../../constants/colors";
import { marginTop, maxHeight, opacity, overflow, transition } from "../../../styles";
import { duration160 } from "../../../constants/durations";

interface TipInterface {
  tip: string | undefined;
  color: IncomeColorVariant<Colors>;
}

function getTipVisibilitiesStylesStyles(hasTip: boolean) {
  return hasTip ? [maxHeight("auto"), opacity(1)] : [maxHeight(0), opacity(0)];
}

function Tip({ tip, color }: TipInterface) {
  const tipVisibilitiesStyles = useMemo(() => getTipVisibilitiesStylesStyles(Boolean(tip)), [tip]);

  return (
    <Wrapper styles={[overflow("hidden"), transition(`opacity ${duration160}`), tipVisibilitiesStyles]}>
      <Typography styles={marginTop(4)} type="caption-regular" color={color}>
        {tip || nbspString}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(Tip);
