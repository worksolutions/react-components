import React from "react";

import ListItem, { ListItemInterface } from "../../List/ListItem";

import { VisibilityManagerContext } from "../../VisibilityManager/VisibilityManagerContext";

export interface DropdownItemInterface<CODE extends string | number> extends ListItemInterface<CODE> {}

function DropdownItem<CODE extends string | number>(props: DropdownItemInterface<CODE>) {
  const { hide } = React.useContext(VisibilityManagerContext);

  return <ListItem {...props} onAfterClick={hide} />;
}

export default React.memo(DropdownItem) as <CODE extends string | number>(
  props: DropdownItemInterface<CODE>,
) => JSX.Element;
