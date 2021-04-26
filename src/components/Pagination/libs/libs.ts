export const createPageLinkItem = (page: number) => ({
  text: page.toString(),
  page,
});

export const createTriplePointItem = (page: number) => ({ text: "...", page });

export function controlKeyIsPressed(event: any) {
  return event.ctrlKey || event.metaKey;
}

export function calculatePaginationParams(page: number, perPage: number, elementsCount: number) {
  const lastElementNumberOnPage = page * perPage;
  const firstElementNumberOnPage = lastElementNumberOnPage - perPage + 1;
  return {
    lastElementNumberOnPage: Math.min(lastElementNumberOnPage, elementsCount),
    firstElementNumberOnPage,
  };
}
