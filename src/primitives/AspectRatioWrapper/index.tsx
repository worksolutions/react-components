import React from "react";
import { UseMeasureRect } from "react-use/lib/useMeasure";
import { useMeasureCallback } from "@worksolutions/react-utils";

import { ai, flex, height, jc, overflow, stringOrPixels, width } from "../../styles";

import Wrapper from "../Wrapper";
import { StyledComponentsAs } from "../../types/StyledComponents";

export interface AspectRatioWrapperInterface {
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  outerStyles?: any;
  styles?: any;
  as?: StyledComponentsAs;
}

function getSizes(
  data: Pick<AspectRatioWrapperInterface, "width" | "height" | "aspectRatio">,
  measure: UseMeasureRect,
) {
  if (data.aspectRatio) {
    if (data.width) return { width: measure.width, height: measure.width / data.aspectRatio };
    return { width: measure.width * data.aspectRatio, height: measure.height };
  }
  return { width: "100%", height: "100%" };
}

function AspectRatioWrapper({
  height: heightProp,
  width: widthProp,
  aspectRatio,
  styles,
  outerStyles,
  as,
  children,
}: AspectRatioWrapperInterface & { children: JSX.Element }) {
  const childContainerRef = React.useRef<HTMLElement>();
  const [initWrapperMeasures] = useMeasureCallback((size) => {
    if (!childContainerRef.current) return;
    const resultSizes = getSizes({ height: heightProp, width: widthProp, aspectRatio }, size);
    childContainerRef.current.style.width = stringOrPixels(resultSizes.width);
    childContainerRef.current.style.height = stringOrPixels(resultSizes.height);
  });

  return (
    <Wrapper
      ref={initWrapperMeasures}
      styles={[overflow("hidden"), widthProp && width(widthProp), heightProp && height(heightProp), outerStyles]}
    >
      <Wrapper ref={childContainerRef} as={as} styles={[flex, ai("center"), jc("center"), overflow("hidden"), styles]}>
        {children}
      </Wrapper>
    </Wrapper>
  );
}

export default React.memo(AspectRatioWrapper);
