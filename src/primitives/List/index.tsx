import React from "react";
import { firstChild, flex, flexColumn, lastChild, marginBottom, marginTop } from "../../styles";

import Wrapper from "../Wrapper";
import Typography from "../Typography";

import ListItem, { getItemStyles, ListItemInterface, ListItemSize } from "./ListItem";
import { Colors } from "../../constants/colors";

export type ListItemId = string | number;

interface ListInterface<ITEM extends string | number> {
  itemSize?: ListItemSize;
  emptyText?: string;
  outerStyles?: any;
  titleStyles?: any;
  itemStyles?: any;
  titleDots?: boolean;
  dividerColor?: Colors;
  activeItemIds: (ITEM | null | undefined)[];
  items: ListItemInterface<ITEM>[];
  onClick?: (id: ITEM) => void;
}

function List({
  outerStyles,
  itemSize = ListItemSize.LARGE,
  emptyText,
  activeItemIds,
  titleDots,
  titleStyles,
  itemStyles,
  items,
  onClick,
}: ListInterface<any>) {
  return (
    <Wrapper styles={[flex, flexColumn, outerStyles, firstChild(marginTop(4)), lastChild(marginBottom(4))]}>
      {items.length === 0 && emptyText ? (
        <Wrapper styles={getItemStyles(itemSize, false, false)}>
          <Typography color="gray-blue/03" noWrap>
            {emptyText}
          </Typography>
        </Wrapper>
      ) : (
        items.map((item) => (
          <ListItem
            key={item.code}
            itemSize={itemSize}
            titleDots={titleDots}
            titleStyles={titleStyles}
            styles={itemStyles}
            item={item}
            isActiveItem={activeItemIds.includes(item.code)}
            onClick={onClick}
          />
        ))
      )}
    </Wrapper>
  );
}

List.defaultProps = {
  dividerColor: "gray-blue/02",
};

export default React.memo(List) as <ITEM extends string | number>(props: ListInterface<ITEM>) => JSX.Element;
