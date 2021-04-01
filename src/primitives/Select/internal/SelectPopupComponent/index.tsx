import React, { ReactChildren } from "react";

import List from "../../../List";
import { SelectItemCode, SelectItemInterface } from "../../SelectItem";
import { maxHeight, overflow } from "../../../../styles";

interface SelectPopupComponentInterface<CODE extends SelectItemCode> {
  children: ReturnType<ReactChildren["toArray"]>;
  selectedItemCode: CODE;
  loading?: boolean;
  popupTopElement?: React.ReactNode;
  popupBottomElement?: React.ReactNode;
  onChange: (newSelectedCode: CODE, newSelected: boolean) => void;
}

function SelectPopupComponent<CODE extends SelectItemCode>({
  children,
  selectedItemCode,
  loading,
  popupTopElement,
  popupBottomElement,
  onChange,
}: SelectPopupComponentInterface<CODE>) {
  const handleClickFabric = React.useCallback(
    (code: CODE, currentSelected: boolean) => () => selectedItemCode !== code && onChange(code, !currentSelected),
    [onChange, selectedItemCode],
  );

  return (
    <List
      loading={loading}
      topElement={popupTopElement}
      bottomElement={popupBottomElement}
      outerStyles={maxHeight("inherit")}
      styles={[maxHeight("inherit"), overflow("auto")]}
    >
      {(children as React.ReactElement<SelectItemInterface<CODE>>[]).map((element) => {
        if (!checkIsSelectItem(element)) return element;
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

export function checkIsSelectItem(element: React.ReactElement<SelectItemInterface<any>>) {
  if (!element.hasOwnProperty("props")) return false;
  if (!element.props.hasOwnProperty("code")) return false;

  return true;
}

export default React.memo(SelectPopupComponent) as <CODE extends SelectItemCode>(
  props: SelectPopupComponentInterface<CODE>,
) => JSX.Element;
