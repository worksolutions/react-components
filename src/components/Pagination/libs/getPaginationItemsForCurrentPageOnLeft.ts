import { range } from "ramda";

import { createPageLinkItem, createTriplePointItem } from "./libs";

export function getPaginationItemsForCurrentPageOnLeft(currentPage: number, maxLinksCount: number) {
  return [
    createPageLinkItem(1),
    ...range(2, maxLinksCount).map(createPageLinkItem),
    createTriplePointItem(maxLinksCount),
  ];
}
