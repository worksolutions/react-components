import React from "react";
import { provideRef } from "@worksolutions/react-utils";
import { CSSTransition } from "react-transition-group";

import Wrapper from "../../primitives/Wrapper";

import { AnimationState, getClassNameForTransitionGroup } from "./internal/libs";
import { animationDuration, child, flex, left, minHeight, minWidth, nthChild, overflow, position } from "../../styles";

export interface TransitionSwapSlidesControllerInterface {
  toRight: () => void;
  toLeft: () => void;
  reset: () => void;
}

export interface TransitionSwapSlidesInterface {
  styles?: any;
  centerElement: React.ReactNode;
  overflowElement: React.ReactNode;
  animationTimeout?: number;
}

function TransitionSwapSlides(
  { styles, centerElement, overflowElement, animationTimeout = 200 }: TransitionSwapSlidesInterface,
  ref: React.Ref<TransitionSwapSlidesControllerInterface>,
) {
  const [animationState, setAnimationState] = React.useState<AnimationState>(null);

  React.useEffect(() => {
    if (!ref) return;
    const controller: TransitionSwapSlidesControllerInterface = {
      toRight: () => setAnimationState("center-to-right"),
      toLeft: () => setAnimationState("center-to-left"),
      reset: () => setAnimationState(null),
    };

    provideRef(ref)(controller);
  }, [ref]);

  return (
    <CSSTransition in={animationState !== null} timeout={animationTimeout}>
      {(status) => {
        const classNameForTransitionGroup = getClassNameForTransitionGroup(animationState, status);
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
                left("-100%"),
                animationDuration(`${animationTimeout}ms`),
              ]),
            ]}
          >
            <Wrapper className={classNameForTransitionGroup}>{overflowElement}</Wrapper>
            <Wrapper className={classNameForTransitionGroup}>{centerElement}</Wrapper>
            <Wrapper className={classNameForTransitionGroup}>{overflowElement}</Wrapper>
          </Wrapper>
        );
      }}
    </CSSTransition>
  );
}

export default React.forwardRef(TransitionSwapSlides);
