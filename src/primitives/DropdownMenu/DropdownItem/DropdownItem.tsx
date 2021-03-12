import React, { useCallback, useMemo, useRef } from "react";

import { InputIconProp, ListItemSize } from "../../../index";
import ListItem from "../../List/ListItem";
import { useShowedRightIcon } from "./useShowedRightIcon";

import { VisibleManagerContext } from "../../VisibleManager/VisibleManagerContext";
import { DropdownManagerContext } from "../DropdownManager/DropdownManagerContext";

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
  subTitle?: string;
  code: string;
  leftContentStyles?: any;
  rightContentStyles?: any;
  showArrowOnSelection?: boolean;
  showIconRightHover?: boolean;
  showIconLeftHover?: boolean;
  canSelect?: boolean;
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
  showIconRightHover,
  showIconLeftHover,
  showArrowOnSelection = true,
  canSelect = true,
}: DropdownItemProps) {
  const { closeHandler } = React.useContext(VisibleManagerContext);
  const { selectedItem, onChange } = React.useContext(DropdownManagerContext);

  const selected = Boolean(selectedItem) && selectedItem === code;

  const resultRightContent = useShowedRightIcon(selected, rightContent, showArrowOnSelection);

  const handleOnClick = useCallback(
    (code) => {
      if (!canSelect) return;

      if (!onChange || disabled) {
        closeHandler();
        return;
      }

      onChange(code);
      closeHandler();
    },
    [onChange, closeHandler, code, disabled],
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
