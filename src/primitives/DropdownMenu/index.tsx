import React, { useCallback, useMemo } from "react";
import { Placement } from "@popperjs/core/lib/enums";

import Typography from "primitives/Typography";

import DropdownMainButton from "./DropdownMainButton";
import PopupManager from "../PopupManager";
import Icon, { InternalIcons } from "../Icon";
import { InputContainerSize } from "../InputContainer/enums";
import InputContainer from "../InputContainer";
import SelectedItemsManagerContextProvider from "../List/ListContext";

import { lineHeight, padding, transform, transition } from "../../styles";
import { duration160 } from "../../constants/durations";
import { VisibilityManagerChildrenInterface, VisibilityManagerInterface } from "../VisibilityManager";

export interface DropdownMenuInterface<CODE extends string | number> {
  popperStyles?: any;
  stylesMainButton?: any;
  stylesTextMainButton?: any;
  placeholder: string;
  size?: InputContainerSize;
  iconLeft?: InternalIcons;
  children: React.ReactNode;
  primaryPlacement: Placement;
  closeOnClickOutside?: boolean;
  offset?: number;
  popupWidth?: number | string | "auto";
  iconReferenceRight?: InternalIcons;
  error?: boolean;
  closeAfterClickItem?: boolean;
  selectedElement: React.ReactNode;
  selectedItemCodes?: CODE[];
  onChange?: (code: CODE) => void;
}

function DropdownMenu<CODE extends string | number>({
  stylesMainButton,
  stylesTextMainButton,
  children,
  iconLeft,
  size,
  placeholder,
  iconReferenceRight,
  error,
  selectedElement,
  selectedItemCodes,
  closeAfterClickItem,
  onChange,
  ...props
}: DropdownMenuInterface<CODE>) {
  const popupMainElement = ({ toggle, visibility }: VisibilityManagerChildrenInterface) => (
    <InputContainer
      size={size}
      iconLeft={iconLeft}
      iconRight={createDropdownRightIcon(visibility, iconReferenceRight)}
      error={error}
      renderComponent={(styles) => (
        <DropdownMainButton styles={[styles, selectedElement && padding(0), stylesMainButton]}>
          {selectedElement || (
            <Typography dots color="definitions.DropdownMainButton.colorText" styles={[stylesTextMainButton]}>
              {placeholder}
            </Typography>
          )}
        </DropdownMainButton>
      )}
      onClick={toggle}
    />
  );

  const popperElement = useMemo(() => {
    if (!onChange || !selectedItemCodes) return children;

    return (
      <SelectedItemsManagerContextProvider value={{ selectedItemCodes, onChange }}>
        {children}
      </SelectedItemsManagerContextProvider>
    );
  }, [children, onChange, selectedItemCodes]);

  return (
    <PopupManager
      {...props}
      closeAfterClick={closeAfterClickItem}
      popperElement={popperElement}
      renderMainElement={popupMainElement}
    />
  );
}

export default React.memo(DropdownMenu) as <CODE extends string | number>(
  props: DropdownMenuInterface<CODE>,
) => JSX.Element;

export function createDropdownRightIcon(opened: boolean, icon: InternalIcons = "arrow-down") {
  return (
    <Icon
      icon={icon}
      styles={[transition(`all ${duration160}`), transform(`rotateZ(${opened ? "180deg" : "0deg"})`)]}
      color="definitions.DropdownRightIcon.color"
    />
  );
}
