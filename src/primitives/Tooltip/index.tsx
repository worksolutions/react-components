import React from "react";
import Wrapper from "../Wrapper";
import { color, fontSize, letterSpacing, lineHeight, padding } from "../../styles";

export interface TooltipProps {
  children: string;
}
function Tooltip({ children }: TooltipProps) {
  return (
    <Wrapper styles={[padding("8px 12px"), color("gray-blue/09"), fontSize(12), lineHeight(16), letterSpacing(0.3)]}>
      {children}
    </Wrapper>
  );
}
export default React.memo(Tooltip);
