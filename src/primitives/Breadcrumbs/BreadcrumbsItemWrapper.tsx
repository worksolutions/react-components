import React from "react";
import Typography from "../Typography";
import TypographyLink, { TypographyLinkProps } from "../Typography/TypographyLink";
import {
  ai,
  backgroundColor,
  borderRadius,
  boxShadow,
  disableDecoration,
  disableOutline,
  display,
  focus,
  fontSize,
  fontWeight,
  hover,
  lineHeight,
  padding,
  position,
  transition,
} from "../../styles";
import { duration160 } from "../../constants/durations";

interface BreadcrumbsItemWrapperProps extends Pick<TypographyLinkProps, "to"> {
  isLastItem: boolean;
  withBadge: boolean;
  children?: React.ReactNode;
}

function BreadcrumbsItemWrapper({ isLastItem, withBadge, children, to }: BreadcrumbsItemWrapperProps) {
  const breadcrumbsItemCommonStyles = [
    position("relative"),
    display("block"),
    ai("center"),
    padding(withBadge ? "2px 8px 2px 24px" : "2px 8px"),
    borderRadius(4),
    fontSize(14),
    lineHeight("1.5"),
    fontWeight(500),
  ];

  if (isLastItem) {
    return <Typography styles={breadcrumbsItemCommonStyles}>{children}</Typography>;
  }

  return (
    <TypographyLink
      to={to}
      styles={[
        breadcrumbsItemCommonStyles,
        hover(backgroundColor("gray-blue/01")),
        focus(boxShadow([0, 0, 0, 2, "blue/05"])),
        transition(`background-color, box-shadow ${duration160}`),
        disableOutline,
        disableDecoration,
      ]}
    >
      {children}
    </TypographyLink>
  );
}

export default React.memo(BreadcrumbsItemWrapper);
