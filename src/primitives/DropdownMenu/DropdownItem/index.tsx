import React, { useCallback, useMemo } from "react";

import { CODE, InputIconProp, ListItemSize } from "../../../index";
import ListItem from "../../List/ListItem";
import { useSetRightIcon } from "./useSetRightIcon";

import { VisibilityManagerContext } from "../../VisibilityManager/VisibilityManagerContext";
import { ListSelectedManagerContext } from "../../List/ListSelectedManagerContext";

export interface DropdownItemInterface {
  leftContentStyles?: any;
  rightContentStyles?: any;
  children: string;
  disabled?: boolean;
  size?: ListItemSize;
  titleStyles?: any;
  titleDots?: boolean;
  styles?: any;
  leftContent?: InputIconProp;
  rightContent?: InputIconProp;
  heading?: string | number;
  subTitle?: string;
  code: CODE;
  showArrowOnSelection?: boolean;
  showIconRightOnHover?: boolean;
  showIconLeftOnHover?: boolean;
}

function DropdownItem({ disabled, rightContent, code, showArrowOnSelection = true, ...props }: DropdownItemInterface) {
  const { hide } = React.useContext(VisibilityManagerContext);
  const { selectedItems, onChange } = React.useContext(ListSelectedManagerContext);

  const isSelected = () => {
    if (disabled) return false;
    return selectedItems.length !== 0 ? selectedItems.includes(code) : false;
  };

  const selected = useMemo(isSelected, [selectedItems, code, disabled]);

  const resultRightContent = useSetRightIcon({ selected, rightContent, showArrowOnSelection });

  const handleClick = useCallback(() => {
    if (!onChange || disabled) {
      hide();
      return;
    }

    onChange(code);
    hide();
  }, [onChange, disabled, code, hide]);

  return (
    <ListItem
      {...props}
      rightContent={resultRightContent}
      code={code}
      disabled={disabled}
      active={selected}
      showArrowOnSelection={showArrowOnSelection}
      onClick={handleClick}
    />
  );
}

export default React.memo(DropdownItem);
