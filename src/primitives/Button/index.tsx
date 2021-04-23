import React, { ButtonHTMLAttributes, Ref, SyntheticEvent } from "react";
import { preventDefaultHandler } from "@worksolutions/react-utils";

import Wrapper from "../Wrapper";
import ButtonWrapper, { BaseButtonWrapperInterface } from "./ButtonWrapper";
import { StyledComponentsAs } from "../../types/StyledComponents";

export interface ButtonInterface extends BaseButtonWrapperInterface {
  as?: StyledComponentsAs;
  nativeType?: ButtonHTMLAttributes<any>["type"];
  tabIndex?: number;
  loadingText?: string;
  className?: string;
  preventDefault?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  onClickWhenDisabled?: () => void;
}

function Button(
  {
    as = "button",
    nativeType = "button",
    children,
    preventDefault: preventDefaultProp = true,
    className,
    tabIndex,
    onClick,
    onClickWhenDisabled,
    ...buttonWrapperProps
  }: ButtonInterface,
  ref: Ref<HTMLElement>,
) {
  const clickHandler = React.useCallback(
    (event: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
      const loading = buttonWrapperProps.loadingLeft || buttonWrapperProps.loadingRight;
      if (loading) return;
      if (preventDefaultProp) preventDefaultHandler(event);

      if (buttonWrapperProps.disabled) {
        if (onClickWhenDisabled) onClickWhenDisabled();
        return;
      }

      if (onClick) onClick();
    },
    [
      buttonWrapperProps.disabled,
      buttonWrapperProps.loadingLeft,
      buttonWrapperProps.loadingRight,
      onClick,
      onClickWhenDisabled,
      preventDefaultProp,
    ],
  );

  const buttonElement = React.useCallback(
    (styles: any, iconLeft: React.ReactNode, iconRight: React.ReactNode) => {
      const loading = buttonWrapperProps.loadingLeft || buttonWrapperProps.loadingRight;
      return (
        <Wrapper
          ref={ref}
          className={className}
          tabIndex={tabIndex}
          type={nativeType}
          as={as}
          styles={styles}
          onClick={clickHandler}
        >
          {iconLeft}
          {loading ? buttonWrapperProps.loadingText || children : children}
          {iconRight}
        </Wrapper>
      );
    },
    [
      as,
      buttonWrapperProps.loadingLeft,
      buttonWrapperProps.loadingRight,
      buttonWrapperProps.loadingText,
      children,
      className,
      clickHandler,
      nativeType,
      ref,
      tabIndex,
    ],
  );

  return <ButtonWrapper {...buttonWrapperProps}>{buttonElement}</ButtonWrapper>;
}

export default React.memo(React.forwardRef(Button));

export * from "./types";
