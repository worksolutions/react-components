import React, { useCallback } from "react";

import { VisibleManagerContext } from "../../VisibleManager/VisibleManagerContext";
import { DropdownManagerContext } from "../DropdownManager/DropdownManagerContext";

import { InputIconProp, ListItemSize } from "../../../index";
import ListItem from "../../List/ListItem";

export interface DropdownItemProps {
  children: string;
  disabled?: boolean;
  itemSize?: ListItemSize;
  titleStyles?: any;
  titleDots?: boolean;
  styles?: any;
  leftContent?: InputIconProp;
  rightContent?: InputIconProp;
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
  const { onChange, selectedItem } = React.useContext(DropdownManagerContext);

  const selected = selectedItem === code;

  if (selected) {
    rightContent = rightContent || "check";
  }

  const handleOnClick = useCallback(
    (code) => {
      if (!onChange) return;
      onChange(code);
      closeHandler();
    },
    [onChange, closeHandler, code],
  );

  return (
    <ListItem
      itemSize={itemSize}
      isActiveItem={selected}
      titleDots={titleDots}
      titleStyles={titleStyles}
      styles={styles}
      item={{
        title: children,
        leftContent,
        leftContentStyles,
        rightContent,
        rightContentStyles,
        code,
        disabled,
        heading,
        subTitle,
      }}
      onClick={handleOnClick}
    />
  );
}

export default React.memo(DropdownItem);
