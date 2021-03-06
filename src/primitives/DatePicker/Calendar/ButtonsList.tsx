import React, { Ref } from "react";
import { isNil } from "ramda";
import { useScrollToElement } from "@worksolutions/react-utils";
import { makeExcludingDeepEqual } from "@worksolutions/utils";

import {
  alignContent,
  backgroundColor,
  border,
  borderNone,
  borderRadius,
  boxShadow,
  child,
  disableOutline,
  flex,
  flexWrap,
  focus,
  height,
  horizontalMargin,
  hover,
  marginBottom,
  marginRight,
  maxHeight,
  overflowY,
  paddingLeft,
  paddingRight,
  pointer,
  transition,
  width,
} from "../../../styles";

import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { duration160 } from "../../../constants/durations";

interface ButtonsListInterface {
  items: (string | number | null)[];
  selectedItemIndex: number | null;
  onClick: (index: number) => void;
}

const SelectedItem = React.memo(
  React.forwardRef(function ({ value }: { value: string | number }, ref: Ref<HTMLElement>) {
    return (
      <Wrapper
        ref={ref}
        as="button"
        styles={[disableOutline, borderNone, width(80), height(44), borderRadius(6), backgroundColor("blue/05")]}
      >
        <Typography color="white">{value}</Typography>
      </Wrapper>
    );
  }),
);

const UnselectedItem = React.memo(function ({ value, onClick }: { value: string | number; onClick: () => void }) {
  return (
    <Wrapper
      as="button"
      styles={[
        pointer,
        disableOutline,
        width(80),
        height(44),
        borderRadius(6),
        border(1, "gray-blue/02"),
        backgroundColor("white"),
        transition(`box-shadow ${duration160}, background-color ${duration160}`),
        hover(backgroundColor("gray-blue/01")),
        focus(boxShadow([0, 0, 0, 2, "blue/04"])),
      ]}
      onClick={onClick}
    >
      <Typography color="gray-blue/07">{value}</Typography>
    </Wrapper>
  );
}, makeExcludingDeepEqual(["onClick"]));

function ButtonsList({ items, selectedItemIndex, onClick }: ButtonsListInterface) {
  const { run, scrollRef, scrollToElementRef } = useScrollToElement(true);
  React.useEffect(run, []);

  return (
    <Wrapper
      ref={scrollRef}
      styles={[
        maxHeight(256),
        flex,
        flexWrap,
        overflowY("auto"),
        alignContent("flex-start"),
        paddingLeft(20),
        paddingRight(8),
        marginRight(4),
        child([marginBottom(8), horizontalMargin(4)]),
      ]}
    >
      {items.map((item, index) =>
        isNil(item) ? null : selectedItemIndex === index ? (
          <SelectedItem key={item} ref={scrollToElementRef} value={item} />
        ) : (
          <UnselectedItem key={item} value={item} onClick={() => onClick(index)} />
        ),
      )}
    </Wrapper>
  );
}

export default React.memo(ButtonsList);
