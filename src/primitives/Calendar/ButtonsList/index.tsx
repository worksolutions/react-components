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
        styles={[
          disableOutline,
          borderNone,
          width(80),
          height(44),
          borderRadius(6),
          backgroundColor("definitions.Calendar.ButtonsList.Selected.backgroundColor"),
        ]}
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
        backgroundColor("white"),
        transition(`box-shadow ${duration160}, background-color ${duration160}`),
        border(1, "definitions.Calendar.ButtonsList.Unselected.borderColor"),
        hover(backgroundColor("definitions.Calendar.ButtonsList.Unselected.hoverBackgroundColor")),
        focus(boxShadow([0, 0, 0, 2, "definitions.Calendar.ButtonsList.Unselected.focusBorderColor"])),
      ]}
      onClick={onClick}
    >
      <Typography color="definitions.Calendar.ButtonsList.Unselected.textColor">{value}</Typography>
    </Wrapper>
  );
}, makeExcludingDeepEqual(["onClick"]));

function ButtonsList({ items, selectedItemIndex, onClick }: ButtonsListInterface) {
  const { run, scrollRef, scrollToElementRef } = useScrollToElement(true);
  React.useEffect(run, [run]);

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
      {items.map((item, index) => {
        if (isNil(item)) return null;

        if (selectedItemIndex === index) return <SelectedItem key={item} ref={scrollToElementRef} value={item} />;

        return <UnselectedItem key={item} value={item} onClick={() => onClick(index)} />;
      })}
    </Wrapper>
  );
}

export default React.memo(ButtonsList);
