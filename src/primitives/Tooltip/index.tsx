import React from "react";

import { padding } from "../../styles";
import { Typography } from "../../index";

export interface TooltipTextContentInterface {
  children: string;
  styles: any;
}

function TooltipTextContent({ children, styles }: TooltipTextContentInterface) {
  return (
    <Typography type="caption-regular" styles={[padding("8px 12px"), styles]}>
      {children}
    </Typography>
  );
}
export default React.memo(TooltipTextContent);
