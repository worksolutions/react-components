import React from "react";

import Wrapper from "../Wrapper";
import Button, { ButtonSize, ButtonType } from "../Button";

import {
  ai,
  emptyBoxShadow,
  flex,
  horizontalPadding,
  marginLeft,
  overflow,
  width,
  focus,
  flexShrink,
} from "../../styles";

const buttonWidthBySize: Record<ButtonSize, number> = {
  [ButtonSize.LARGE]: 32,
  [ButtonSize.MEDIUM]: 32,
  [ButtonSize.SMALL]: 24,
};

interface ClearInputWrapperInterface {
  children: JSX.Element;
  needShow?: boolean;
  clear: () => void;
  clearButtonSize?: ButtonSize;
  styles?: any;
}

function ClearInputWrapper({
  children,
  needShow,
  clear,
  clearButtonSize = ButtonSize.MEDIUM,
  styles,
}: ClearInputWrapperInterface) {
  return (
    <Wrapper styles={[flex, ai("center"), styles]}>
      {children}
      <Button
        styles={[
          flexShrink(0),
          needShow
            ? [marginLeft(4), width(buttonWidthBySize[clearButtonSize])]
            : [marginLeft(0), width(0), focus(emptyBoxShadow), horizontalPadding(0)],
          overflow("hidden"),
        ]}
        tabIndex={needShow ? 0 : -1}
        type={ButtonType.ICON}
        size={clearButtonSize}
        iconLeft="cross-small"
        onClick={clear}
      />
    </Wrapper>
  );
}

export default React.memo(ClearInputWrapper);
