import React, { ReactNode, Ref } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { IncomeColorVariant } from "@worksolutions/react-utils";

import {
  textDots,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  display,
  whiteSpace,
  color,
  getColor,
} from "../../styles";
import { Colors } from "../../constants/colors";
import { StyledComponentsAs } from "../../types/StyledComponents";

const TypographyWrapper = styled.span``;

export const TypographyTypes = {
  "h1-bold": [fontSize(32), lineHeight(36), fontWeight("bold")],
  "h2-bold": [fontSize(24), lineHeight(28), fontWeight("bold"), letterSpacing(0.15)],
  "h3-bold": [fontSize(18), lineHeight(20), fontWeight("bold"), letterSpacing(0.15)],
  "body-regular": [fontSize(14), lineHeight(20), letterSpacing(0.15), fontWeight(400)],
  "body-semi-bold": [] as any[],
  "caption-regular": [fontSize(12), lineHeight(16), letterSpacing(0.25), fontWeight(400)],
  "caption-semi-bold": [] as any[],
  "overline-medium": [fontWeight(500), fontSize(10), lineHeight(12), letterSpacing(0.25)],
  "overline-bold": [] as any[],
  button: [fontWeight(600), fontSize(14), lineHeight(24), letterSpacing(0.15)],
};

TypographyTypes["body-semi-bold"] = [...TypographyTypes["body-regular"], fontWeight(600)];
TypographyTypes["caption-semi-bold"] = [...TypographyTypes["caption-regular"], fontWeight(600)];
TypographyTypes["overline-bold"] = [...TypographyTypes["overline-medium"], fontWeight("bold")];

export interface TypographyInterface {
  noWrap?: boolean;
  className?: string;
  as?: StyledComponentsAs;
  type?: keyof typeof TypographyTypes;
  color?: IncomeColorVariant<Colors>;
  styles?: any;
  dots?: boolean;
  children: ReactNode;
  asHTML?: boolean;
  onClick?: () => void;
}

const Typography = React.forwardRef(
  (
    {
      as,
      noWrap,
      className,
      styles,
      children,
      type,
      color: colorProp,
      dots: dotsProp,
      asHTML,
      onClick,
      ...props
    }: TypographyInterface,
    ref: Ref<HTMLSpanElement>,
  ) => {
    const contentProps = asHTML ? { dangerouslySetInnerHTML: { __html: children } } : { children };

    return (
      <TypographyWrapper
        className={className}
        ref={ref}
        as={as as any}
        css={[
          display("inline-block"),
          type ? TypographyTypes[type] : null,
          colorProp && color(colorProp),
          dotsProp && textDots,
          noWrap && whiteSpace("nowrap"),
          styles,
        ]}
        onClick={onClick}
        {...props}
        {...contentProps}
      />
    );
  },
);

Typography.defaultProps = {
  type: "body-regular",
};

export default React.memo(Typography);

export const TypographyGlobalStyle = createGlobalStyle`*{color: ${getColor("definitions.Text.defaultColor")}}`;
