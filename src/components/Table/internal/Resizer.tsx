import React, { SyntheticEvent } from "react";
import { update } from "ramda";
import { preventDefaultAndStopPropagationHandler } from "@worksolutions/utils";

import Wrapper from "../../../primitives/Wrapper";
import {
  backgroundColor,
  bottom,
  cursor,
  flex,
  fullHeight,
  hover,
  jc,
  left,
  marginLeft,
  opacity,
  position,
  top,
  transition,
  width,
} from "../../../styles";
import { duration120 } from "../../../constants/durations";

interface TableResizerInterface {
  cellLeftsInPixels: number[];
  setCellLeftsInPixels: (lefts: number[]) => void;
}

function TableResizer({ cellLeftsInPixels, setCellLeftsInPixels }: TableResizerInterface) {
  const handleCellLeftUpdate = React.useCallback(
    (index: number) => (newLeft: number) => setCellLeftsInPixels(update(index, newLeft, cellLeftsInPixels)),
    [cellLeftsInPixels, setCellLeftsInPixels],
  );

  return (
    <>
      {cellLeftsInPixels.slice(0, -1).map((cellLeft, index) => (
        <TableResizerLine key={index} cellLeft={cellLeft} onUpdate={handleCellLeftUpdate(index)} />
      ))}
    </>
  );
}

export default TableResizer;

function TableResizerLine({ cellLeft, onUpdate }: { cellLeft: number; onUpdate: (newLeft: number) => void }) {
  const handleMouseDown = React.useCallback(
    (event: SyntheticEvent<HTMLElement, MouseEvent>) => {
      const element = event.currentTarget;
      let initialLeft = parseFloat(getComputedStyle(element).left);
      const mouseMoveListener = (ev: MouseEvent) => {
        preventDefaultAndStopPropagationHandler(ev);
        initialLeft += ev.movementX;
        element.style.left = initialLeft + "px";
      };

      const mouseUpListener = () => {
        document.removeEventListener("mouseup", mouseUpListener);
        document.removeEventListener("mousemove", mouseMoveListener);
        onUpdate(initialLeft);
        element.style.left = null!;
      };

      document.addEventListener("mouseup", mouseUpListener);
      document.addEventListener("mousemove", mouseMoveListener);
    },
    [onUpdate],
  );

  return (
    <Wrapper
      styles={[
        position("absolute"),
        left(cellLeft),
        top(0),
        bottom(0),
        width(16),
        marginLeft(-8),
        cursor("ew-resize"),
        flex,
        jc("center"),
        transition(`opacity ${duration120}`),
        opacity(0),
        hover(opacity(1)),
      ]}
      onMouseDown={handleMouseDown}
    >
      <Wrapper styles={[fullHeight, width(1), backgroundColor("definitions.Table.ResizerLineColor")]} />
    </Wrapper>
  );
}
