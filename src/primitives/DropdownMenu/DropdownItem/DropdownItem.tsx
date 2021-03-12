import React, { useCallback, useMemo } from "react";
import { useForceUpdate } from "@worksolutions/react-utils";

import { InputIconProp, ListItemSize } from "../../../index";
import ListItem from "../../List/ListItem";
import { useShowedRightIcon } from "./useShowedRightIcon";

import { VisibleManagerContext } from "../../VisibleManager/VisibleManagerContext";
import { DropdownManagerContext } from "../DropdownManager/DropdownManagerContext";
import { DropdownGroupContext } from "../DropdownGroup/DropdownGroupContext";
import Wrapper from "../../Wrapper";

export interface DropdownItemProps {
  children: string;
  disabled?: boolean;
  itemSize?: ListItemSize;
  titleStyles?: any;
  titleDots?: boolean;
  styles?: any;
  leftContent?: InputIconProp | React.ReactNode;
  rightContent?: InputIconProp | React.ReactNode;
  heading?: string | number;
  subTitle?: string | number;
  code: string;
  leftContentStyles?: any;
  rightContentStyles?: any;
}

function DropdownItem({
  disabled,
  itemSize = ListItemSize.SMALL,
  titleDots,
  titleStyles,
  styles,
  children,
  leftContent,
  heading,
  rightContent,
  subTitle,
  leftContentStyles,
  rightContentStyles,
  code,
}: DropdownItemProps) {
  const { closeHandler } = React.useContext(VisibleManagerContext);
  const { selectedItem, onChange } = React.useContext(DropdownManagerContext);
  const { isHoveredItems } = React.useContext(DropdownGroupContext);

  const forceUpdate = useForceUpdate();

  const selected = !isHoveredItems ? selectedItem === code : false;

  const resultRightContent = useShowedRightIcon(isHoveredItems, selected, rightContent);

  const handleOnClick = useCallback(
    (code) => {
      if (!onChange || isHoveredItems || disabled) {
        closeHandler();
        return;
      }

      onChange(code);
      closeHandler();
    },
    [onChange, closeHandler, code, isHoveredItems, disabled],
  );

  const itemProps = useMemo(
    () => ({
      rightContent: resultRightContent.current,
      rightContentStyles,
      leftContent,
      leftContentStyles,
      title: children,
      code,
      disabled,
      heading,
      subTitle,
    }),
    [
      children,
      leftContent,
      leftContentStyles,
      rightContent,
      rightContentStyles,
      code,
      heading,
      subTitle,
      resultRightContent.current,
      disabled,
    ],
  );

  const onHandleEnter = useCallback(() => {
    if (disabled) return;
    resultRightContent.current = rightContent || "check";
    forceUpdate();
  }, [resultRightContent.current, disabled]);

  const onHandleLeave = useCallback(() => {
    if (disabled) return;
    resultRightContent.current = undefined;
    forceUpdate();
  }, [resultRightContent.current, disabled]);

  if (isHoveredItems) {
    return (
      <Wrapper onMouseEnter={onHandleEnter} onMouseLeave={onHandleLeave}>
        <ListItem
          itemSize={itemSize}
          isActiveItem={selected}
          titleDots={titleDots}
          titleStyles={titleStyles}
          styles={styles}
          item={itemProps}
          onClick={handleOnClick}
        />
      </Wrapper>
    );
  }

  return (
    <ListItem
      itemSize={itemSize}
      isActiveItem={selected}
      titleDots={titleDots}
      titleStyles={titleStyles}
      styles={styles}
      item={itemProps}
      onClick={handleOnClick}
    />
  );
}

export default React.memo(DropdownItem);
