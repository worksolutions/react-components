import React from "react";
import { Resizable } from "re-resizable";
import throttle from "lodash/throttle";
import { useBoolean, useEffectSkipFirst, useSyncToRef } from "@worksolutions/react-utils";
import { preventDefaultAndStopPropagationHandler } from "@worksolutions/utils";

import { opacity, transition, width } from "../../styles";

import Wrapper from "../Wrapper";
import { duration160, duration60 } from "../../constants/durations";
import RightSide from "./RightSide";

export interface ResizerInterface {
  resizerContainerStyles?: any;
  childrenWrapperStyles?: any;
  initialWidth: number;
  minWidth?: number;
  maxWidth?: number | string;
  autoCloseWidth?: number;
  children: React.ReactNode;
  onSizeUpdate: (width: number) => void;
}

function Resizer({
  resizerContainerStyles,
  childrenWrapperStyles,
  initialWidth,
  minWidth = 24,
  autoCloseWidth = 72,
  maxWidth = "100%",
  children,
  onSizeUpdate,
}: ResizerInterface) {
  const minWidthRef = useSyncToRef(minWidth);
  const autoCloseWidthRef = useSyncToRef(autoCloseWidth);
  const initialWidthRef = useSyncToRef(initialWidth);

  const resizableRef = React.useRef<InstanceType<typeof Resizable>>(null);
  const [childrenWrapperWidth, setChildrenWrapperWidth] = React.useState(initialWidth);

  useEffectSkipFirst(() => onSizeUpdate(childrenWrapperWidth), [childrenWrapperWidth, onSizeUpdate]);

  const getResizeContainerWidth = () => resizableRef.current!.resizable!.getBoundingClientRect().width;
  const updateWidth = (width: number) => {
    setChildrenWrapperWidth(width);
    resizableRef.current!.updateSize({ width, height: "auto" });
  };

  const [dragging, startDragging, endDragging] = useBoolean(false);
  const draggingRef = useSyncToRef(dragging);

  const arrowButtonInit = React.useCallback(
    (ref: HTMLElement | null) => {
      if (!ref) return;
      ref.addEventListener("mousedown", preventDefaultAndStopPropagationHandler);
      ref.addEventListener("click", preventDefaultAndStopPropagationHandler);
      ref.addEventListener("mouseup", async function (event) {
        preventDefaultAndStopPropagationHandler(event);
        const closed = getResizeContainerWidth() < autoCloseWidthRef.current;
        if (closed) {
          updateWidth(
            initialWidthRef.current === minWidthRef.current ? autoCloseWidthRef.current : initialWidthRef.current,
          );
          return;
        }

        updateWidth(minWidthRef.current);
      });
    },
    [autoCloseWidthRef, initialWidthRef, minWidthRef],
  );

  const handleResizeStart = React.useCallback(startDragging, [startDragging]);

  const handleResize = React.useMemo(() => {
    return throttle(
      () => {
        if (!draggingRef.current) return;
        const width = getResizeContainerWidth();
        setChildrenWrapperWidth(width < autoCloseWidthRef.current ? minWidthRef.current : autoCloseWidthRef.current);
      },
      100,
      { trailing: true },
    );
  }, [autoCloseWidthRef, draggingRef, minWidthRef]);

  const handleResizeEnd = React.useCallback(() => {
    endDragging();
    const width = getResizeContainerWidth();
    updateWidth(width > autoCloseWidth ? width : minWidth);
  }, [autoCloseWidth, endDragging, minWidth]);

  const closed = childrenWrapperWidth < autoCloseWidth;

  const handleComponent = React.useMemo(
    () => ({ right: <RightSide arrowButtonInit={arrowButtonInit} closed={closed} /> }),
    [arrowButtonInit, closed],
  );

  return (
    <Resizable
      ref={resizableRef}
      maxWidth={maxWidth}
      defaultSize={{ width: initialWidth, height: "auto" }}
      minWidth={minWidth}
      as={Wrapper}
      handleComponent={handleComponent}
      enable={{ right: true }}
      // @ts-ignore
      styles={[resizerContainerStyles, transition(`width ${duration60}`)]}
      onResizeStart={handleResizeStart}
      onResize={handleResize}
      onResizeStop={handleResizeEnd}
    >
      <Wrapper
        styles={[
          transition(`visibility ${duration160}, opacity ${duration160}, background-color ${duration160}`),
          closed ? opacity(0) : opacity(1),
          !dragging && width(childrenWrapperWidth),
          childrenWrapperStyles,
        ]}
      >
        {children}
      </Wrapper>
    </Resizable>
  );
}

export default React.memo(Resizer);
