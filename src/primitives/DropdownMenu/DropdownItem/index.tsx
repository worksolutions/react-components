import React from "react";

import { InputIconProp, ListItemSize } from "../../../index";
import ListItem from "../../List/ListItem";

import { VisibilityManagerContext } from "../../VisibilityManager/VisibilityManagerContext";

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
  code: string | number;
  showArrowOnSelection?: boolean;
  showIconRightOnHover?: boolean;
  showIconLeftOnHover?: boolean;
  hovered?: boolean;
  canSelect?: boolean;
}

function DropdownItem(props: DropdownItemInterface) {
  const { hide } = React.useContext(VisibilityManagerContext);

  return <ListItem {...props} onAfterClick={hide} />;
}

export default React.memo(DropdownItem);
