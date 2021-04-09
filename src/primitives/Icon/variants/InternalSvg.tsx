import React from "react";
import styled from "styled-components";
import { prop } from "ramda";

import { internalIcons } from "../list";
import { getColor, stringOrPixels } from "../../../styles";
import { IconVariantProps } from "./Type";

const StyledSvg = styled.svg<{ width: any; height: any; fillColor: any }>`
  display: inline-block;
  min-width: ${(props) => stringOrPixels(props.width!)};
  min-height: ${(props) => stringOrPixels(props.height!)};

  use {
    fill: ${prop("fillColor")};
  }
`;

function InternalSvg(
  {
    className,
    icon: rawIcon,
    width: widthProp,
    height: heightProp,
    styles,
    color = "gray-blue/05",
  }: IconVariantProps<keyof typeof internalIcons>,
  ref: any,
) {
  const icon = React.useMemo(() => internalIcons[rawIcon], [rawIcon]);

  return (
    <StyledSvg
      name="internal-svg"
      ref={ref}
      css={styles}
      as="svg"
      className={className}
      width={widthProp}
      height={heightProp}
      viewBox={icon.viewBox}
      fillColor={getColor(color)}
    >
      <use xlinkHref={icon.symbol} />
    </StyledSvg>
  );
}

export default React.forwardRef(InternalSvg);
