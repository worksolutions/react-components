import React from "react";
import { provideRef } from "@worksolutions/react-utils";
import { CSSTransition } from "react-transition-group";

import Wrapper from "../../primitives/Wrapper";

import { AnimationState, getClassNameForTransitionGroup } from "./internal/libs";
import { animationDuration, child, flex, left, minHeight, minWidth, overflow, position } from "../../styles";

export interface TransitionSwapSlidesControllerInterface {
  toRight: () => void;
  toLeft: () => void;
  reset: (callback?: () => void) => void;
}

export interface TransitionSwapSlidesInterface {
  styles?: any;
  centerElement: React.ReactNode;
  overflowElement: React.ReactNode;
  animationTimeout?: number;
}

function getOverflowElements(animationState: AnimationState, overflowElement: React.ReactNode) {
  if (!overflowElement || !animationState) return { leftElement: null, rightElement: null, wrapperLeft: 0 };
  if (animationState === "center-to-left") return { leftElement: null, rightElement: overflowElement, wrapperLeft: 0 };
  return { leftElement: overflowElement, rightElement: null, wrapperLeft: "-100%" };
}

function TransitionSwapSlides(
  { styles, centerElement, overflowElement, animationTimeout = 200 }: TransitionSwapSlidesInterface,
  ref: React.Ref<TransitionSwapSlidesControllerInterface>,
) {
  const [animationState, setAnimationState] = React.useState<AnimationState>(null);
  const resetDataRef = React.useRef<{ callback?: () => void } | null>(null);
  const enteredRef = React.useRef(true);

  React.useEffect(() => {
    if (!ref) return;
    const controller: TransitionSwapSlidesControllerInterface = {
      toRight: () => {
        setAnimationState("center-to-right");
        resetDataRef.current = null;
      },
      toLeft: () => {
        resetDataRef.current = null;
        setAnimationState("center-to-left");
      },
      reset: (callback) => {
        if (enteredRef.current) {
          enteredRef.current = false;
          setAnimationState(null);
          if (callback) callback();
          return;
        }

        resetDataRef.current = { callback };
      },
    };

    provideRef(ref)(controller);
  }, [ref]);

  const onEnter = React.useCallback(() => {
    enteredRef.current = false;
  }, []);

  const onEntered = React.useCallback(() => {
    enteredRef.current = true;
    if (!resetDataRef.current) return;
    setAnimationState(null);
    if (resetDataRef.current.callback) resetDataRef.current.callback();
  }, []);

  return (
    <CSSTransition in={animationState !== null} onEnter={onEnter} onEntered={onEntered} timeout={animationTimeout}>
      {(status) => {
        const classNameForTransitionGroup = getClassNameForTransitionGroup(animationState, status);
        const { leftElement, rightElement, wrapperLeft } = getOverflowElements(animationState, overflowElement);
        return (
          <Wrapper
            styles={[
              styles,
              flex,
              overflow("hidden"),
              child([
                flex,
                position("relative"),
                minWidth("100%"),
                minHeight("100%"),
                left(wrapperLeft),
                animationDuration(`${animationTimeout}ms`),
              ]),
            ]}
          >
            {leftElement && <Wrapper className={classNameForTransitionGroup}>{leftElement}</Wrapper>}
            <Wrapper className={classNameForTransitionGroup}>{centerElement}</Wrapper>
            {rightElement && <Wrapper className={classNameForTransitionGroup}>{rightElement}</Wrapper>}
          </Wrapper>
        );
      }}
    </CSSTransition>
  );
}

export default React.forwardRef(TransitionSwapSlides);
