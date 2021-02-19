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
  width,
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
 position, right, flexWrap, marginBottom, top, bottom, left
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
    position('relative'),
    display("block"),
    ai("center"),
    padding(withBadge ? "2px 8px 3px 24px" : "2px 8px 3px"),
    borderRadius("4px"),
    fontSize(14),
    lineHeight("1.5"),
    fontWeight(500),
  ];

  const BreadcrumbsWrapper: React.FC<BreadcrumbsWrapperProps> = ({ item, isLastElement, children }) => {
    if (isLastElement) {
      return <Typography styles={breadcrumbsItemCommonStyles}>{children}</Typography>;
    }

    return (
      <TypographyLink
        to={item.to}
        styles={[
          [...breadcrumbsItemCommonStyles],
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

  const renderBreadcrumbsItems = React.useCallback(() => {
    if (!items.length) return null;
    return items.map((item, index) => {
      const isLastElement = index === items.length - 1;
      return (
        <Wrapper
          key={index}
          styles={[
            position("relative"),
            display("flex"),
            lineHeight(1),
            marginRight("10px"),
            marginBottom("10px"),
          ]}
        >
          <BreadcrumbsWrapper item={item} isLastElement={isLastElement}>
            {withBadge && (
              <Wrapper styles={[marginRight("8px")]}>
                <Icon width={8} height={8} icon="badge" color="blue/05" styles={[position('absolute'), top('8px'), left('8px')]} />
              </Wrapper>
            )}
            <Typography
                styles={[
                    position("relative"),
                    display('inline'),
                    color("gray-blue/05"),
                    !isLastElement && child([content("/"), position('absolute'), bottom('-1px'), right('-16px'), display("block")], "&:after")
                ]}
            >
              {item.text}
            </Typography>
          </BreadcrumbsWrapper>
        </Wrapper>
      );
    });
  }, [items]);

  return <Wrapper styles={[display("flex"), flexWrap, width("100%")]}>{renderBreadcrumbsItems()}</Wrapper>;
}

export default React.memo(Breadcrumbs);
