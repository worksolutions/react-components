import React from "react";
import { isString, stopPropagation } from "@worksolutions/utils";
import { prop } from "ramda";

import Icon, { Icons } from "../../Icon";
import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { getNeedShowChildElements, getNewActiveElements } from "./internalLibs";

export type RecursiveTreeItemHandlers = {
  onChange: (selectedItemIds: number[], id: number, selected: boolean) => void;
};

type RecursiveTreeItemInternalProps = {
  activeIds: number[];
} & RecursiveTreeItemHandlers;

export type RecursiveTreeItem = {
  id: number;
  level: number;
  text: string;
  icon?: JSX.Element | Icons;
  action?: JSX.Element | Icons;
  items?: RecursiveTreeItem[];
  parentId: number | null;
};

export type RecursiveTreeItemWithSelected = RecursiveTreeItem & { selected: boolean };

const ONE_DEEP_LEVEL_LEFT_MARGIN = 28;

function useIcon(icon?: JSX.Element | Icons) {
  return React.useMemo(() => (isString(icon) ? <Icon icon={icon} /> : icon), [icon]);
}

function RecursiveTreeItemComponent({
  text,
  id,
  selected,
  activeIds,
  items = [],
  icon: iconProp,
  action: actionProp,
  level,
  onChange,
}: RecursiveTreeItemWithSelected & RecursiveTreeItemInternalProps) {
  const resultItems = React.useMemo(() => items.map(renderItem({ activeIds, onChange })), [activeIds, items, onChange]);

  const needShowChildElements = React.useMemo(() => getNeedShowChildElements(selected, resultItems), [
    resultItems,
    selected,
  ]);

  const onChangeHandler = React.useCallback(
    stopPropagation(() => {
      const { newSelected, newActiveIds } = getNewActiveElements(id, selected, activeIds);
      onChange(newActiveIds, id, newSelected);
    }),
    [onChange, selected, activeIds],
  );

  const icon = useIcon(iconProp);
  const action = useIcon(actionProp);

  return (
    <>
      <Wrapper style={{ marginLeft: ONE_DEEP_LEVEL_LEFT_MARGIN * level }} onClick={onChangeHandler}>
        {icon}
        <Typography>{text}</Typography>
        {selected && action}
      </Wrapper>
      {needShowChildElements && <Wrapper>{resultItems.map(prop("element"))}</Wrapper>}
    </>
  );
}

const renderItem = (config: RecursiveTreeItemInternalProps) => ({ id, ...item }: RecursiveTreeItem) => {
  const selected = config.activeIds.includes(id);

  return {
    selected,
    element: <RecursiveTreeItemComponent key={id} id={id} selected={selected} {...config} {...item} />,
  };
};

export type RenderItemResult = ReturnType<ReturnType<typeof renderItem>>;

export default renderItem;
