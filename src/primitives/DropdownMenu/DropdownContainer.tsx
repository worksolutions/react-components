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

  const popupMainElement = useCallback(
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
    [size, iconLeft, iconReferenceRight, error, selectedItem, placeholder, stylesSource, stylesTextSource],
  );

  return (
    <PopperManager
      primaryPlacement={primaryPlacement}
      offset={offset}
      closeOnClickOutside={closeOnOutsideClick}
      popupWidth={widthPopper}
      popperStyles={stylesPopper}
      popupElement={children}
      renderMainElement={popupMainElement}
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
