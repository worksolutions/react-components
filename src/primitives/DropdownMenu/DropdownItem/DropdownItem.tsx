import React, { useCallback, useMemo } from "react";

import { InputIconProp, ListItemSize } from "../../../index";
import ListItem from "../../List/ListItem";
import { useShowedRightIcon } from "./useShowedRightIcon";

import { VisibleManagerContext } from "../../VisibleManager/VisibleManagerContext";
import { DropdownManagerContext } from "../DropdownManager/DropdownManagerContext";

export interface DropdownItemProps {
  leftContentStyles?: any;
  rightContentStyles?: any;
  children: string;
  disabled?: boolean;
  itemSize?: ListItemSize;
  titleStyles?: any;
  titleDots?: boolean;
  styles?: any;
  leftContent?: InputIconProp | React.ReactNode;
  rightContent?: InputIconProp | React.ReactNode;
  heading?: string | number;
  subTitle?: string;
  code: string;
  showArrowOnSelection?: boolean;
  showIconRightHover?: boolean;
  showIconLeftHover?: boolean;
  canSelect?: boolean;
}

function DropdownItem({
  leftContentStyles,
  rightContentStyles,
  disabled,
  titleDots,
  titleStyles,
  styles,
  children,
  leftContent,
  heading,
  rightContent,
  subTitle,
  code,
  showIconRightHover,
  showIconLeftHover,
  itemSize = ListItemSize.SMALL,
  showArrowOnSelection = true,
  canSelect = true,
}: DropdownItemProps) {
  const { closeHandler } = React.useContext(VisibleManagerContext);
  const { selectedItem, onChange } = React.useContext(DropdownManagerContext);

  const isSelected = () => {
    if (disabled) return false;
    if (!canSelect) return false;
    return Boolean(selectedItem) && selectedItem === code;
  };

  const selected = useMemo(isSelected, [selectedItem, code, canSelect, disabled]);

  const resultRightContent = useShowedRightIcon({ selected, rightContent, showArrowOnSelection, canSelect });

  const handleOnClick = useCallback(() => {
    if (!canSelect) return;

    if (!onChange || disabled) {
      closeHandler();
      return;
    }

    onChange(code);
    closeHandler();
  }, [onChange, closeHandler, code, disabled]);

  const itemProps = useMemo(
    () => ({
      rightContentStyles,
      leftContentStyles,
      rightContent: resultRightContent.current,
      leftContent,
      title: children,
      code,
      disabled,
      heading,
      subTitle,
    }),
    [
      rightContentStyles,
      leftContentStyles,
      children,
      leftContent,
      rightContent,
      code,
      heading,
      subTitle,
      resultRightContent.current,
      disabled,
      showArrowOnSelection,
    ],
  );

  return (
    <ListItem
      itemSize={itemSize}
      isActiveItem={selected}
      titleDots={titleDots}
      titleStyles={titleStyles}
      styles={styles}
      item={itemProps}
      showIconRightHover={showIconRightHover}
      showIconLeftHover={showIconLeftHover}
      showArrowOnSelection={showArrowOnSelection}
      onClick={handleOnClick}
    />
  );
}

export default React.memo(DropdownItem);
