import React, { ButtonHTMLAttributes, Ref } from "react";
import { preventDefault } from "@worksolutions/react-utils";

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
}

const Button = React.forwardRef(function (
  {
    as = "button",
    nativeType = "button",
    children,
    onClick,
    preventDefault: preventDefaultProp = true,
    className,
    tabIndex,
    ...buttonWrapperProps
  }: ButtonInterface,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <ButtonWrapper {...buttonWrapperProps}>
      {(styles, iconLeft, iconRight) => {
        const loading = buttonWrapperProps.loadingLeft || buttonWrapperProps.loadingRight;
        const clickHandler = loading ? undefined : onClick;
        return (
          <Wrapper
            className={className}
            ref={ref}
            tabIndex={tabIndex}
            type={nativeType}
            as={as}
            styles={styles}
            disabled={buttonWrapperProps.disabled}
            onClick={clickHandler && (preventDefaultProp ? preventDefault(clickHandler) : clickHandler)}
          >
            {iconLeft}
            {loading ? buttonWrapperProps.loadingText || children : children}
            {iconRight}
          </Wrapper>
        );
      }}
    </ButtonWrapper>
  );
});

export default React.memo(Button);

export * from "./types";
