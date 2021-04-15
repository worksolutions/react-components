import React from "react";
import { isString } from "@worksolutions/utils";
import { IncomeColorVariant } from "@worksolutions/react-utils";

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
  backgroundColor,
  borderRadius,
  boxShadow,
  color,
  focus,
  fullWidth,
  hover,
  left,
  position,
  right,
  top,
  transform,
} from "../../styles";

export type InputIconProp = InternalIcons | JSX.Element | undefined;

export interface InputContainerInterface {
  outerStyles?: any;
  leftIcon?: InputIconProp;
  rightIcon?: InputIconProp;
  leftIconStyles?: any;
  rightIconStyles?: any;
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
  leftIcon,
  rightIcon,
  leftIconStyles,
  rightIconStyles,
  error,
  success,
  disabled,
  renderComponent,
  outerRef,
  onClick,
}: InputContainerInterface & {
  renderComponent: (styles: any) => JSX.Element;
}) {
  const leftIconElement = makeIconElement(leftIcon, "definitions.InputContainer.leftIconColor", [
    left(8),
    leftIconStyles,
  ]);

  const rightIconElement = makeIconElement(rightIcon, "definitions.InputContainer.rightIconColor", [
    right(8),
    rightIconStyles,
  ]);

  const styles = stylesForSize[size][getStylesNameOnIcons(!!leftIcon, !!rightIcon)];
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

function makeIconElement(icon: InputIconProp, defaultColor: IncomeColorVariant<Colors>, styles: any) {
  if (!icon) return undefined;
  const resultStyles = [defaultIconStyles, styles];
  if (isString(icon)) return <Icon color={defaultColor} icon={icon} styles={resultStyles} />;
  return <Wrapper styles={resultStyles}>{icon}</Wrapper>;
}
