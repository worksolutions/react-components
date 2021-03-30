import React from "react";
import { IncomeColorVariant, provideRef, useEffectSkipFirst } from "@worksolutions/react-utils";

import Typography from "../Typography";
import SelectTrigger from "./internal/SelectTrigger";
import PopupManager, { PopupManagerInterface, PopupManagerMode, PopupManagerRef } from "../PopupManager";
import Icon, { InternalIcons } from "../Icon";
import InputContainer, { InputContainerInterface } from "../InputContainer";

import { paddingLeft, transform, transition, verticalPadding } from "../../styles";
import { duration160 } from "../../constants/durations";
import SelectPopupComponent, { SelectPopupChildren } from "./internal/SelectPopupComponent";
import { SelectItemCode } from "./SelectItem";
import { Colors } from "../../constants/colors";

import { tooltipPopupStyles } from "../Tooltip";

export type SelectInterface<CODE extends SelectItemCode> = Omit<
  PopupManagerInterface,
  "mode" | "closeOnClickOutside" | "popupElement" | "renderTriggerElement"
> &
  Omit<InputContainerInterface, "onClick" | "outerRef" | "children" | "rightIcon" | "leftIcon" | "leftIconStyles"> & {
    styles?: any;
    placeholder?: string;
    placeholderColor?: IncomeColorVariant<Colors>;
    children: SelectPopupChildren<CODE>;
    rightIcon?: InternalIcons;
    selectedElementStyles?: any;
    selectedElementTextStyles?: any;
    rightIconStyles?: any;
    rightIconWidth?: number | string;
    rightIconHeight?: number | string;
    rightIconColor?: IncomeColorVariant<Colors>;
    closePopupAfterChange?: boolean;
    selectedElementWrapper?: <C extends CODE>(currentText: string | number, code: C) => string | number;
    selectedItemCode: CODE;
    popupElementWrapper?: (child: JSX.Element) => JSX.Element;
    onChange: (newActiveCode: CODE, newSelected: boolean) => void;
  };

function Select<CODE extends SelectItemCode>(
  {
    rightIcon = "arrow-down",
    rightIconColor = "definitions.Select.RightIcon.color",
    rightIconHeight,
    rightIconWidth,
    rightIconStyles,
    selectedItemCode,
    selectedElementWrapper,
    selectedElementStyles,
    selectedElementTextStyles,
    closePopupAfterChange = true,
    children,
    popupElementWrapper,
    placeholder,
    placeholderColor = "definitions.Select.Placeholder.color",
    popupStyles,
    primaryPlacement,
    offset,
    popupWidth,
    strategy,
    hasArrow,
    styles,
    onChange,
    onChangeOpened,
    ...inputContainerProps
  }: SelectInterface<CODE>,
  ref: React.Ref<PopupManagerRef>,
) {
  const popupManagerRef = React.useRef<PopupManagerRef>(null!);

  useEffectSkipFirst(() => {
    if (!closePopupAfterChange) return;
    popupManagerRef.current.hide();
  }, [selectedItemCode]);

  const selectedElement = React.useMemo(() => {
    const childrenElements = React.Children.toArray(children) as SelectPopupChildren<CODE>;

    const foundElement = childrenElements.find((element) => element.props.code === selectedItemCode);
    if (!foundElement) return null;

    const { props } = foundElement;
    return React.cloneElement(foundElement, {
      children: selectedElementWrapper ? selectedElementWrapper(props.children, selectedItemCode) : props.children,
      hoverable: false,
      selected: false,
      styles: [props.styles, selectedElementStyles],
      mainTextStyles: [props.mainTextStyles, selectedElementTextStyles],
      onClick: undefined,
    });
  }, [children, selectedElementWrapper, selectedItemCode, selectedElementStyles, selectedElementTextStyles]);

  const popupElement = (
    <SelectPopupComponent selectedItemCode={selectedItemCode} onChange={onChange}>
      {children}
    </SelectPopupComponent>
  );

  return (
    <PopupManager
      ref={provideRef(popupManagerRef, ref)}
      primaryPlacement={primaryPlacement}
      mode={PopupManagerMode.CLICK}
      closeOnClickOutside
      offset={offset}
      popupWidth={popupWidth}
      strategy={strategy}
      hasArrow={hasArrow}
      popupStyles={[tooltipPopupStyles, popupStyles]}
      popupElement={popupElementWrapper ? popupElementWrapper(popupElement) : popupElement}
      renderTriggerElement={({ initRef, visible }) => (
        <InputContainer
          {...inputContainerProps}
          outerRef={initRef}
          rightIcon={
            <Icon
              icon={rightIcon}
              width={rightIconWidth}
              height={rightIconHeight}
              styles={[
                transition(`all ${duration160}`),
                transform(`rotateZ(${visible ? "180deg" : "0deg"})`),
                rightIconStyles,
              ]}
              color={rightIconColor}
            />
          }
          renderComponent={(inputContainerStyles) => (
            <SelectTrigger
              styles={[inputContainerStyles, selectedElement && [verticalPadding(0), paddingLeft(4)], styles]}
            >
              {selectedElement || (
                <Typography dots color={placeholderColor}>
                  {placeholder}
                </Typography>
              )}
            </SelectTrigger>
          )}
        />
      )}
      onChangeOpened={onChangeOpened}
    />
  );
}

export default React.memo(React.forwardRef(Select)) as <CODE extends SelectItemCode>(
  props: SelectInterface<CODE>,
) => JSX.Element;
