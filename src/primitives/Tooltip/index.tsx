import React from "react";

import { padding } from "../../styles";
import { Typography } from "../../index";

export interface TooltipProps {
  children: string;
  styles: any;
}

function TooltipTextContent({ children, styles }: TooltipProps) {
  return (
    <Typography type="caption-regular" styles={[padding("8px 12px"), styles]}>
      {children}
    </Typography>
  );
}
export default React.memo(TooltipTextContent);
