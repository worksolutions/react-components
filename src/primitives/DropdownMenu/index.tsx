import React, { useCallback, useMemo } from "react";
import { Placement } from "@popperjs/core/lib/enums";

import DropdownMainButton from "./DropdownMainButton";
import PopupManager from "../PopupManager";

import {
  CODE,
  duration160,
  InternalIcons,
  lineHeight,
  padding,
  textDots,
  transform,
  transition,
  Typography,
} from "../../index";

import Icon from "../Icon";
import { InputContainerSize } from "../InputContainer/enums";
import InputContainer from "../InputContainer";
import SelectedItemsManagerContextProvider from "../List/SelectedItemsManagerContext";

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
  selectedItem: React.ReactNode;
  selectedItems?: CODE[];
  onChange?: (code: CODE) => void;
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
  selectedItem,
  selectedItems,
  onChange,
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
            <DropdownMainButton styles={[styles, stylesMainButton, selectedItem && padding(0)]}>
              {selectedItem ? (
                selectedItem
              ) : (
                <Typography
                  color="definitions.DropdownMainButton.colorText"
                  styles={[textDots, lineHeight("143%"), stylesTextMainButton]}
                >
                  {placeholder}
                </Typography>
              )}
            </DropdownMainButton>
          )}
          onClick={toggle}
        />
      );
    },
    [size, iconLeft, iconReferenceRight, error, stylesMainButton, stylesTextMainButton, selectedItem, placeholder],
  );

  const popperElement = useMemo(() => {
    if (!onChange || !selectedItems) return children;

    return (
      <SelectedItemsManagerContextProvider value={{ onChange, selectedItems }}>
        {children}
      </SelectedItemsManagerContextProvider>
    );
  }, [children, onChange, selectedItems]);

  return (
    <PopupManager
      primaryPlacement={primaryPlacement}
      offset={offset}
      closeOnClickOutside={closeOnOutsideClick}
      popupWidth={widthPopper}
      popperStyles={stylesPopper}
      popperElement={popperElement}
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
