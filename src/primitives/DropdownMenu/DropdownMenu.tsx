import React from "react";

import { Placement } from "@popperjs/core/lib/enums";
import { StrictModifiers } from "@popperjs/core/";

import DropdownContainer from "./DropdownContainer";
import { InternalIcons } from "../Icon";
import { InputSize } from "../Input/InputWrapper";
import DropdownManager from "./DropdownManager/DropdownManager";
import { Colors } from "../../constants/colors";

export interface DropdownMenuInterface {
  placeholder?: string;
  stylesReference?: any;
  headerStyle?: any;
  size?: InputSize;
  iconLeft?: InternalIcons;
  children: React.ReactNode;
  placement: Placement;
  modifiers?: StrictModifiers[];
  outsideHandler?: boolean;
  stylesPopper?: any;
  targetElement: React.ReactNode;
  offset?: [number, number];
  arrowPadding?: number;
  arrowElem?: React.ReactNode;
  haveArrow?: boolean;
  colorTextHeader?: Colors;
}

function DropdownMenu(props: DropdownMenuInterface) {
  return (
    <DropdownManager>
      <DropdownContainer {...props} size={props.size ? props.size : InputSize.MEDIUM} />
    </DropdownManager>
  );
}

export default React.memo(DropdownMenu);
