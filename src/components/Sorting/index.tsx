import React from "react";
import { propEq } from "ramda";
import { observer } from "mobx-react-lite";

import Wrapper from "../../primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "../../primitives/Button";
import { ListItemId } from "../../primitives/List";
import Icon from "../../primitives/Icon";
import DroppedList from "../../primitives/List/DroppedList";

import {
  ai,
  backgroundColor,
  borderRadius,
  boxShadow,
  child,
  flex,
  focus,
  fullHeight,
  padding,
  position,
  transform,
  transition,
  width,
  zIndex,
} from "../../styles";

import { duration160 } from "../../constants/durations";

export interface SortingElementInterface {
  id: SortingID;
  direction?: SortingDirection | null;
}

export interface SortingInterface {
  styles?: any;
  selected: SortingElementInterface;
  items: SortingItem[];
  onChange: (id: SortingID, direction: SortingDirection | null) => void;
}

export enum SortingDirection {
  ASC = "asc",
  DESC = "desc",
}

export type SortingID = string | number;

export type SortingItem = { id: SortingID; title: string; hasDirection: boolean };

function findItem(items: SortingInterface["items"], id: ListItemId) {
  return items.find(propEq("id", id));
}

function Sorting({ items, selected, styles, onChange }: SortingInterface) {
  const originalSelectedElement = React.useMemo(() => findItem(items, selected.id), [selected])!;
  const listRef = React.useRef<HTMLElement>();

  return (
    <DroppedList
      ignoreClickOutsideElements={[listRef.current]}
      margin={8}
      items={items.map((item) => ({
        code: item.id,
        title: item.title,
        rightContent: originalSelectedElement.id === item.id ? <Icon icon="check" color="blue/06" /> : undefined,
      }))}
      onChange={(id, close) => {
        close();
        const item = findItem(items, id)!;
        if (item === originalSelectedElement) return;
        onChange(item.id, item.hasDirection ? SortingDirection.DESC : null);
      }}
    >
      {({ toggle }, parentRef, droppedList) => (
        <Wrapper ref={parentRef} styles={[flex, ai("flex-end"), position("relative"), styles]}>
          <Button
            styles={[
              boxShadow([0, 0, 0, 1, "gray-blue/02"]),
              originalSelectedElement.hasDirection && borderRadius("6px 0 0 6px"),
              focus(zIndex(1)),
            ]}
            type={ButtonType.SECONDARY}
            size={ButtonSize.MEDIUM}
            onClick={toggle}
          >
            {originalSelectedElement.title}
          </Button>
          {originalSelectedElement.hasDirection && (
            <>
              <Wrapper styles={[fullHeight, width(1), backgroundColor("gray-blue/02")]} />
              <Button
                styles={[
                  backgroundColor("white"),
                  boxShadow([0, 0, 0, 1, "gray-blue/02"]),
                  borderRadius("0 6px 6px 0"),
                  padding(8),
                  ai("center"),
                  focus(zIndex(1)),
                  child(
                    [
                      transition(`all ${duration160}`),
                      transform(selected.direction === SortingDirection.ASC ? "scale(1, -1)" : "rotateZ(0deg)"),
                    ],
                    ".icon",
                  ),
                ]}
                iconLeft="sort-desc"
                iconLeftWidth={16}
                iconLeftHeight={16}
                type={ButtonType.ICON}
                size={ButtonSize.MEDIUM}
                onClick={() => {
                  onChange(
                    originalSelectedElement.id,
                    selected.direction === SortingDirection.DESC ? SortingDirection.ASC : SortingDirection.DESC,
                  );
                }}
              />
            </>
          )}
          {droppedList}
        </Wrapper>
      )}
    </DroppedList>
  );
}

export default React.memo(observer(Sorting));
