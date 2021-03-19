import React from "react";

import ListItem, { ListItemInterface } from "../../List/ListItem";

import { VisibilityManagerContext } from "../../VisibilityManager/VisibilityManagerContext";

export interface SelectItemInterface<CODE extends string | number>
  extends Omit<ListItemInterface<CODE>, "selected" | "onChange"> {}

function SelectItem<CODE extends string | number>(props: SelectItemInterface<CODE>) {
  const { hide } = React.useContext(VisibilityManagerContext);

  // @ts-ignore
  return <ListItem {...props} onAfterClick={hide} onChange={props.onChange as any} />;
}

export default React.memo(SelectItem) as <CODE extends string | number>(
  props: SelectItemInterface<CODE>,
) => JSX.Element;
