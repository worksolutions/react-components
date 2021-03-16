import React, { useCallback } from "react";
import { Placement } from "@popperjs/core/lib/enums";

import DropdownMainButton from "./DropdownMainButton";
import PopupManager from "../PopupManager";

import { duration160, InternalIcons, transform, transition } from "../../index";

import Icon from "../Icon";
import { InputContainerSize } from "../InputContainer/enums";
import InputContainer from "../InputContainer";

export interface DropdownMenuInterface {
  stylesPopper?: any;
  stylesMainButton?: any;
  stylesTextMainButton?: any;
  placeholder: string;
  size?: InputContainerSize;
  iconLeft?: InternalIcons;
  children: React.ReactNode;
  primaryPlacement: Placement;
  closeOnOutsideClick?: boolean;
  offset?: number;
  widthPopper?: number | string | "auto";
  iconReferenceRight?: InternalIcons;
  error?: boolean;
}

function DropdownMenu({
  stylesPopper,
  stylesMainButton,
  stylesTextMainButton,
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
  const popupMainElement = useCallback(
    ({ toggle, visibility }) => {
      return (
        <InputContainer
          size={size}
          iconLeft={iconLeft}
          iconRight={createDropdownRightIcon(visibility, iconReferenceRight)}
          error={error}
          renderComponent={(styles) => (
            <DropdownMainButton
              text={placeholder}
              styles={[styles, stylesMainButton]}
              stylesTextMainButton={stylesTextMainButton}
            />
          )}
          onClick={toggle}
        />
      );
    },
    [size, iconLeft, iconReferenceRight, error, placeholder, stylesMainButton, stylesTextMainButton],
  );

  return (
    <PopupManager
      primaryPlacement={primaryPlacement}
      offset={offset}
      closeOnClickOutside={closeOnOutsideClick}
      popupWidth={widthPopper}
      popperStyles={stylesPopper}
      popperElement={children}
      renderMainElement={popupMainElement}
    />
  );
}

export default React.memo(DropdownMenu);

export function createDropdownRightIcon(opened: boolean, icon: InternalIcons = "arrow-down") {
  return (
    <Icon
      icon={icon}
      styles={[transition(`all ${duration160}`), transform(`rotateZ(${opened ? "180deg" : "0deg"})`)]}
      color="definitions.DropdownRightIcon.color"
    />
  );
}
