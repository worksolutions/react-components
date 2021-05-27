import React, { ReactChildren } from "react";

import List from "../../../List";
import { SelectItemCode, SelectItemInterface } from "../../SelectItem";
import { maxHeight } from "../../../../styles";

interface SelectPopupListInterface<CODE extends SelectItemCode> {
  children: ReturnType<ReactChildren["toArray"]>;
  selectedItemCode: CODE;
  loading?: boolean;
  popupTopElement?: React.ReactNode;
  popupBottomElement?: React.ReactNode;
  onChange: (newSelectedCode: CODE, newSelected: boolean) => void;
}

function SelectPopupList<CODE extends SelectItemCode>(
  {
    children,
    selectedItemCode,
    loading,
    popupTopElement,
    popupBottomElement,
    onChange,
  }: SelectPopupListInterface<CODE>,
  scrollableElementRef: React.Ref<HTMLElement>,
) {
  const handleClickFabric = React.useCallback(
    (code: CODE, currentSelected: boolean) => () => selectedItemCode !== code && onChange(code, !currentSelected),
    [onChange, selectedItemCode],
  );

  return (
    <List
      ref={scrollableElementRef}
      loading={loading}
      topElement={popupTopElement}
      bottomElement={popupBottomElement}
      outerStyles={maxHeight("inherit")}
    >
      {(children as React.ReactElement<SelectItemInterface<CODE>>[]).map((element) => {
        if (!detectIsSelectItem(element)) return element;
        const selected = selectedItemCode === element.props.code;
        return (
          <element.type
            key={element.props.code}
            {...element.props}
            hoverable
            selected={selected}
            onClick={handleClickFabric(element.props.code, selected)}
          />
        );
      })}
    </List>
  );
}

export default React.memo(React.forwardRef(SelectPopupList)) as <CODE extends SelectItemCode>(
  props: SelectPopupListInterface<CODE> & { ref?: React.Ref<HTMLElement> },
) => JSX.Element;

export function detectIsSelectItem(element: React.ReactElement<SelectItemInterface<any>>) {
  if (!element.hasOwnProperty("props")) return false;
  if (!element.props.hasOwnProperty("code")) return false;

  return true;
}
