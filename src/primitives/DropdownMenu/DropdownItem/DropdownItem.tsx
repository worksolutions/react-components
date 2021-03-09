import React, { useCallback, useMemo } from "react";
import { useForceUpdate } from "@worksolutions/react-utils";

import { VisibleManagerContext } from "../../VisibleManager/VisibleManagerContext";
import { DropdownManagerContext } from "../DropdownManager/DropdownManagerContext";

import { InputIconProp, ListItemSize } from "../../../index";
import ListItem from "../../List/ListItem";
import HandleHover from "../../HandleHover/HandleHover";
import { useShowedRightIcon } from "./useShowedRightIcon";

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
  const { selectedItem, hoveredItems, onChange } = React.useContext(DropdownManagerContext);

  const forceUpdate = useForceUpdate();

  const selected = !hoveredItems ? selectedItem === code : false;
  console.log(selectedItem);
  const resultRightContent = useShowedRightIcon(hoveredItems, selected, rightContent);

  const handleOnClick = useCallback(
    (code) => {
      if (!onChange || hoveredItems || disabled) {
        closeHandler();
        return;
      }
      onChange(code);
      closeHandler();
    },
    [onChange, closeHandler, code, hoveredItems, disabled],
  );

  const itemProps = useMemo(() => {
    console.log("asd");
    return {
      rightContent: resultRightContent.current,
      rightContentStyles,
      leftContent,
      leftContentStyles,
      title: children,
      code,
      disabled,
      heading,
      subTitle,
    };
  }, [
    children,
    leftContent,
    leftContentStyles,
    rightContent,
    rightContentStyles,
    code,
    heading,
    subTitle,
    resultRightContent.current,
  ]);

  const onHandleEnter = useCallback(() => {
    if (disabled) return;
    resultRightContent.current = rightContent || "check";
    forceUpdate();
  }, []);

  const onHandleLeave = useCallback(() => {
    if (disabled) return;
    resultRightContent.current = undefined;
    forceUpdate();
  }, []);

  if (hoveredItems) {
    return (
      <HandleHover onHandleEnter={onHandleEnter} onHandleLeave={onHandleLeave}>
        <ListItem
          itemSize={itemSize}
          isActiveItem={selected}
          titleDots={titleDots}
          titleStyles={titleStyles}
          styles={styles}
          item={itemProps}
          onClick={handleOnClick}
        />
      </HandleHover>
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
