import React from "react";

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

import { duration160 } from "../../constants/durations";
import { elevation16 } from "../../constants/shadows";

const showArrowStyle = child([visibility("visible"), opacity(1)], ".resizer-arrow");

interface RightSideInterface {
  arrowButtonInit?: React.Ref<HTMLElement>;
  closed: boolean;
}

function RightSide({ arrowButtonInit, closed }: RightSideInterface) {
  return (
    <Wrapper
      styles={[
        fullHeight,
        width("100%"),
        horizontalPadding(5),
        cursor("col-resize"),
        hover([child([backgroundColor("definitions.Resizer.Border.hoverColor")], ".resizer-divider"), showArrowStyle]),
        active([child(backgroundColor("definitions.Resizer.Border.activeColor"), ".resizer-divider"), showArrowStyle]),
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
            [transition(`transform ${duration160}`), closed ? transform("rotate(180deg)") : transform("rotate(0deg)")],
            "svg",
          ),
        ]}
        size={ButtonSize.MEDIUM}
        type={ButtonType.ICON}
        iconLeft="arrow-left"
      />
    </Wrapper>
  );
}

export default React.memo(RightSide);
