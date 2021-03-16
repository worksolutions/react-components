import React from "react";
import { isString } from "@worksolutions/utils";

import Wrapper from "../Wrapper";
import Title from "./Title";
import Tip from "./Tip";
import Icon, { InternalIcons } from "../Icon";

import { Colors } from "../../constants/colors";
import { InputContainerSize, InputContainerTitlePosition, InputContainerVariant } from "./enums";
import {
  colorsByVariant,
  createDefaultInputStyles,
  getInputVariant,
  getStylesNameOnIcons,
  stylesForSize,
  wrapperStylesByTitlePosition,
} from "./libs";
import {
  borderRadius,
  focus,
  fullWidth,
  hover,
  left,
  position,
  right,
  top,
  transform,
  backgroundColor,
  boxShadow,
  color,
} from "../../styles";

export type InputIconProp = InternalIcons | JSX.Element | undefined;

export interface BaseInputWrapperInterface {
  outerStyles?: any;
  iconLeft?: InputIconProp;
  iconRight?: InputIconProp;
  iconLeftStyles?: any;
  iconRightStyles?: any;
  disabled?: boolean;
  title?: string;
  titlePosition?: InputContainerTitlePosition;
  tip?: string;
  size?: InputContainerSize;
  error?: boolean;
  success?: boolean;
  children?: React.ReactNode;
  outerRef?: any;
  onClick?: () => void;
}

function InputContainer({
  outerStyles,
  children,
  title,
  titlePosition = InputContainerTitlePosition.TOP,
  size = InputContainerSize.LARGE,
  tip,
  iconLeft,
  iconRight,
  iconLeftStyles,
  iconRightStyles,
  error,
  success,
  disabled,
  renderComponent,
  outerRef,
  onClick,
}: BaseInputWrapperInterface & {
  renderComponent: (styles: any) => JSX.Element;
}) {
  const leftIconElement = makeIconElement(iconLeft, "definitions.InputContainer.leftIconColor" as Colors, [
    left(8),
    iconLeftStyles,
  ]);
  const rightIconElement = makeIconElement(iconRight, "definitions.InputContainer.rightIconColor" as Colors, [
    right(8),
    iconRightStyles,
  ]);

  const styles = stylesForSize[size][getStylesNameOnIcons(!!iconLeft, !!iconRight)];

  const variant = getInputVariant(error, success, disabled);

  const colors = colorsByVariant[variant];

  const positioningStyles = wrapperStylesByTitlePosition[titlePosition];

  return (
    <Wrapper styles={outerStyles} onClick={onClick}>
      <Wrapper styles={positioningStyles.wrapper}>
        <Title styles={positioningStyles.title} title={title} />
        <Wrapper
          ref={outerRef}
          styles={[fullWidth, backgroundColor(colors.background), borderRadius(6), position("relative")]}
        >
          {renderComponent([
            createDefaultInputStyles(colors.placeholder),
            color(colors.color),
            boxShadow([0, 0, 0, 1, colors.shadowColor]),
            styles,
            variant === InputContainerVariant.DEFAULT
              ? [hover(boxShadow([0, 0, 0, 1, "definitions.InputContainer.hoverBoxShadowColor"]))]
              : [boxShadow([0, 0, 0, 2, colors.shadowColor])],
            focus([boxShadow([0, 0, 0, 2, "definitions.InputContainer.focusBoxShadowColor"])]),
          ])}
          {leftIconElement}
          {rightIconElement}
          {children}
        </Wrapper>
      </Wrapper>
      <Tip tip={tip} color={colors.tip} />
    </Wrapper>
  );
}

export default React.memo(InputContainer);

const defaultIconStyles = [position("absolute"), top("50%"), transform("translateY(-50%)")];

function makeIconElement(icon: InputIconProp, defaultColor: Colors, styles: any) {
  return icon ? (
    <Wrapper styles={[defaultIconStyles, styles]}>
      {isString(icon) ? <Icon color={defaultColor} icon={icon} /> : icon}
    </Wrapper>
  ) : undefined;
}
