import React, { useEffect, useState } from "react";

import Typography from "../Typography";
import SelectTrigger from "./internal/SelectTrigger";
import PopupManager, { PopupManagerInterface } from "../PopupManager";
import Icon, { InternalIcons } from "../Icon";
import { InputContainerSize } from "../InputContainer/enums";
import InputContainer from "../InputContainer";

import { margin, padding, transform, transition } from "../../styles";
import { duration160 } from "../../constants/durations";
import SelectItemsContainer from "./internal/SelectItemsContainer";
import { ListItem } from "../../index";

import { TriggerPopupElementType } from "../PopupManager/internal/types";

export interface SelectInterface<CODE extends string | number>
  extends Omit<PopupManagerInterface, "popupElement" | "renderTriggerElement"> {
  stylesTriggerElement?: any;
  stylesTextTriggerElement?: any;
  stylesSelectedElement?: any;
  placeholder: string;
  size?: InputContainerSize;
  iconLeft?: InternalIcons;
  children: React.ReactElement[];
  iconReferenceRight?: InternalIcons;
  error?: boolean;
  selectedItemCodes?: CODE[];
  onChange: (code: CODE) => void;
}

function Select<CODE extends string | number>({
  stylesTriggerElement,
  stylesTextTriggerElement,
  stylesSelectedElement,
  children,
  iconLeft,
  size,
  placeholder,
  iconReferenceRight,
  error,
  selectedItemCodes = [],
  onChange,
  ...props
}: SelectInterface<CODE>) {
  const [selectedElement, setSelectedElement] = useState<React.ReactNode>();

  const renderTriggerElement: TriggerPopupElementType = ({ visibility, ref, toggle }) => (
    <InputContainer
      size={size}
      outerRef={ref}
      iconLeft={iconLeft}
      iconRight={createDropdownRightIcon(visibility, iconReferenceRight)}
      error={error}
      renderComponent={(styles) => (
        <SelectTrigger styles={[styles, selectedElement && padding(0), stylesTriggerElement]}>
          {selectedElement || (
            <Typography dots color="definitions.SelectTriggerElement.colorText" styles={[stylesTextTriggerElement]}>
              {placeholder}
            </Typography>
          )}
        </SelectTrigger>
      )}
      onClick={toggle}
    />
  );

  useEffect(() => {
    if (selectedItemCodes.length > 1) {
      setSelectedElement(null);
      return;
    }

    children.forEach(
      ({ props }: any) =>
        selectedItemCodes.includes(props.code) &&
        setSelectedElement(
          <ListItem
            {...props}
            selected={false}
            canSelect={false}
            hoverable={false}
            styles={[margin(0), stylesSelectedElement]}
          />,
        ),
    );
  }, [children, selectedItemCodes, stylesSelectedElement]);

  return (
    <PopupManager
      {...props}
      popupElement={<SelectItemsContainer items={children} onChange={onChange} selectedItemCodes={selectedItemCodes} />}
      renderTriggerElement={renderTriggerElement}
    />
  );
}

export default React.memo(Select) as <CODE extends string | number>(props: SelectInterface<CODE>) => JSX.Element;

function createDropdownRightIcon(opened: boolean, icon: InternalIcons = "arrow-down") {
  return (
    <Icon
      icon={icon}
      styles={[transition(`all ${duration160}`), transform(`rotateZ(${opened ? "180deg" : "0deg"})`)]}
      color="definitions.DropdownRightIcon.color"
    />
  );
}
