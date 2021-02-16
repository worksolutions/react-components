import React from "react";
import styled, { css } from "styled-components";
import { child, getColor } from "../../styles";

import { Colors } from "../../constants/colors";

enum Size {
    'extra-small',
    small,
    medium,
    large,
    'extra-large',
    'custom'
}

type SizeType = keyof typeof Size;

type SizeWidth = {
    [key in Exclude<SizeType, "custom">]: number;
}

const sizeWidth: SizeWidth = {
    'extra-small': 10,
    small: 14,
    medium: 24,
    large: 45,
    'extra-large': 90
};

export interface SpinnerInterface {
  color?: Colors;
  className?: string;
  size: SizeType;
  width?: number;
}

const getSpinnerWidth = ({size, width}: SpinnerInterface) => {
    if (size === 'custom') {
        return width;
    }
    return sizeWidth[size]
};

const StyledSpinner = styled.div.attrs({ className: "loader" })<Required<SpinnerInterface>>`
   width: ${(props) => getSpinnerWidth(props)}px;

  .path {
    stroke: ${(props) => getColor(props.color)};
  }
`;

const Spinner = function ({color, className, size = 'medium', width}: SpinnerInterface) {
  return (
    <StyledSpinner {...({color, className, size, width} as any)}>
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
