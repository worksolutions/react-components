import React from "react";

import TypographyLink, { TypographyLinkInterface } from "../../Typography/TypographyLink";

interface BreadcrumbsLinkInterface extends Omit<TypographyLinkInterface, "children"> {
  text: string;
}

function BreadcrumbsLink({ text, ...props }: BreadcrumbsLinkInterface) {
  return (
    <TypographyLink color="definitions.Breadcrumbs.BreadcrumbsLink.color" {...props}>
      {text}
    </TypographyLink>
  );
}

export default React.memo(BreadcrumbsLink);
