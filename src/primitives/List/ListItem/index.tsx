import React, { useMemo } from "react";

import { flex, flexColumn, flexValue, marginLeft, marginRight, overflow, textAlign } from "../../../styles";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";
import { InternalIcons } from "../../Icon";

import { getHoveredStylesForLeftContent, getHoveredStylesForRightContent, makeIcon } from "./additionalContent";
import { getListItemStyles } from "./libs";
import { ListItemSize } from "./enum";

export interface ListItemInterface {
  leftContentStyles?: any;
  leftContent?: React.ReactNode | InternalIcons;
  rightContentStyles?: any;
  rightContent?: React.ReactNode | InternalIcons;
  active?: boolean;
  titleStyles?: any;
  styles?: any;
  heading?: string | number;
  subTitle?: string | number;
  disabled?: boolean;
  size?: ListItemSize;
  titleDots?: boolean;
  showIconRightOnHover?: boolean;
  showIconLeftOnHover?: boolean;
  showArrowOnSelection?: boolean;
  onClick?: (id: string) => void;
  children: string;
  code: string;
}

function ListItem({
  children,
  leftContent,
  leftContentStyles: leftContentStylesProp,
  rightContent,
  rightContentStyles: rightContentStylesProp,
  code,
  disabled,
  heading,
  subTitle,
  size = ListItemSize.MEDIUM,
  active,
  titleDots,
  titleStyles,
  styles,
  showIconRightOnHover,
  showIconLeftOnHover,
  showArrowOnSelection,
  onClick,
}: ListItemInterface) {
  const enabled = !disabled;
  const leftIcon = makeIcon(leftContent, [marginRight(8), leftContentStylesProp]);
  const rightIcon = makeIcon(rightContent, [marginLeft(8), rightContentStylesProp]);

  const leftContentStyles = useMemo(() => getHoveredStylesForLeftContent({ disabled, showIconLeftOnHover }), [
    disabled,
    showIconLeftOnHover,
  ]);

  const rightContentStyles = useMemo(
    () => getHoveredStylesForRightContent({ disabled, showArrowOnSelection, showIconRightOnHover }),
    [disabled, showArrowOnSelection, showIconRightOnHover],
  );

  return (
    <Wrapper
      styles={[getListItemStyles(size, enabled, active), rightContentStyles, leftContentStyles, styles]}
      onClick={() => onClick && enabled && onClick(code)}
    >
      {leftIcon && <Wrapper className="leftIcon">{leftIcon}</Wrapper>}
      <Wrapper styles={[flexValue(1), textAlign("left"), flex, flexColumn, overflow("hidden")]}>
        {heading && (
          <Typography type="caption-regular" noWrap>
            {heading}
          </Typography>
        )}
        <Typography dots={titleDots} noWrap styles={titleStyles}>
          {children}
        </Typography>
        {subTitle && (
          <Typography color="gray-blue/05" type="caption-regular" noWrap>
            {subTitle}
          </Typography>
        )}
      </Wrapper>
      {rightIcon && <Wrapper className="rightIcon">{rightIcon}</Wrapper>}
    </Wrapper>
  );
}

export default React.memo(ListItem);
