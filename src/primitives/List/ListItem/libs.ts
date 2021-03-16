import {
  ai,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  disableOutline,
  flex,
  focus,
  horizontalPadding,
  hover,
  margin,
  minHeight,
  opacity,
  pointer,
  transition,
} from "../../../styles";
import { duration160 } from "../../../constants/durations";

import { ListItemSize } from "./enum";

const heightForItemSize: Record<ListItemSize, number> = {
  [ListItemSize.LARGE]: 48,
  [ListItemSize.MEDIUM]: 40,
  [ListItemSize.SMALL]: 32,
};

export function getListItemStyles(itemSize: ListItemSize, enabled: boolean, active?: boolean) {
  return [
    backgroundColor("transparent"),
    disableOutline,
    borderNone,
    minHeight(heightForItemSize[itemSize]),
    flex,
    margin("2px 1px"),
    ai("center"),
    borderRadius(4),
    horizontalPadding(8),
    transition(`all ${duration160}`),
    enabled
      ? [
          pointer,
          hover([backgroundColor("definitions.ListItem.Selected.backgroundColor")]),
          focus(boxShadow([0, 0, 0, 2, "definitions.Button.focus.color"])),
        ]
      : [opacity(0.3)],
    active && [backgroundColor("definitions.ListItem.Selected.backgroundColor")],
  ];
}
