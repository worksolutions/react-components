import React from "react";
import styled, { css } from "styled-components";
import { memoizeWith } from "ramda";
import { string2 } from "@worksolutions/utils";

import { child, getColor } from "../../styles";
import { Colors } from "../../constants/colors";
import { IncomeColorVariant } from "@worksolutions/react-utils";

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
  className?: string;
  size?: SpinnerSize;
  width?: number;
}

const getSpinnerWidth = memoizeWith(string2, (size: SpinnerSize, width: number) => {
  if (size === "custom") {
    return width;
  }

  return sizeWidth[size];
});

const StyledSpinner = styled.div.attrs({ className: "loader" })<Required<SpinnerInterface>>`
  width: ${(props) => getSpinnerWidth(props.size, props.width)}px;

  .path {
    stroke: ${(props) => getColor(props.color)};
  }
`;

const Spinner = function ({ size = SpinnerSize.medium, styles, ...props }: SpinnerInterface) {
  return (
    <StyledSpinner {...(props as any)} size={size} css={styles}>
      <svg className="circular" viewBox="25 25 50 50">
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
      </svg>
    </StyledSpinner>
  );
};

Spinner.defaultProps = {
  color: "gray-blue/09",
};

export default React.memo(Spinner);

const strokeColor = (color: Colors) =>
  css`
    stroke: ${getColor(color)};
  `;

export const makeSpinnerColorStyle = (color: Colors) => child(strokeColor(color), ".path");
