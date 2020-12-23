import React from "react";
import {
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  height,
  minHeight,
  minWidth,
  width,
} from "../../../styles";
import { IconVariantProps } from "./Type";
import Wrapper from "../../Wrapper";

export default React.forwardRef(function (
  { className, icon, width: widthProp, height: heightProp, styles, color }: IconVariantProps<string>,
  ref: any,
) {
  return (
    <Wrapper
      name="string-like-link"
      as="span"
      styles={[
        width(widthProp!),
        height(heightProp!),
        minWidth(widthProp!),
        minHeight(heightProp!),
        backgroundImage(icon),
        backgroundPosition("center"),
        backgroundSize("cover"),
        styles,
      ]}
      className={className}
      ref={ref}
    />
  );
});