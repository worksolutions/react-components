import React from "react";
import { propEq } from "ramda";
import { observer } from "mobx-react-lite";

import {
  ai,
  backgroundColor,
  borderLeftRadius,
  borderRadius,
  borderRightRadius,
  boxShadow,
  flex,
  focus,
  fullHeight,
  margin,
  position,
  transform,
  transition,
  whiteSpace,
  width,
  zIndex,
} from "../../styles";
import SelectItem from "../../primitives/Select/SelectItem";

import { SortingDirection, SortingID, SortingItem } from "./types";
import PopupManager, { PopupManagerMode, PopupManagerRef } from "../../primitives/PopupManager";
import { elevation16Raw } from "../../constants/shadows";
import { duration160 } from "../../constants/durations";
import SelectPopupList from "../../primitives/Select/internal/SelectPopupList";
import Wrapper from "../../primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "../../primitives/Button";
import { ListItemSize } from "../../primitives/List/ListItem/enum";
import { secondaryStyleBoxShadow } from "../../primitives/Button/styles/types/secondary";

export interface SelectedSortingItem {
  id: SortingID;
  direction?: SortingDirection | null;
}

export interface SortingInterface {
  styles?: any;
  defaultDirectionAfterChange?: SortingDirection;
  selected: SelectedSortingItem;
  items: SortingItem[];
  listItemSize?: ListItemSize;
  buttonSize?: ButtonSize;
  onChange: (item: SelectedSortingItem) => void;
}

function findItemById(items: SortingItem[], id: SortingID) {
  return items.find(propEq("id", id))!;
}

function Sorting({
  styles,
  items,
  selected,
  defaultDirectionAfterChange = SortingDirection.ASC,
  listItemSize = ListItemSize.MEDIUM,
  buttonSize = ButtonSize.MEDIUM,
  onChange,
}: SortingInterface) {
  const selectedItem = React.useMemo(() => findItemById(items, selected.id), [items, selected.id]);
  const popupManagerRef = React.useRef<PopupManagerRef>(null!);

  const handleChange = React.useCallback(
    (id: SortingID) => {
      const item = findItemById(items, id);
      if (item === selectedItem) return;
      popupManagerRef.current.hide();

      onChange({
        id: item.id,
        direction: item.hasDirection ? defaultDirectionAfterChange : null,
      });
    },
    [defaultDirectionAfterChange, items, onChange, selectedItem],
  );

  const popupElement = (
    <SelectPopupList selectedItemCode={selectedItem.id} onChange={handleChange}>
      {items.map((item) => (
        <SelectItem
          key={item.id}
          code={item.id}
          size={listItemSize}
          rightContent={selectedItem.id === item.id ? "check" : undefined}
        >
          {item.title}
        </SelectItem>
      ))}
    </SelectPopupList>
  );

  const toggleDirection = React.useCallback(() => {
    onChange({
      id: selectedItem.id,
      direction: selected.direction === SortingDirection.ASC ? SortingDirection.DESC : SortingDirection.ASC,
    });
  }, [onChange, selected.direction, selectedItem.id]);

  const directionButtonConfigForButtonSize =
    buttonSize === ButtonSize.LARGE ? { margin: 2, iconSize: 20 } : { margin: 3, iconSize: 18 };

  return (
    <PopupManager
      ref={popupManagerRef}
      primaryPlacement="bottom-start"
      mode={PopupManagerMode.CLICK}
      popupStyles={[
        backgroundColor("definitions.Popup.backgroundColor"),
        boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Popup.borderColor"]),
        borderRadius(4),
      ]}
      popupElement={popupElement}
      renderTriggerElement={({ initRef }) => (
        <Wrapper styles={[flex, ai("flex-end"), position("relative"), styles]}>
          <Button
            ref={initRef}
            styles={[whiteSpace("nowrap"), selectedItem.hasDirection && borderRightRadius(0), focus(zIndex(1))]}
            type={ButtonType.SECONDARY}
            size={buttonSize}
          >
            {selectedItem.title}
          </Button>
          {selectedItem.hasDirection && (
            <>
              <Wrapper styles={[fullHeight, width(1), backgroundColor("definitions.ButtonSecondary.borderColor")]} />
              <Button
                styles={[borderLeftRadius(0), secondaryStyleBoxShadow, focus(zIndex(1))]}
                iconLeft={selected.direction ? "16-sort-asc" : "16-alert-alt"}
                iconLeftStyles={[
                  margin(directionButtonConfigForButtonSize.margin),
                  transition(`all ${duration160}`),
                  selectedItem.hasDirection &&
                    selected.direction &&
                    transform(selected.direction === SortingDirection.ASC ? "scaleY(1)" : "scaleY(-1)"),
                ]}
                iconLeftWidth={directionButtonConfigForButtonSize.iconSize}
                iconLeftHeight={directionButtonConfigForButtonSize.iconSize}
                type={ButtonType.ICON}
                size={buttonSize}
                onClick={toggleDirection}
              />
            </>
          )}
        </Wrapper>
      )}
    />
  );
}

const ObservedElement = observer(Sorting);

// @ts-ignore
ObservedElement.baseElement = Sorting;

export default ObservedElement;
