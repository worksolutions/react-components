import React from "react";

import { TypographyLinkProps } from "../Typography/TypographyLink";
import Wrapper from "../Wrapper";
import Typography from "../Typography";
import Icon from "../Icon";
import BreadcrumbsItemWrapper from "./BreadcrumbsItemWrapper";
import {
  bottom,
  child,
  color,
  content,
  display,
  flex,
  left,
  lineHeight,
  marginBottom,
  marginRight,
  position,
  right,
  top,
} from "../../styles";
import { Colors } from "../../constants/colors";

export interface BreadcrumbsItemProps extends Omit<TypographyLinkProps, "children"> {
  text: string;
  isLastItem: boolean;
  withBadge: boolean;
  badgeColor: Colors;
}

function BreadcrumbsItem({ to, text, isLastItem, withBadge, badgeColor }: BreadcrumbsItemProps) {
  return (
    <Wrapper styles={[position("relative"), flex, lineHeight(1), marginRight(10), marginBottom(10)]}>
      <BreadcrumbsItemWrapper isLastItem={isLastItem} withBadge={withBadge} to={to}>
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
              child([content("/"), position("absolute"), bottom(-2), right(-16), display("block")], "&:after"),
          ]}
        >
          {text}
        </Typography>
      </BreadcrumbsItemWrapper>
    </Wrapper>
  );
}

export default React.memo(BreadcrumbsItem);
