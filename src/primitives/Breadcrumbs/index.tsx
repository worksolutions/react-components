import React from "react";

import TypographyLink, { TypographyLinkProps } from "primitives/Typography/TypographyLink";
import Wrapper from "../Wrapper";
import Typography from "../Typography";
import {
  ai,
  borderRadius,
  color,
  disableDecoration,
  disableOutline,
  lineHeight,
  padding,
  transition,
  display,
  child,
  hover,
  backgroundColor,
  marginRight,
  focus,
  boxShadow,
  fontWeight,
  fontSize,
  content,
  position,
  right,
  flexWrap,
  marginBottom,
  top,
  bottom,
  left,
  flex,
  fullWidth,
} from "styles";
import { duration160 } from "../..";
import Icon from "../Icon";

interface BreadcrumbsItem extends Omit<TypographyLinkProps, "children"> {
  text: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbsItem[];
  withBadge?: boolean;
}

interface BreadcrumbsWrapperProps {
  item: BreadcrumbsItem;
  isLastElement: boolean;
  children?: React.ReactNode;
}

function Breadcrumbs({ items, withBadge = false }: BreadcrumbsProps) {
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

  const BreadcrumbsWrapper = ({ item, isLastElement, children }: BreadcrumbsWrapperProps) => {
    if (isLastElement) {
      return <Typography styles={breadcrumbsItemCommonStyles}>{children}</Typography>;
    }

    return (
      <TypographyLink
        to={item.to}
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
    <Wrapper styles={[display("flex"), flexWrap, fullWidth]}>
      {items.map((item, index) => {
        const isLastElement = index === items.length - 1;
        return (
          <Wrapper key={index} styles={[position("relative"), flex, lineHeight(1), marginRight(10), marginBottom(10)]}>
            <BreadcrumbsWrapper item={item} isLastElement={isLastElement}>
              {withBadge && (
                <Wrapper styles={[marginRight(8)]}>
                  <Icon
                    width={8}
                    height={8}
                    icon="badge"
                    color="blue/05"
                    styles={[position("absolute"), top(8), left(8)]}
                  />
                </Wrapper>
              )}

              <Typography
                styles={[
                  position("relative"),
                  display("inline"),
                  color("gray-blue/05"),
                  !isLastElement &&
                    child([content("/"), position("absolute"), bottom(-1), right(-16), display("block")], "&:after"),
                ]}
              >
                {item.text}
              </Typography>
            </BreadcrumbsWrapper>
          </Wrapper>
        );
      })}
    </Wrapper>
  );
}

export default React.memo(Breadcrumbs);
