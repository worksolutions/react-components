import React, { useCallback } from "react";

import DropdownSource from "./DropdownSource/DropdownSource";
import PopperManager from "../PopupManager";

import { duration160, InputWrapper, InternalIcons, transform, transition } from "../../index";
import { DropdownManagerContext } from "./DropdownManager/DropdownManagerContext";

import { DropdownMenuInterface } from "./DropdownMenu";
import Icon from "../Icon";

function DropdownContainer({
  stylesPopper,
  stylesSource,
  stylesTextSource,
  children,
  primaryPlacement,
  iconLeft,
  size,
  placeholder,
  offset,
  widthPopper,
  iconReferenceRight,
  error,
  closeOnOutsideClick = true,
}: DropdownMenuInterface) {
  const { selectedItem } = React.useContext(DropdownManagerContext);

  const referenceElement = useCallback(
    (toggleVisible: () => void, visible: boolean) => {
      return (
        <InputWrapper
          size={size}
          iconLeft={iconLeft}
          iconRight={createDropdownRightIcon(visible, iconReferenceRight)}
          error={error}
          renderComponent={(styles) => (
            <DropdownSource
              text={selectedItem || placeholder}
              styles={[styles, stylesSource]}
              stylesTextSource={stylesTextSource}
            />
          )}
          onClick={toggleVisible}
        />
      );
    },
    [size, iconLeft, stylesSource, placeholder, selectedItem],
  );

  return (
    <PopperManager
      primaryPlacement={primaryPlacement}
      offset={offset}
      outsideHandler={closeOnOutsideClick}
      widthPopper={widthPopper}
      popperStyles={stylesPopper}
      renderPopupElement={children}
      renderMainElement={referenceElement}
    />
  );
}

export default React.memo(DropdownContainer);

export function createDropdownRightIcon(opened: boolean, icon: InternalIcons = "arrow-down") {
  return (
    <Icon
      icon={icon}
      styles={[transition(`all ${duration160}`), transform(`rotateZ(${opened ? "180deg" : "0deg"})`)]}
      color="definitions.DropdownRightIcon.color"
    />
  );
}
