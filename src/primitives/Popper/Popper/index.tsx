import * as React from "react";
// import { usePopper } from "./usePopper";
import {
  State,
  Placement,
  PositioningStrategy,
  VirtualElement,
  StrictModifiers,
  Modifier,
  createPopper,
} from "@popperjs/core/lib";
import { ManagerReferenceNodeContext } from "../Manager";
import { setRef, unwrapArray } from "../utils";
import { Ref } from "react";

type ReferenceElement = VirtualElement | HTMLElement;
type Modifiers = Array<StrictModifiers | Modifier<any, any>>;

export type PopperArrowProps = {
  ref: Ref<any>;
  style: CSSStyleDeclaration;
};
export type PopperChildrenProps = {
  ref: Ref<any>;
  style: CSSStyleDeclaration;

  placement: Placement;
  isReferenceHidden?: boolean;
  hasPopperEscaped?: boolean;

  update: () => Promise<null | State>;
  forceUpdate: () => void;
  arrowProps: PopperArrowProps;
};
export type PopperChildren = (PopperChildrenProps: any) => React.ReactNode;

export type PopperProps = {
  children: PopperChildren;
  innerRef?: Ref<any>;
  modifiers?: Modifiers;
  placement?: Placement;
  strategy?: PositioningStrategy;
  referenceElement?: ReferenceElement;
  onFirstUpdate?: (a: State) => void;
};

const NOOP = () => void 0;
const NOOP_PROMISE = () => Promise.resolve(null);
const EMPTY_MODIFIERS: any = [];

export function Popper({
  placement = "bottom",
  strategy = "absolute",
  modifiers = EMPTY_MODIFIERS,
  referenceElement,
  onFirstUpdate,
  innerRef,
  children,
}: PopperProps) {
  const referenceNode = React.useContext(ManagerReferenceNodeContext);

  const [popperElement, setPopperElement] = React.useState(null);
  const [arrowElement, setArrowElement] = React.useState(null);

  React.useEffect(() => {
    setRef(innerRef, popperElement!);
  }, [innerRef, popperElement]);

  const options = React.useMemo(
    () => ({
      placement,
      strategy,
      onFirstUpdate,
      modifiers: [
        ...modifiers,
        {
          name: "arrow",
          enabled: arrowElement != null,
          options: { element: arrowElement },
        },
      ],
    }),
    [placement, strategy, onFirstUpdate, modifiers, arrowElement],
  );

  const { state, forceUpdate, update } = createPopper(
    referenceElement || (referenceNode as any),
    popperElement as any,
    options as any,
  );
  console.log({ state, forceUpdate, update });

  const childrenProps = React.useMemo(
    () => ({
      ref: setPopperElement,
      style: state.styles.popper,
      placement: state ? state.placement : placement,
      hasPopperEscaped: state && state.modifiersData.hide ? state.modifiersData.hide.hasPopperEscaped : null,
      isReferenceHidden: state && state.modifiersData.hide ? state.modifiersData.hide.isReferenceHidden : null,
      arrowProps: {
        style: state.styles.arrow,
        ref: setArrowElement,
      },
      forceUpdate: forceUpdate || NOOP,
      update: update || NOOP_PROMISE,
    }),
    [setPopperElement, setArrowElement, placement, state, update, forceUpdate],
  );

  return unwrapArray(children)(childrenProps);
}
