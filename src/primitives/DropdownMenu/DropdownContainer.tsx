import React, { useCallback } from "react";

import DropdownReference from "./DropdownReference/DropdownReference";
import PopperManager from "../PopperManager";

import { duration160, InputWrapper, InternalIcons, transform, transition } from "../../index";
import { DropdownManagerContext } from "./DropdownManager/DropdownManagerContext";

import { DropdownMenuProps } from "./DropdownMenu";
import Icon from "../Icon";

function DropdownContainer({
  children,
  placement,
  stylesReference,
  stylesPopper,
  iconLeft,
  size,
  placeholder,
  outsideHandler = true,
  offset,
  colorTextHeader,
  widthPopper,
  textReferenceStyles,
  iconReferenceRight,
  error,
}: DropdownMenuProps) {
  const { selectedItem } = React.useContext(DropdownManagerContext);

  const popperElement = useCallback(() => children, [children]);

  const referenceElement = useCallback(
    (toggleVisible: () => void, visible: boolean) => (
      <InputWrapper
        size={size}
        iconLeft={iconLeft}
        iconRight={createDropdownRightIcon(visible, iconReferenceRight)}
        error={error}
        renderComponent={(styles) => (
          <DropdownReference
            text={selectedItem ? selectedItem : placeholder}
            styles={[styles, stylesReference]}
            textReferenceStyles={textReferenceStyles}
            colorTextHeader={colorTextHeader}
          />
        )}
        onClick={toggleVisible}
      />
    ),
    [size, iconLeft, stylesReference, placeholder, selectedItem],
  );

  return (
    <PopperManager
      placement={placement}
      offset={offset}
      outsideHandler={outsideHandler}
      widthPopper={widthPopper}
      popperStyles={stylesPopper}
      popperElement={popperElement}
      referenceElement={referenceElement}
    />
  );
}

export default React.memo(DropdownContainer);

export function createDropdownRightIcon(opened: boolean, icon: InternalIcons = "arrow-down") {
  return (
    <Icon
      icon={icon}
      styles={[transition(`all ${duration160}`), transform(`rotateZ(${opened ? "180deg" : "0deg"})`)]}
      color="gray-blue/07"
    />
  );
}
