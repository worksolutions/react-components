import React from "react";
import { Resizable } from "re-resizable";
import throttle from "lodash/throttle";
import { useBoolean, useEffectSkipFirst, useSyncToRef } from "@worksolutions/react-utils";
import { preventDefaultAndStopPropagationHandler } from "@worksolutions/utils";

import {
  absoluteCenter,
  active,
  backgroundColor,
  child,
  cursor,
  fullHeight,
  horizontalPadding,
  hover,
  opacity,
  transform,
  transition,
  visibility,
  width,
  zIndex,
} from "../../styles";

import Wrapper from "../Wrapper";
import Button, { ButtonSize, ButtonType } from "../Button";
import { duration160, duration60 } from "../../constants/durations";
import { elevation16 } from "../../constants/shadows";

export interface ResizerInterface {
  resizerContainerStyles?: any;
  childrenWrapperStyles?: any;
  initialWidth: number;
  minWidth?: number;
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

  const handleResizeEnd = React.useCallback(() => {
    const width = getResizeContainerWidth();
    if (width > autoCloseWidth) {
      updateWidth(width);
      endDragging();
      return;
    }

    updateWidth(minWidth);
  }, [autoCloseWidth, endDragging, minWidth]);

  const closed = childrenWrapperWidth < autoCloseWidth;

  const handleComponent = React.useMemo(() => {
    const showArrowStyle = child([visibility("visible"), opacity(1)], ".resizer-arrow");

    const right = (
      <Wrapper
        styles={[
          fullHeight,
          width("100%"),
          horizontalPadding(5),
          cursor("col-resize"),
          hover([
            child([backgroundColor("definitions.Resizer.Border.hoverColor")], ".resizer-divider"),
            showArrowStyle,
          ]),
          active([
            child(backgroundColor("definitions.Resizer.Border.activeColor"), ".resizer-divider"),
            showArrowStyle,
          ]),
        ]}
      >
        <Wrapper
          className="resizer-divider"
          styles={[
            transition(`background-color ${duration160}`),
            backgroundColor("definitions.Resizer.Border.color"),
            fullHeight,
            width(1),
          ]}
        />
        <Button
          ref={arrowButtonInit}
          className="resizer-arrow"
          styles={[
            zIndex(999999),
            backgroundColor("definitions.Resizer.ArrowButton.backgroundColor"),
            elevation16,
            opacity(0),
            visibility("hidden"),
            transition(`visibility ${duration160}, opacity ${duration160}, background-color ${duration160}`),
            absoluteCenter,
            child(
              [
                transition(`transform ${duration160}`),
                closed ? transform("rotate(180deg)") : transform("rotate(0deg)"),
              ],
              "svg",
            ),
          ]}
          size={ButtonSize.MEDIUM}
          type={ButtonType.ICON}
          iconLeft="arrow-left"
        />
      </Wrapper>
    );

    return { right };
  }, [arrowButtonInit, closed]);

  return (
    <Resizable
      ref={resizableRef}
      defaultSize={{ width: initialWidth, height: "auto" }}
      minWidth={minWidth}
      as={Wrapper}
      handleComponent={handleComponent}
      enable={{ right: true }}
      // @ts-ignore
      styles={[resizerContainerStyles, transition(`width ${duration60}`)]}
      onResizeStart={handleResizeStart}
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
