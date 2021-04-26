import { range } from "ramda";

import { createPageLinkItem } from "./libs";
import { getPaginationItemsForCurrentPageOnLeft } from "./getPaginationItemsForCurrentPageOnLeft";
import { getPaginationItemsForCurrentPageOnRight } from "./getPaginationItemsForCurrentPageOnRight";
import { getPaginationItemsForCurrentPageInCenter } from "./getPaginationItemsForCurrentPageInCenter";

export function calculatePagination(totalPages: number, currentPage: number, maxLinksCount: number) {
  if (totalPages <= maxLinksCount) {
    return range(1, totalPages + 1).map(createPageLinkItem);
  }

  const halfOfMaxLinksCount = Math.floor(maxLinksCount / 2);
  const isCurrentPageOnLeftSide = currentPage <= halfOfMaxLinksCount;

  if (isCurrentPageOnLeftSide) {
    return getPaginationItemsForCurrentPageOnLeft(currentPage, maxLinksCount);
  }

  const isCurrentPageOnRightSide = currentPage > totalPages - halfOfMaxLinksCount;

  if (isCurrentPageOnRightSide) {
    return getPaginationItemsForCurrentPageOnRight(currentPage, maxLinksCount, totalPages);
  }

  return getPaginationItemsForCurrentPageInCenter(currentPage, maxLinksCount);
}
