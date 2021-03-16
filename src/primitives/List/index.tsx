import React from "react";
import { firstChild, flex, flexColumn, lastChild, marginBottom, marginTop } from "../../styles";

import Wrapper from "../Wrapper";
import Typography from "../Typography";

import ListItem, { ListItemInterface } from "./ListItem";
import { getListItemStyles } from "./ListItem/libs";
import { ListItemSize } from "./ListItem/enum";

export interface ListInterface<CODE extends string | number> {
  emptyItemSize?: ListItemSize;
  items: ListItemInterface<CODE>[];
  emptyText?: string;
  outerStyles?: any;
}

function List<CODE extends string | number>({
  outerStyles,
  emptyItemSize = ListItemSize.MEDIUM,
  emptyText,
  items,
}: ListInterface<CODE>) {
  return (
    <Wrapper styles={[flex, flexColumn, outerStyles, firstChild(marginTop(4)), lastChild(marginBottom(4))]}>
      {items.length === 0 && emptyText ? (
        <Wrapper styles={getListItemStyles(emptyItemSize, false, false)}>
          <Typography color="gray-blue/03" noWrap>
            {emptyText}
          </Typography>
        </Wrapper>
      ) : (
        items.map((item) => <ListItem key={item.code} {...item} />)
      )}
    </Wrapper>
  );
}

export default React.memo(List) as <CODE extends string | number>(props: ListInterface<CODE>) => JSX.Element;
