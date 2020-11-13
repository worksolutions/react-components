import { BoxShadowTypeMaker } from "@worksolutions/react-utils/dist/styles/shadows";

import { boxShadow, createAlphaColor } from "../styles";
import { Colors } from "./colors";

type BoxShadow = BoxShadowTypeMaker<Colors>;

export const elevation8Raw: BoxShadow[] = [
  [0, 0, 2, 0, createAlphaColor("black", 15) as Colors],
  [0, 4, 8, 0, createAlphaColor("black", 20) as Colors],
];

export const elevation8 = boxShadow(elevation8Raw[0], elevation8Raw[1]);

export const elevation16Raw: BoxShadow[] = [
  [0, 2, 6, 0, createAlphaColor("black", 15) as Colors],
  [0, 8, 16, 0, createAlphaColor("black", 20) as Colors],
];

export const elevation16 = boxShadow(elevation16Raw[0], elevation16Raw[1]);

export const elevation24Raw: BoxShadow[] = [
  [0, 2, 6, 0, createAlphaColor("black", 10) as Colors],
  [0, 16, 24, 0, createAlphaColor("black", 20) as Colors],
];

export const elevation24 = boxShadow(elevation24Raw[0], elevation24Raw[1]);

export const elevation32Raw: BoxShadow[] = [
  [0, 4, 8, 0, createAlphaColor("black", 10) as Colors],
  [0, 16, 24, 0, createAlphaColor("black", 10) as Colors],
  [0, 24, 32, 0, createAlphaColor("black", 20) as Colors],
];

export const elevation32 = boxShadow(elevation32Raw[0], elevation32Raw[1], elevation32Raw[2]);
