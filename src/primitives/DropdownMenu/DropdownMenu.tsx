import React from "react";

import { Placement } from "@popperjs/core/lib/enums";
import { StrictModifiers } from "@popperjs/core/";

import DropdownContainer from "./DropdownContainer";
import { InternalIcons } from "../Icon";
import { InputSize } from "../Input/InputWrapper";
import DropdownManager from "./DropdownManager/DropdownManager";
import { Colors } from "../../constants/colors";

export interface DropdownMenuProps {
  placeholder?: string;
  stylesReference?: any;
  size?: InputSize;
  iconLeft?: InternalIcons;
  children: React.ReactNode;
  placement: Placement;
  outsideHandler?: boolean;
  stylesPopper?: any;
  offset?: number;
  colorTextHeader?: Colors;
  widthPopper?: number | string | "auto";
  textReferenceStyles: any;
  iconReferenceRight?: InternalIcons;
  error: boolean;
}

function DropdownMenu(props: DropdownMenuProps) {
  return (
    <DropdownManager>
      <DropdownContainer {...props} size={props.size ? props.size : InputSize.MEDIUM} />
    </DropdownManager>
  );
}

export default React.memo(DropdownMenu);
