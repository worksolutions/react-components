import React, { Ref } from "react";
import { provideRef, useVanillaPopper } from "@worksolutions/react-utils";
import { Modifier, Options, Placement, PositioningStrategy, State } from "@popperjs/core/lib";

import { ManagerReferenceNodeContext } from "../Manager";

import { getFirstIfArray } from "../utils";

type ReferenceElement = HTMLElement;

export interface PopperArrowProps {
  ref: React.Ref<any>;
  style?: Partial<CSSStyleDeclaration | null>;
}

export type PopperChildrenProps = {
  ref: Ref<any>;
  style?: Partial<CSSStyleDeclaration | undefined>;
  placement: Placement;
  isReferenceHidden?: boolean | null;
  hasPopperEscaped?: boolean | null;
  update: (() => Promise<Partial<State>>) | null;
  forceUpdate: () => void;
  arrowProps: PopperArrowProps;
};

type Modifiers = Array<Partial<Modifier<any, any>>>;
export type PopperChildren = (popperChildrenProps: PopperChildrenProps) => React.ReactNode;

export type PopperProps = {
  children: PopperChildren;
  innerRef?: Ref<any>;
  modifiers?: Modifiers;
  placement?: Placement;
  strategy?: PositioningStrategy;
  referenceElement?: ReferenceElement;
  onFirstUpdate?: (arg0: Partial<State>) => void;
};

const noop: any = () => {};
const noopPromise: any = () => Promise.resolve(null);
const EMPTY_MODIFIERS: Modifiers = [];

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
    provideRef(innerRef)(popperElement!);
  }, [innerRef, popperElement]);

  const options: Options = React.useMemo(
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

  const { state, forceUpdate, update } = useVanillaPopper(referenceElement || referenceNode, popperElement, options);

  const childrenProps: PopperChildrenProps = React.useMemo(
    () => ({
      ref: setPopperElement,
      style: state?.styles?.popper,
      placement: state ? state.placement : placement,
      hasPopperEscaped: state && state.modifiersData.hide ? state.modifiersData.hide.hasPopperEscaped : null,
      isReferenceHidden: state && state.modifiersData.hide ? state.modifiersData.hide.isReferenceHidden : null,
      arrowProps: {
        style: state?.styles?.arrow,
        ref: setArrowElement,
      },
      forceUpdate: forceUpdate || noop,
      update: update || noopPromise,
    }),
    [setPopperElement, setArrowElement, placement, state, update, forceUpdate],
  );

  return getFirstIfArray(children)(childrenProps);
}
