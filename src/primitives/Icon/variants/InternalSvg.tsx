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
    icon,
    width: widthProp,
    height: heightProp,
    styles,
    color = "gray-blue/05",
  }: IconVariantProps<keyof typeof internalIcons>,
  ref: any,
) {
  const rawIcon = React.useMemo(() => (icon in internalIcons ? internalIcons[icon] : icon), [icon]);

  return (
    <StyledSvg
      name="internal-svg"
      ref={ref}
      css={styles}
      as="svg"
      className={className}
      width={widthProp}
      height={heightProp}
      viewBox={rawIcon.viewBox}
      fillColor={getColor(color)}
    >
      <use xlinkHref={rawIcon.symbol} />
    </StyledSvg>
  );
}

export default React.forwardRef(InternalSvg);
