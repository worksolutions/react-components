import React from "react";

import { Placement } from "@popperjs/core/lib/enums";

import DropdownContainer from "./DropdownContainer";
import { InternalIcons } from "../Icon";
import { InputSize } from "../Input/InputWrapper";
import DropdownManager from "./DropdownManager/DropdownManager";
import { Colors } from "../../constants/colors";

export interface DropdownMenuProps {
  stylesPopper?: any;
  stylesReference?: any;
  stylesTextReference: any;
  placeholder?: string;
  size?: InputSize;
  iconLeft?: InternalIcons;
  children: React.ReactNode;
  placement: Placement;
  outsideHandler?: boolean;
  offset?: number;
  colorTextHeader?: Colors;
  widthPopper?: number | string | "auto";
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
