import {
  ai,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  createAlphaColor,
  disableOutline,
  flex,
  focus,
  horizontalPadding,
  hover,
  marginBottom,
  marginTop,
  minHeight,
  opacity,
  pointer,
  transition,
} from "../../../styles";

import { duration160 } from "../../../constants/durations";

import { ListItemSize } from "./types";

export const heightForItemSize: Record<ListItemSize, number> = {
  [ListItemSize.LARGE]: 48,
  [ListItemSize.MEDIUM]: 40,
  [ListItemSize.SMALL]: 32,
};

export function getItemStyles(itemSize: ListItemSize, enabled: boolean, isActiveItem: boolean) {
  return [
    backgroundColor("transparent"),
    disableOutline,
    borderNone,
    minHeight(heightForItemSize[itemSize]),
    flex,
    marginTop(4),
    marginBottom(4),
    ai("center"),
    borderRadius(4),
    horizontalPadding(8),
    transition(`all ${duration160}`),
    enabled
      ? [
          pointer,
          hover([backgroundColor("gray-blue/01")]),
          focus(boxShadow([0, 0, 0, 2, "blue/04"])),
          isActiveItem && [backgroundColor("gray-blue/01"), boxShadow([0, 0, 1, 0, createAlphaColor("black", 81)])],
        ]
      : [[opacity(0.6)]],
  ];
}
