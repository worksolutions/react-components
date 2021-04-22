import { ListItemSize } from "../../List/ListItem/enum";
import { InputContainerSize } from "../../InputContainer/enums";

export const matchListItemSizesAndInputContainerSizes: Record<ListItemSize, InputContainerSize> = {
  [ListItemSize.SMALL]: InputContainerSize.MEDIUM,
  [ListItemSize.MEDIUM]: InputContainerSize.LARGE,
  [ListItemSize.LARGE]: InputContainerSize.LARGE,
};
