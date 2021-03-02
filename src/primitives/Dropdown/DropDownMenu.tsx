import React, { useCallback, useState } from "react";
import { Modifier, Popper, Reference } from "react-popper";

import { Placement } from "@popperjs/core/lib/enums";

import {
  ai,
  createDropdownRightIcon,
  flex,
  flexValue,
  InputSize,
  InputWrapper,
  InternalIcons,
  pointer,
  textAlign,
  width,
} from "../../index";

import Wrapper from "../Wrapper";
import Typography from "../Typography";
import VisibleManager from "./VisibleManager/VisibleManager";

export interface DropDownMenuInterface {
  title: string;
  children: JSX.Element;
  placeholder: string;
  stylesReference: any;
  stylesPopper: any;
  iconLeft: InternalIcons;
  targetStyles: any;
  placement: Placement;
  size: InputSize;
  modifiers: ReadonlyArray<Modifier<unknown>>;
  outsideHandler: boolean;
}

const increaseWidthPopper = 40;
const defaultModifiers = [
  {
    name: "offset",
    options: {
      offset: [0, 4],
    },
  },
];

function getPopperStyles(targetElement: Element | null) {
  if (!targetElement) return [];
  return [width(targetElement.clientWidth + increaseWidthPopper)];
}

function DropDownMenu({
  title,
  children,
  placement,
  stylesReference,
  stylesPopper,
  iconLeft,
  targetStyles,
  size,
  modifiers,
  outsideHandler = true,
}: DropDownMenuInterface) {
  const [targetElement, setTargetElement] = useState(null);
  const popperStyles = useCallback(() => getPopperStyles(targetElement), [targetElement]);

  return (
    <VisibleManager outsideHandler={outsideHandler}>
      {(visible: boolean, toggleVisible: () => void) => (
        <>
          <Reference>
            {({ ref }: any) => (
              <Wrapper ref={ref}>
                <InputWrapper
                  outerRef={setTargetElement}
                  size={size}
                  onClick={toggleVisible}
                  iconLeft={iconLeft}
                  iconRight={createDropdownRightIcon(visible)}
                  outerStyles={[targetStyles]}
                  renderComponent={(styles) => (
                    <Wrapper as="button" styles={[styles, stylesReference, pointer]}>
                      <Wrapper styles={[flex, ai("center")]}>
                        <Typography color={"gray-blue/05"} styles={[flexValue(1), textAlign("left")]} dots>
                          {title}
                        </Typography>
                      </Wrapper>
                    </Wrapper>
                  )}
                />
              </Wrapper>
            )}
          </Reference>
          {visible && (
            <Popper placement={placement} modifiers={modifiers ? modifiers : defaultModifiers}>
              {({ ref, style, placement }) => {
                return (
                  <Wrapper ref={ref} style={style} styles={[popperStyles, stylesPopper]} data-placement={placement}>
                    {children}
                  </Wrapper>
                );
              }}
            </Popper>
          )}
        </>
      )}
    </VisibleManager>
  );
}

export default React.memo(DropDownMenu);
