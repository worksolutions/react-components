import React from "react";

import Typography, { TypographyInterface } from "../../Typography";
import { fontWeight } from "../../../styles";

interface BreadcrumbsTextInterface extends Omit<TypographyInterface, "children"> {
  text: string;
}

function BreadcrumbsText({ text, ...props }: BreadcrumbsTextInterface) {
  return (
    <Typography
      color="definitions.Breadcrumbs.BreadcrumbsText.color"
      {...props}
      styles={[fontWeight(500), props.styles]}
    >
      {text}
    </Typography>
  );
}

export default React.memo(BreadcrumbsText);
