import { range } from "ramda";

import { createTriplePointItem, createPageLinkItem } from "./libs";

const INTERNAL_PAGINATION_ITEMS_COUNT = 2;

export function getPaginationItemsForCurrentPageOnRight(
  currentPage: number,
  maxLinksCount: number,
  totalPages: number,
) {
  const triplePointPage = totalPages - maxLinksCount + INTERNAL_PAGINATION_ITEMS_COUNT;

  return [
    createPageLinkItem(1),
    createTriplePointItem(triplePointPage),
    ...range(triplePointPage + 1, totalPages + 1).map(createPageLinkItem),
  ];
}
