import React, { useCallback, useEffect } from "react";
import { Popper } from "react-popper";
import Wrapper from "../Wrapper";
import Arrow from "./Arrow";
import { backgroundColor, border, borderRadius, boxShadow, padding } from "../../styles";
import { elevation16Raw } from "../../constants/shadows";
import { useForceUpdate } from "@worksolutions/react-utils";

function getPopperStyles() {
  return [
    border(1, "definitions.Popper.border", "solid"),
    backgroundColor("white"),
    boxShadow(...elevation16Raw, [0, 0, 0, 1, "definitions.Popper.boxShadow"]),
    borderRadius(6),
    padding(8),
  ];
}

function PopperElement({
  offset,
  placement,
  popperElement,
  toggleVisible,
  visible,
  popperStyles,
  modifiers,
  arrowPadding,
  arrowElem,
  useArrow,
}: any) {
  const resultPopperStyles = useCallback(() => popperStyles || getPopperStyles(), [popperStyles]);

  return (
    <Popper
      placement={placement}
      modifiers={[
        // @ts-ignore
        ...modifiers,
        {
          name: "offset",
          options: { offset: () => offset },
        },
      ]}
    >
      {({ ref, style, placement, arrowProps }) => (
        <Wrapper ref={ref} style={style} data-placement={placement} styles={resultPopperStyles}>
          {popperElement(toggleVisible, visible)}
          {useArrow && (
            <Arrow arrowProps={arrowProps} placement={placement} arrowPadding={arrowPadding} arrowElem={arrowElem} />
          )}
        </Wrapper>
      )}
    </Popper>
  );
}

export default React.memo(PopperElement);
