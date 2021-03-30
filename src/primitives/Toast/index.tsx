import React from "react";
import { makeExcludingDeepEqual } from "@worksolutions/utils";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import Button, { ButtonSize, ButtonType } from "../Button";

import {
  ai,
  animation,
  backgroundColor,
  border,
  borderRadius,
  bottom,
  flex,
  height,
  horizontalPadding,
  jc,
  left,
  marginRight,
  marginTop,
  position,
  transform,
  willChange,
} from "../../styles";
import { zIndex_toast } from "../../constants/zIndexes";

import { calcToastBottom, toastAnimations, toastHeight, toastMarginTop } from "./libs";

export interface ToastInterface {
  text: string;
  error?: boolean;
  cancelButton?: {
    text: string;
    onClick: () => void;
  };
}

export interface ToastComponentInterface extends ToastInterface {
  index?: number;
  removeToast: () => void;
}

function Toast({ index = 0, text, error, cancelButton, removeToast }: ToastComponentInterface) {
  return (
    <Wrapper
      styles={[
        flex,
        jc("center"),
        left("50%"),
        height(toastHeight),
        position("fixed"),
        willChange("opacity"),
        transform("translateX(-50%)"),
        animation([toastAnimations.showToast]),
        bottom(calcToastBottom(index)),
        marginTop(toastMarginTop),
        zIndex_toast,
      ]}
    >
      <Wrapper
        styles={[
          backgroundColor("definitions.Toast.backgroundColor"),
          borderRadius(6),
          border(1, error ? "definitions.Toast.errorBorderColor" : "definitions.Toast.defaultBorderColor"),
          flex,
          ai("center"),
          horizontalPadding(16),
        ]}
      >
        <Typography styles={marginRight(12)} color="definitions.Toast.textColor">
          {text}
        </Typography>
        {cancelButton && (
          <Button
            styles={marginRight(8)}
            type={ButtonType.GHOST}
            size={ButtonSize.MEDIUM}
            onClick={cancelButton.onClick}
          >
            {cancelButton.text}
          </Button>
        )}
        <Button type={ButtonType.ICON} size={ButtonSize.SMALL} iconLeft="cross-big" onClick={removeToast} />
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(Toast, makeExcludingDeepEqual(["removeToast"]));
