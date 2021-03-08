import React from "react";
import { Modifier } from "react-popper";

import { Placement } from "@popperjs/core/lib/enums";

import DropdownContainer from "./DropdownContainer";
import { InternalIcons } from "../Icon";
import { InputSize } from "../Input/InputWrapper";
import DropdownManager from "./DropdownManager/DropdownManager";

export interface DropdownMenuInterface {
  placeholder: string;
  stylesReference: any;
  headerStyle: any;
  size: InputSize;
  iconLeft: InternalIcons;
  children: JSX.Element;
  placement: Placement;
  modifiers: ReadonlyArray<Modifier<unknown>>;
  outsideHandler: boolean;
  stylesPopper: any;
}

function DropdownMenu(props: DropdownMenuInterface) {
  return (
    <DropdownManager>
      <DropdownContainer {...props} />
    </DropdownManager>
  );
}

export default React.memo(DropdownMenu);
