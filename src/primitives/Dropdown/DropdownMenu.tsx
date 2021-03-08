import React, { useCallback, useState } from "react";
import { Modifier } from "react-popper";

import { Placement } from "@popperjs/core/lib/enums";

import { createDropdownRightIcon, InputSize, InputWrapper, InternalIcons, width } from "../../index";

import Wrapper from "../Wrapper";
import DropdownHeader from "./DropdownHeader/DropdownHeader";
import PopperManager from "../PopperManager";

export interface DropDownMenuInterface {
  title: string;
  placeholder: string;
  stylesReference: any;
  headerStyle: any;
  size: InputSize;
  iconLeft: InternalIcons;
  children: JSX.Element;
  placement: Placement;
  modifiers: ReadonlyArray<Modifier<unknown>>;
  outsideHandler: boolean;
  stylesPopper: any;
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
  const referenceElement = useCallback(
    (visible: boolean, toggleVisible: () => void) => (
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
    ),
    [size, iconLeft, stylesReference, title, placeholder, headerStyle, setTargetElement],
  );

  const popperElement = useCallback(() => <Wrapper styles={[popperStyles, stylesPopper]}>{children}</Wrapper>, [
    popperStyles,
    stylesPopper,
    children,
  ]);

  return (
    <PopperManager
      placement={placement}
      modifiers={Boolean(modifiers) ? modifiers : defaultModifiers}
      outsideHandler={outsideHandler}
      referenceElement={referenceElement}
      popperElement={popperElement}
    />
  );
}

export default React.memo(DropdownMenu);
