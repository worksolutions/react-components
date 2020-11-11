import React from "react";
import { ai, emptyBoxShadow, flex, focus, horizontalPadding, marginLeft, overflow, width } from "../../styles";

import Wrapper from "../Wrapper";
import Button, { ButtonSize, ButtonType } from "../Button";

const buttonWidthBySize: Record<ButtonSize, number> = {
  [ButtonSize.LARGE]: 32,
  [ButtonSize.MEDIUM]: 32,
  [ButtonSize.SMALL]: 24,
};

function ClearInputWrapper({
  children,
  needShow,
  clear,
  size = ButtonSize.MEDIUM,
  styles,
}: {
  children: JSX.Element;
  needShow?: boolean;
  clear: () => void;
  size?: ButtonSize;
  styles?: any;
}) {
  return (
    <Wrapper styles={[flex, ai("center"), styles]}>
      {children}
      <Button
        styles={[
          needShow
            ? [marginLeft(4), width(buttonWidthBySize[size])]
            : [marginLeft(0), width(0), focus(emptyBoxShadow), horizontalPadding(0)],
          overflow("hidden"),
        ]}
        tabIndex={needShow ? 0 : -1}
        type={ButtonType.ICON}
        size={size}
        iconLeft="cross-small"
        onClick={clear}
      />
    </Wrapper>
  );
}

export default React.memo(ClearInputWrapper);
