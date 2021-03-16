import React from "react";

import {
  active,
  borderRadius,
  emptyBoxShadow,
  flexValue,
  focus,
  hover,
  marginLeft,
  marginRight,
  marginTop,
  maxHeight,
  overflow,
  paddingBottom,
  paddingLeft,
  transform,
  transition,
  backgroundColor,
  borderBottom,
  borderTop,
} from "../../styles";

import ListItem from "../List/ListItem";
import Wrapper from "../Wrapper";
import DroppedList, { DroppedListInterface } from "../List/DroppedList";
import Input, { InputSize } from "../Input/Input";
import ClearInputWrapper from "../ClearInputWrapper";
import Icon from "../Icon";

import { DropdownContainerInterface, DropdownItemInterface } from "./types";
import {
  makeOptionalActionItem,
  matchDropdownSizeAndSearchSize,
  matchingDropdownSizeAndItemSize,
  useItems,
} from "./libs";
import { duration160 } from "../../constants/durations";
import { intl } from "../../intl";

export type DropdownContainerComponentInterface<CODE extends string | number> = DropdownContainerInterface<CODE> & {
  children: (selectedItems: DropdownItemInterface<CODE>[]) => DroppedListInterface<CODE>["children"];
};

function getEmptyText(
  search: string,
  { searchable, notFoundText }: { searchable?: boolean; notFoundText?: string },
  emptyListText?: string,
) {
  if (!searchable) return emptyListText;
  if (search.length !== 0) return notFoundText || intl.text("components.dropdown.notFound");
  return emptyListText || intl.text("components.dropdown.notFound");
}

const DropdownContainer = function ({
  excludeSelected,
  searchable,
  searchableNotFoundText,
  searchableEmptyListText,
  optionalAction,
  size = InputSize.MEDIUM,
  selectedItemCodes,
  items,
  children,
  onChange,
}: DropdownContainerComponentInterface<string>) {
  const { search, resultItems, selectedItems, setSearch } = useItems(excludeSelected, selectedItemCodes, items);

  const clearSearch = () => setSearch("");

  const itemSize = matchingDropdownSizeAndItemSize[size];

  return (
    <DroppedList
      margin={6}
      itemSize={itemSize}
      items={resultItems}
      selectedItemIds={selectedItemCodes}
      includeMinWidthCalculation={!searchable}
      emptyText={getEmptyText(search, { searchable, notFoundText: searchableNotFoundText }, searchableEmptyListText)}
      itemsWrapper={(child) => <Wrapper styles={[maxHeight(400), overflow("auto")]}>{child}</Wrapper>}
      topComponent={
        searchable && (
          <ClearInputWrapper
            styles={[marginLeft(4), marginRight(4), borderBottom(1, "gray-blue/02"), paddingBottom(4)]}
            needShow={!!search}
            clearButtonSize={matchDropdownSizeAndSearchSize[size].clearButtonSize}
            clear={clearSearch}
          >
            <Input
              placeholder={intl.text("components.dropdown.searchInputPlaceholder")}
              autofocus
              styles={[
                backgroundColor("white"),
                paddingLeft(0),
                borderRadius(0),
                emptyBoxShadow,
                hover(emptyBoxShadow),
                focus(emptyBoxShadow),
                active(emptyBoxShadow),
              ]}
              size={matchDropdownSizeAndSearchSize[size].inputSize}
              outerStyles={flexValue(1)}
              value={search}
              onChange={setSearch}
            />
          </ClearInputWrapper>
        )
      }
      bottomComponent={
        optionalAction && (
          <>
            <Wrapper styles={[marginLeft(4), marginRight(4), borderTop(1, "gray-blue/02")]} />
            <ListItem
              item={makeOptionalActionItem(optionalAction.title, optionalAction.icon)}
              isActiveItem={false}
              itemSize={itemSize}
              styles={marginTop(4)}
              onClick={optionalAction.onClick}
            />
          </>
        )
      }
      onChange={(id, close) => {
        onChange(id);
        close();
      }}
      onClose={clearSearch}
    >
      {children(selectedItems)}
    </DroppedList>
  );
};

export default DropdownContainer;

export function createDropdownRightIcon(opened: boolean) {
  return (
    <Icon
      icon="arrow-down"
      styles={[transition(`all ${duration160}`), transform(`rotateZ(${opened ? "180deg" : "0deg"})`)]}
      color="gray-blue/07"
    />
  );
}
