import React from "react";
import styled, { css } from "styled-components";
import { memoizeWith } from "ramda";
import { string2 } from "@worksolutions/utils";
import { IncomeColorVariant } from "@worksolutions/react-utils";

import { child, getColor } from "../../styles";
import { Colors } from "../../constants/colors";

export enum SpinnerSize {
  "extra-small" = "extra-small",
  small = "small",
  medium = "medium",
  large = "large",
  "extra-large" = "extra-large",
  "custom" = "custom",
}

type SizeWidth = {
  [key in Exclude<SpinnerSize, "custom">]: number;
};

const sizeWidth: SizeWidth = {
  "extra-small": 10,
  small: 14,
  medium: 24,
  large: 44,
  "extra-large": 90,
};

export interface SpinnerInterface {
  styles?: any;
  color?: IncomeColorVariant<Colors>;
  backplateColor?: IncomeColorVariant<Colors>;
  className?: string;
  size?: SpinnerSize;
  width?: number;
  withBackplate?: boolean;
}

const getSpinnerWidth = memoizeWith(string2, (size: SpinnerSize, width: number) => {
  if (size === "custom") {
    return width;
  }

  return sizeWidth[size];
});

const StyledSpinner = styled.div.attrs({ className: "spinner" })<Required<SpinnerInterface>>`
  ${(props) => {
    const size = getSpinnerWidth(props.size, props.width);
    return `width: ${size}px; height: ${size}px;`;
  }};
  overflow: hidden;

  .path {
    &-spin {
      stroke: ${(props) => getColor(props.color)};
    }

    &-back {
      stroke: ${(props) => getColor(props.backplateColor)};
    }
  }
`;

const Spinner = function ({
  size = SpinnerSize.medium,
  styles,
  withBackplate,
  color = "definitions.Spinner.color",
  backplateColor = "definitions.Spinner.backplateColor",
  ...props
}: SpinnerInterface) {
  return (
    <StyledSpinner {...(props as any)} color={color} backplateColor={backplateColor} size={size} css={styles}>
      <svg className="circular" viewBox="25 25 50 50">
        {withBackplate && (
          <circle className="path path-back" cx="50" cy="50" r="20" fill="none" strokeWidth="8" strokeMiterlimit="10" />
        )}
        <circle className="path path-spin" cx="50" cy="50" r="20" fill="none" strokeWidth="4" strokeMiterlimit="10" />
      </svg>
    </StyledSpinner>
  );
};

export default React.memo(Spinner);

const strokeColor = (color: IncomeColorVariant<Colors>) =>
  css`
    stroke: ${getColor(color)};
  `;

export const makeSpinnerColorStyle = (color: IncomeColorVariant<Colors>) => child(strokeColor(color), ".path");
