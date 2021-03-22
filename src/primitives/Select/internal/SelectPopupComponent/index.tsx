import React from "react";

import List from "../../../List";
import { SelectItemCode, SelectItemInterface } from "../../SelectItem";

export type SelectPopupAvailableChildren<CODE extends SelectItemCode> = React.ReactElement<SelectItemInterface<CODE>>[];

interface SelectPopupComponentInterface<CODE extends SelectItemCode> {
  children: SelectPopupAvailableChildren<CODE>;
  selectedItemCode: CODE;
  onChange: (newSelectedCode: CODE, newSelected: boolean) => void;
}

function SelectPopupComponent<CODE extends SelectItemCode>({
  children,
  selectedItemCode,
  onChange,
}: SelectPopupComponentInterface<CODE>) {
  const handleClickFabric = React.useCallback(
    (code: CODE, currentSelected: boolean) => () => onChange(code, !currentSelected),
    [onChange],
  );

  return (
    <List>
      {(React.Children.toArray(children) as SelectPopupAvailableChildren<CODE>).map((element, index: number) => {
        const selected = selectedItemCode === element.props.code;
        return React.cloneElement(element, {
          key: element.props.code,
          hoverable: true,
          selected,
          onClick: handleClickFabric(element.props.code, selected),
        });
      })}
    </List>
  );
}

export default React.memo(SelectPopupComponent) as <CODE extends SelectItemCode>(
  props: SelectPopupComponentInterface<CODE>,
) => JSX.Element;
