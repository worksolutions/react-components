import { memoizeWith } from "ramda";
import { keyframes } from "styled-components";
import { string1 } from "@worksolutions/utils";

import { duration200 } from "../../constants/durations";

const firstToastBottom = 40;
export const toastHeight = 48;
export const toastMarginTop = 24;

const opacityShowFade = keyframes`
from {opacity: 0;}
to {opacity: 1;}
`;

export const toastAnimations = {
  showToast: { name: opacityShowFade, duration: duration200, timingFunction: "linear" },
};

export const calcToastBottom = memoizeWith(
  string1,
  (index: number) => index * (toastMarginTop + toastHeight) + firstToastBottom,
);
