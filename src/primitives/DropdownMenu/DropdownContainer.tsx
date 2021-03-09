import React, { useCallback, useState } from "react";
import { StrictModifiers } from "@popperjs/core";

import Wrapper from "../Wrapper";
import DropdownHeader from "./DropdownHeader/DropdownHeader";
import PopperManager from "../PopperManager";

import { createDropdownRightIcon, InputWrapper, width } from "../../index";
import { DropdownManagerContext } from "./DropdownManager/DropdownManagerContext";

import { DropdownMenuInterface } from "./DropdownMenu";

const offsetWidthPopper = 40;
const defaultModifiers: StrictModifiers = {
  name: "offset",
  options: {
    offset: [0, 4],
  },
};

function getPopperStyles(targetElement: Element | null) {
  if (!targetElement) return [];
  return [width(targetElement.clientWidth + offsetWidthPopper)];
}

function DropdownContainer({
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
}: DropdownMenuInterface) {
  const [targetElement, setTargetElement] = useState(null);
  const { selectedItem } = React.useContext(DropdownManagerContext);

  const popperStyles = useCallback(() => getPopperStyles(targetElement), [targetElement]);
  const popperElement = useCallback(() => <Wrapper styles={[popperStyles, stylesPopper]}>{children}</Wrapper>, [
    popperStyles,
    stylesPopper,
    children,
  ]);
  const referenceElement = useCallback(
    (toggleVisible: () => void, visible: boolean) => (
      <InputWrapper
        outerRef={setTargetElement}
        size={size}
        iconLeft={iconLeft}
        iconRight={createDropdownRightIcon(visible)}
        outerStyles={[stylesReference]}
        renderComponent={(styles) => (
          <DropdownHeader text={selectedItem ? selectedItem : placeholder} styles={[styles, headerStyle]} />
        )}
        onClick={toggleVisible}
      />
    ),
    [size, iconLeft, stylesReference, placeholder, headerStyle, setTargetElement, selectedItem],
  );

  return (
    <PopperManager
      placement={placement}
      modifiers={Boolean(modifiers) ? modifiers : [defaultModifiers]}
      outsideHandler={outsideHandler}
      referenceElement={referenceElement}
      popperElement={popperElement}
    />
  );
}

export default React.memo(DropdownContainer);
