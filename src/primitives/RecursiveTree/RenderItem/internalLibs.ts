import { append, propEq, without } from "ramda";

import { RenderItemResult } from "./index";

export function getNeedShowChildElements(
  openWhenSubChildSelected: boolean,
  selected: boolean,
  items: RenderItemResult[],
) {
  if (!openWhenSubChildSelected) return selected;

  const hasSomeSelectedChildren = items.some(propEq("selected", true));

  return selected ? items.length !== 0 : hasSomeSelectedChildren;
}

export function getNewActiveElements(id: number, selected: boolean, activeIds: number[]) {
  const newSelected = !selected;

  return {
    newActiveIds: newSelected ? append(id, activeIds) : without([id], activeIds),
    newSelected,
  };
}
