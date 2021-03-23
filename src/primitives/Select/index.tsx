import React from "react";
import { IncomeColorVariant, useEffectSkipFirst } from "@worksolutions/react-utils";

import Typography from "../Typography";
import SelectTrigger from "./internal/SelectTrigger";
import PopupManager, { PopupManagerInterface, PopupManagerMode, PopupManagerRef } from "../PopupManager";
import Icon, { InternalIcons } from "../Icon";
import { InputContainerSize } from "../InputContainer/enums";
import InputContainer from "../InputContainer";

import { backgroundColor, margin, padding, transform, transition, verticalPadding } from "../../styles";
import { duration160 } from "../../constants/durations";
import SelectPopupComponent, { SelectPopupAvailableChildren } from "./internal/SelectPopupComponent";
import { SelectItemCode } from "./SelectItem";
import { Colors } from "../../constants/colors";

export type SelectInterface<CODE extends SelectItemCode> = Omit<
  PopupManagerInterface,
  "mode" | "closeOnClickOutside" | "popupElement" | "renderTriggerElement"
> & {
  outerStyles?: any;
  triggerElementStyles?: any;
  triggerTextStyles?: any;
  selectedElementStyles?: any;
  placeholder?: string;
  size?: InputContainerSize;
  iconLeft?: InternalIcons;
  children: React.ReactElement[];
  triggerElementRightIcon?: InternalIcons;
  triggerElementRightIconStyles?: any;
  triggerElementRightIconWidth?: number | string;
  triggerElementRightIconHeight?: number | string;
  triggerElementRightIconColor?: IncomeColorVariant<Colors>;
  closePopupAfterChange?: boolean;
  triggerElementChildrenModifier?: <C extends CODE>(currentText: string | number, code: C) => string | number;
  error?: boolean;
  selectedItemCode: CODE;
  popupElementWrapper?: (child: JSX.Element) => JSX.Element;
  onChange: (newActiveCode: CODE, newSelected: boolean) => void;
};

function Select<CODE extends SelectItemCode>({
  outerStyles,
  triggerElementStyles,
  triggerTextStyles,
  selectedElementStyles,
  children,
  iconLeft,
  size,
  placeholder,
  triggerElementRightIcon = "arrow-down",
  triggerElementRightIconStyles,
  triggerElementRightIconWidth,
  triggerElementRightIconHeight,
  triggerElementRightIconColor = "definitions.Select.RightArrow.color",
  triggerElementChildrenModifier,
  closePopupAfterChange = true,
  error,
  selectedItemCode,
  popupElementWrapper,
  onChange,
  ...props
}: SelectInterface<CODE>) {
  const popupManagerRef = React.useRef<PopupManagerRef>(null!);

  useEffectSkipFirst(() => {
    if (!closePopupAfterChange) return;
    popupManagerRef.current.hide();
  }, [selectedItemCode]);

  const selectedElement = React.useMemo(() => {
    const childrenElements = React.Children.toArray(children) as SelectPopupAvailableChildren<CODE>;
    const foundElement = childrenElements.find((element) => element.props.code === selectedItemCode);
    if (!foundElement) return null;
    return React.cloneElement(foundElement, {
      children: triggerElementChildrenModifier
        ? triggerElementChildrenModifier(foundElement.props.children, selectedItemCode)
        : foundElement.props.children,
      hoverable: false,
      selected: false,
      styles: [foundElement.props.styles, backgroundColor("transparent"), margin(0), padding(0)], //TODO: refactor
      mainTextStyles: [foundElement.props.mainTextStyles, triggerTextStyles],
      onClick: undefined,
    });
  }, [children, selectedItemCode, triggerElementChildrenModifier, triggerTextStyles]);

  const popupElement = (
    <SelectPopupComponent selectedItemCode={selectedItemCode} onChange={onChange}>
      {children}
    </SelectPopupComponent>
  );

  return (
    <PopupManager
      {...props}
      ref={popupManagerRef}
      mode={PopupManagerMode.CLICK}
      closeOnClickOutside
      popupElement={popupElementWrapper ? popupElementWrapper(popupElement) : popupElement}
      renderTriggerElement={({ initRef, visible }) => (
        <InputContainer
          outerStyles={outerStyles}
          outerRef={initRef}
          size={size}
          iconLeft={iconLeft}
          iconRight={
            <Icon
              icon={triggerElementRightIcon}
              width={triggerElementRightIconWidth}
              height={triggerElementRightIconHeight}
              styles={[
                transition(`all ${duration160}`),
                transform(`rotateZ(${visible ? "180deg" : "0deg"})`),
                triggerElementRightIconStyles,
              ]}
              color={triggerElementRightIconColor}
            />
          }
          error={error}
          renderComponent={(styles) => (
            <SelectTrigger styles={[styles, selectedElement && verticalPadding(0), triggerElementStyles]}>
              {selectedElement || (
                <Typography dots color="definitions.SelectTriggerElement.colorText" styles={triggerTextStyles}>
                  {placeholder}
                </Typography>
              )}
            </SelectTrigger>
          )}
        />
      )}
    />
  );
}

export default React.memo(Select) as <CODE extends SelectItemCode>(props: SelectInterface<CODE>) => JSX.Element;
