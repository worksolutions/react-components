import React from "react";

import ListItem, { ListItemInterface } from "../../List/ListItem";

export interface SelectItemInterface<CODE extends string | number>
  extends Omit<ListItemInterface<CODE>, "selected" | "onChange"> {}

function SelectItem<CODE extends string | number>(props: SelectItemInterface<CODE>) {
  return <ListItem {...props} onChange={props.onChange as any} />;
}

export default React.memo(SelectItem) as <CODE extends string | number>(
  props: SelectItemInterface<CODE>,
) => JSX.Element;
