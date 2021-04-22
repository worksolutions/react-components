import React from "react";

import ListItem, { ListItemInterface } from "../../List/ListItem";

export type SelectItemCode = string | number | null | undefined;

export interface SelectItemInterface<CODE extends SelectItemCode> extends Omit<ListItemInterface, "onClick"> {
  code: CODE;
  onClick?: (code: CODE) => void;
}

function SelectItem<CODE extends SelectItemCode>({ code, selected, onClick, ...props }: SelectItemInterface<CODE>) {
  const handleClick = React.useCallback(() => onClick && onClick(code), [code, onClick]);
  return <ListItem {...props} selected={selected} onClick={handleClick} />;
}

export default React.memo(SelectItem) as <CODE extends SelectItemCode>(props: SelectItemInterface<CODE>) => JSX.Element;
