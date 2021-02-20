import React from "react";

import TypographyLink, { TypographyLinkProps } from "../Typography/TypographyLink";
import Wrapper from "../Wrapper";
import Typography from "../Typography";
import Icon from "../Icon";
import {
  ai,
  backgroundColor,
  borderRadius,
  bottom,
  boxShadow,
  child,
  color,
  content,
  disableDecoration,
  disableOutline,
  display,
  flex,
  focus,
  fontSize,
  fontWeight,
  hover,
  left,
  lineHeight,
  marginBottom,
  marginRight,
  padding,
  position,
  right,
  top,
  transition,
} from "../../styles";
import { duration160 } from "../../constants/durations";
import { Colors } from "constants/colors";

export interface BreadcrumbsItemProps extends Omit<TypographyLinkProps, "children"> {
  text: string;
  isLastItem: boolean;
  withBadge: boolean;
  badgeColor: Colors;
}

interface BreadcrumbsWrapperProps {
  isLastItem: boolean;
  children?: React.ReactNode;
}

function BreadcrumbsItem({ to, text, isLastItem, withBadge, badgeColor }: BreadcrumbsItemProps) {
  const breadcrumbsItemCommonStyles = [
    position("relative"),
    display("block"),
    ai("center"),
    padding(withBadge ? "2px 8px 3px 24px" : "2px 8px 3px"),
    borderRadius(4),
    fontSize(14),
    lineHeight("1.5"),
    fontWeight(500),
  ];

  const BreadcrumbsWrapper = ({ isLastItem, children }: BreadcrumbsWrapperProps) => {
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
  };

  return (
    <Wrapper styles={[position("relative"), flex, lineHeight(1), marginRight(10), marginBottom(10)]}>
      <BreadcrumbsWrapper isLastItem={isLastItem}>
        {withBadge && (
          <Wrapper styles={[marginRight(8)]}>
            <Icon
              width={8}
              height={8}
              icon="badge"
              color={badgeColor}
              styles={[position("absolute"), top(8), left(8)]}
            />
          </Wrapper>
        )}

        <Typography
          styles={[
            position("relative"),
            display("inline"),
            color("gray-blue/05"),
            !isLastItem &&
              child([content("/"), position("absolute"), bottom(-1), right(-16), display("block")], "&:after"),
          ]}
        >
          {text}
        </Typography>
      </BreadcrumbsWrapper>
    </Wrapper>
  );
}

export default React.memo(BreadcrumbsItem);
