import { range } from "ramda";

import { createPageLinkItem, createTriplePointItem } from "./libs";

const TRIPLE_POINTS_ITEMS_COUNT = 2;
const FIRST_PAGE_ITEM = 1;
const CURRENT_PAGE_ITEM = 1;

// Количество уже занятых системных кнопок пагинации
const INTERNAL_PAGINATION_ITEMS_COUNT = TRIPLE_POINTS_ITEMS_COUNT + FIRST_PAGE_ITEM + CURRENT_PAGE_ITEM;

export function getPaginationItemsForCurrentPageInCenter(currentPage: number, maxLinksCount: number) {
  //Количество свободных слотов под кнопки
  //Свободный слот === слот который не занят системным кнопками (1 страница, текущая страница либо три точки)
  const notInternalItemsCount = maxLinksCount - INTERNAL_PAGINATION_ITEMS_COUNT;
  const halfOfNotInternalItemsCount = notInternalItemsCount / 2;

  //Количество свободных слотов под кнопки слева от центра
  const leftNotInternalItemsCount = Math.floor(halfOfNotInternalItemsCount);
  //Количество свободных слотов под кнопки справа от центра
  //(может быть больше чем слева так как слева и так уже нарисована кнопка первой страницы)
  const rightNotInternalItemsCount = Math.ceil(halfOfNotInternalItemsCount);

  //Свободный слот слева начинается со страницы
  const leftPagesStartsWith = currentPage - leftNotInternalItemsCount;
  //Свободные слоты слева оканчиваются страницей
  const leftPagesEndsWith = currentPage;

  //Свободный слот справа начинается со страницы
  const rightPagesStartsWith = currentPage + 1;
  //Свободные слоты справа оканчиваются страницей
  const rightPagesEndsWith = rightPagesStartsWith + rightNotInternalItemsCount;

  return [
    createPageLinkItem(1), //первая страница
    createTriplePointItem(leftPagesStartsWith - 1), // три точки для левых слотов
    ...range(leftPagesStartsWith, leftPagesEndsWith).map(createPageLinkItem), // сами левые слоты
    createPageLinkItem(currentPage), // текущая страница(центр)
    ...range(rightPagesStartsWith, rightPagesEndsWith).map(createPageLinkItem), // правые слоты
    createTriplePointItem(rightPagesEndsWith), // три точки для правых слотов
  ];
}
