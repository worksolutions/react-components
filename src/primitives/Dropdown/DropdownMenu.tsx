import React, { useCallback, useState } from "react";
import { Modifier, Popper, Reference } from "react-popper";

import { Placement } from "@popperjs/core/lib/enums";

import { createDropdownRightIcon, InputSize, InputWrapper, InternalIcons, width } from "../../index";

import Wrapper from "../Wrapper";
import VisibleManager from "./VisibleManager/VisibleManager";
import DropdownHeader from "./DropdownHeader/DropdownHeader";

export interface DropDownMenuInterface {
  title: string;
  children: JSX.Element;
  iconLeft: InternalIcons;
  placement: Placement;
  size: InputSize;
  modifiers: ReadonlyArray<Modifier<unknown>>;
  outsideHandler: boolean;
  stylesReference: any;
  stylesPopper: any;
  placeholder: string;
  headerStyle: any;
}

const offsetWidthPopper = 40;
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
  return [width(targetElement.clientWidth + offsetWidthPopper)];
}

function DropdownMenu({
  title,
  children,
  placement,
  stylesReference,
  stylesPopper,
  iconLeft,
  size,
  modifiers,
  placeholder,
  headerStyle,
  outsideHandler = true,
}: DropDownMenuInterface) {
  const [targetElement, setTargetElement] = useState(null);
  const popperStyles = useCallback(() => getPopperStyles(targetElement), [targetElement]);

  return (
    <VisibleManager outsideHandler={outsideHandler}>
      {(visible: boolean, toggleVisible: () => void) => (
        <>
          <Reference>
            {({ ref }) => (
              <Wrapper ref={ref}>
                <InputWrapper
                  outerRef={setTargetElement}
                  size={size}
                  iconLeft={iconLeft}
                  iconRight={createDropdownRightIcon(visible)}
                  outerStyles={[stylesReference]}
                  renderComponent={(styles) =>
                    Boolean(title) ? (
                      <DropdownHeader text={title} styles={[styles, headerStyle]} />
                    ) : (
                      <DropdownHeader text={placeholder} styles={[styles, headerStyle]} />
                    )
                  }
                  onClick={toggleVisible}
                />
              </Wrapper>
            )}
          </Reference>
          {visible && (
            <Popper placement={placement} modifiers={Boolean(modifiers) ? modifiers : defaultModifiers}>
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

export default React.memo(DropdownMenu);
