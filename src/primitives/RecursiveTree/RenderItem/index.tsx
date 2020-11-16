import React, { CSSProperties } from "react";
import { isString, stopPropagation } from "@worksolutions/utils";
import { prop } from "ramda";

import Icon, { Icons } from "../../Icon";
import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { getNeedShowChildElements, getNewActiveElements } from "./internalLibs";
import {
  ai,
  backgroundColor,
  borderNone,
  borderRadius,
  boxShadow,
  disableOutline,
  flex,
  flexColumn,
  flexValue,
  focus,
  height,
  horizontalPadding,
  hover,
  lastChild,
  marginBottom,
  marginLeft,
  marginRight,
  minHeight,
  pointer,
  transition,
} from "../../../styles";
import { duration160 } from "../../../constants/durations";

export type RecursiveTreeItemHandlers = {
  onChange: (selectedItemIds: number[], id: number, selected: boolean) => void;
};

type RecursiveTreeItemInternalProps = {
  activeIds: number[];
  useItemInnerPadding: boolean;
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

const ONE_DEEP_LEVEL_LEFT_MARGIN = 32;

function useIcon(icon?: JSX.Element | Icons, styles?: any) {
  return React.useMemo(
    () => icon && <Wrapper styles={styles}>{isString(icon) ? <Icon icon={icon} color="blue/09" /> : icon}</Wrapper>,
    [icon],
  );
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
  useItemInnerPadding,
  onChange,
}: RecursiveTreeItemWithSelected & RecursiveTreeItemInternalProps) {
  const resultItems = React.useMemo(() => items.map(renderItem({ activeIds, onChange, useItemInnerPadding })), [
    activeIds,
    items,
    onChange,
  ]);

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

  const icon = useIcon(iconProp, marginRight(8));
  const action = useIcon(actionProp, marginLeft(8));

  const wrapperStyle = React.useMemo((): CSSProperties => {
    const levelMargin = ONE_DEEP_LEVEL_LEFT_MARGIN * level;

    return useItemInnerPadding ? { paddingLeft: levelMargin + 8 } : { marginLeft: levelMargin };
  }, [useItemInnerPadding]);

  return (
    <>
      <Wrapper
        as="button"
        styles={[
          flex,
          ai("center"),
          disableOutline,
          backgroundColor("transparent"),
          borderNone,
          ai("center"),
          pointer,
          minHeight(32),
          height(32),
          borderRadius(6),
          horizontalPadding(8),
          transition(`background-color ${duration160}, box-shadow ${duration160}`),
          marginBottom(4),
          flexValue(1),
          lastChild([marginBottom(0)], "&"),
          focus([boxShadow([0, 0, 0, 2, "blue/04"])]),
          selected
            ? [backgroundColor("gray-blue/02"), hover(backgroundColor("gray-blue/03"))]
            : [hover(backgroundColor("gray-blue/02"))],
        ]}
        style={wrapperStyle}
        onClick={onChangeHandler}
      >
        {icon}
        <Typography>{text}</Typography>
        {selected && action}
      </Wrapper>
      {needShowChildElements && <Wrapper styles={[flex, flexColumn]}>{resultItems.map(prop("element"))}</Wrapper>}
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
