import React from "react";

import { Placement } from "@popperjs/core/lib/enums";

import DropdownContainer from "./DropdownContainer";
import { InternalIcons } from "../Icon";
import { InputSize } from "../Input/InputWrapper";
import DropdownManager from "./DropdownManager/DropdownManager";

export interface DropdownMenuInterface {
  stylesPopper?: any;
  stylesSource?: any;
  stylesTextSource?: any;
  placeholder: string;
  size?: InputSize;
  iconLeft?: InternalIcons;
  children: React.ReactNode;
  placement: Placement;
  closeOnOutsideClick?: boolean;
  offset?: number;
  widthPopper?: number | string | "auto";
  iconReferenceRight?: InternalIcons;
  error: boolean;
}

function DropdownMenu(props: DropdownMenuInterface) {
  return (
    <DropdownManager>
      <DropdownContainer {...props} size={props.size ? props.size : InputSize.MEDIUM} />
    </DropdownManager>
  );
}

export default React.memo(DropdownMenu);
