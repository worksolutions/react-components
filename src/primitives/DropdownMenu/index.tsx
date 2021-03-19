import React, { useMemo } from "react";

import Typography from "../Typography";
import DropdownMainButton from "./internal/DropdownMainButton";
import PopupManager, { PopupManagerInterface } from "../PopupManager";
import Icon, { InternalIcons } from "../Icon";
import { InputContainerSize } from "../InputContainer/enums";
import InputContainer from "../InputContainer";
import SelectedItemsManagerContextProvider from "../List/ListContext/ListContextProvider";

import { padding, transform, transition } from "../../styles";
import { duration160 } from "../../constants/durations";
import { VisibilityManagerContextInterface } from "../VisibilityManager/types";

export interface DropdownMenuInterface<CODE extends string | number>
  extends Omit<PopupManagerInterface, "popupElement" | "renderTriggerElement"> {
  stylesMainButton?: any;
  stylesTextMainButton?: any;
  placeholder: string;
  size?: InputContainerSize;
  iconLeft?: InternalIcons;
  children: React.ReactNode;
  iconReferenceRight?: InternalIcons;
  error?: boolean;
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
  onChange,
  ...props
}: DropdownMenuInterface<CODE>) {
  const popupMainElement = ({ toggle, visible }: VisibilityManagerContextInterface) => (
    <InputContainer
      size={size}
      iconLeft={iconLeft}
      iconRight={createDropdownRightIcon(visible, iconReferenceRight)}
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
    // todo убрать memo
    if (!onChange || !selectedItemCodes) return children;

    return (
      <SelectedItemsManagerContextProvider value={{ selectedItemCodes, onChange }}>
        {children}
      </SelectedItemsManagerContextProvider>
    );
  }, [children, onChange, selectedItemCodes]);

  return <PopupManager {...props} popupElement={popperElement} renderTriggerElement={popupMainElement} />;
}

export default React.memo(DropdownMenu) as <CODE extends string | number>(
  props: DropdownMenuInterface<CODE>,
) => JSX.Element;

function createDropdownRightIcon(opened: boolean, icon: InternalIcons = "arrow-down") {
  return (
    <Icon
      icon={icon}
      styles={[transition(`all ${duration160}`), transform(`rotateZ(${opened ? "180deg" : "0deg"})`)]}
      color="definitions.DropdownRightIcon.color"
    />
  );
}
