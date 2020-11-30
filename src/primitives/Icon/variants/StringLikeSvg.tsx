import React from "react";
import { child, fillColor, height, minHeight, minWidth, width } from "../../../styles";
import { IconVariantProps } from "./Type";
import Wrapper from "../../Wrapper";

export default React.forwardRef(function (
  { className, icon, width: widthProp, height: heightProp, styles, color }: IconVariantProps<string>,
  ref: any,
) {
  const css = [
    width(widthProp!),
    height(heightProp!),
    minWidth(widthProp!),
    minHeight(heightProp!),
    color && child(fillColor(color), "svg"),
  ];

  return (
    <Wrapper
      name="string-like-svg"
      as="span"
      styles={[css, child(css, "svg"), styles]}
      className={className}
      ref={ref}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
});
