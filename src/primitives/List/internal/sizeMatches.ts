import { ListItemSize } from "../ListItem/enum";
import { InputContainerSize } from "../../InputContainer/enums";

export const matchListItemSizesAndInputContainerSizes: Record<ListItemSize, InputContainerSize> = {
  [ListItemSize.SMALL]: InputContainerSize.SMALL,
  [ListItemSize.MEDIUM]: InputContainerSize.MEDIUM,
  [ListItemSize.LARGE]: InputContainerSize.LARGE,
};
