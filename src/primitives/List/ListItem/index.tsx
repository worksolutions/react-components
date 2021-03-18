import React, { useCallback, useMemo } from "react";

import { flex, flexColumn, flexValue, marginLeft, marginRight, overflow, textAlign } from "../../../styles";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { getHoveredStylesForLeftContent, getHoveredStylesForRightContent, makeIcon } from "./additionalContent";
import { getListItemStyles } from "./libs";

import { ListItemSize } from "./enum";
import { InputIconProp } from "../../InputContainer";
import { useListContext } from "../ListContext";
import { useSetRightIcon } from "../../DropdownMenu/DropdownItem/useSetRightIcon";

export interface ListItemInterface<CODE extends string | number> {
  leftContentStyles?: any;
  leftContent?: InputIconProp;
  rightContentStyles?: any;
  rightContent?: InputIconProp;
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
  children: string;
  code: CODE;
  hovered?: boolean;
  canSelect?: boolean;
  onBeforeClick?: () => void;
  onAfterClick?: () => void;
}

function ListItem<CODE extends string | number>({
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
  titleDots,
  titleStyles,
  styles,
  showIconRightOnHover,
  showIconLeftOnHover,
  showArrowOnSelection = true,
  hovered = true,
  canSelect = true,
  onBeforeClick,
  onAfterClick,
}: ListItemInterface<CODE>) {
  const enabled = !disabled;
  const { selectedItems, onChange } = useListContext();

  const isSelected = () => {
    if (!canSelect) return false;
    if (disabled) return false;
    return selectedItems.length !== 0 ? selectedItems.includes(code) : false;
  };

  const selected = useMemo(isSelected, [canSelect, disabled, selectedItems, code]);

  const resultRightContent = useSetRightIcon({ selected, rightContent, showArrowOnSelection });

  const listItemStyles = useMemo(() => getListItemStyles({ size, enabled, selected, hovered }), [
    selected,
    enabled,
    hovered,
    size,
  ]);

  const leftContentStyles = useMemo(() => getHoveredStylesForLeftContent({ disabled, showIconLeftOnHover }), [
    disabled,
    showIconLeftOnHover,
  ]);

  const rightContentStyles = useMemo(
    () => getHoveredStylesForRightContent({ disabled, showArrowOnSelection, showIconRightOnHover }),
    [disabled, showArrowOnSelection, showIconRightOnHover],
  );

  const leftIcon = makeIcon(leftContent, [marginRight(8), leftContentStylesProp]);
  const rightIcon = makeIcon(resultRightContent, [marginLeft(8), rightContentStylesProp]);

  const handleClick = useCallback(() => {
    if (!canSelect || disabled) return;

    onBeforeClick && onBeforeClick();
    onChange(code);
    onAfterClick && onAfterClick();
  }, [canSelect, disabled, onAfterClick, onChange, code, onBeforeClick]);

  return (
    <Wrapper styles={[listItemStyles, rightContentStyles, leftContentStyles, styles]} onClick={handleClick}>
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
