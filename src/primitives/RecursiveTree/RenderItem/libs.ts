import { isNotNil } from "@worksolutions/utils";
import { assoc, compose, curry, flatten, has, identity, ifElse, propEq } from "ramda";

import { RecursiveTreeItem } from "./index";

export const findRecursiveTreeItemById = curry(function (
  items: RecursiveTreeItem[],
  id: number,
): RecursiveTreeItem | null {
  if (items.length === 0) {
    return null;
  }

  const found = items.find(propEq("id", id));

  if (found) {
    return found;
  }

  const subItems = flatten(items.map((item) => item.items)).filter(isNotNil) as RecursiveTreeItem[];

  return findRecursiveTreeItemById(subItems, id);
});

type OmittedRecursiveItem<T> = Omit<RecursiveTreeItem<T>, "level" | "parentId" | "items"> & {
  items?: OmittedRecursiveItem<T>[];
};

export function injectLevelToRecursiveTreeItems<T = any>(
  items: OmittedRecursiveItem<T>[],
  level = 0,
): RecursiveTreeItem<T>[] {
  const nextLevel = level + 1;

  return items.map(
    compose(
      assoc("level", level),
      ifElse(
        has("items"),
        (item) => assoc("items", injectLevelToRecursiveTreeItems(item.items, nextLevel), item),
        identity,
      ),
    ),
  );
}

export function injectParentIdToRecursiveTreeItems<T = any>(
  items: OmittedRecursiveItem<T>[],
  parentId: number | null = null,
): RecursiveTreeItem<T>[] {
  return items.map(
    compose(
      assoc("parentId", parentId),
      ifElse(
        has("items"),
        (item) => assoc("items", injectParentIdToRecursiveTreeItems<T>(item.items, item.id), item),
        identity,
      ),
    ),
  );
}
