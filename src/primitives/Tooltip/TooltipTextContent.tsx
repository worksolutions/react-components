import React from "react";

import Typography from "primitives/Typography";

import { padding } from "../../styles";

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
