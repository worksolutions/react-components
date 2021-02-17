import React from "react";
import { makeExcludingDeepEqual } from "@worksolutions/utils";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

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
} from "styles";

import { zIndex_toast } from "layout/zIndexes";

import { calcToastBottom, toastAnimations, toastHeight, toastMarginTop } from "./libs";

interface BaseToastInterface {
  text: string;
  error?: boolean;
  cancelButton?: {
    text: string;
    onClick: () => void;
  };
}

export interface ToastPropsInterface extends BaseToastInterface {
  index: number;
  removeToast: () => void;
}

function Toast({ index, text, error, cancelButton, removeToast }: ToastPropsInterface) {
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
        animation([toastAnimations.showToast, toastAnimations.hideToast]),
        bottom(calcToastBottom(index)),
        marginTop(toastMarginTop),
        zIndex_toast,
      ]}
    >
      <Wrapper
        styles={[
          backgroundColor("white"),
          borderRadius(6),
          border(1, error ? "red/05" : "gray-blue/02"),
          flex,
          ai("center"),
          horizontalPadding(16),
        ]}
      >
        <Typography styles={marginRight(12)}>{text}</Typography>
        {cancelButton && (
          <Button
            styles={marginRight(8)}
            type={ButtonType.GHOST}
            size={ButtonSize.MEDIUM}
            onClick={cancelButton!.onClick}
          >
            {cancelButton.text}
          </Button>
        )}
        <Button type={ButtonType.ICON} size={ButtonSize.SMALL} iconLeft="cross-big" onClick={removeToast} />
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(Toast, makeExcludingDeepEqual(["index", "removeToast"]));
