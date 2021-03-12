import React, { useCallback } from "react";

import Wrapper from "../Wrapper";
import DropdownHeader from "./DropdownHeader/DropdownHeader";
import PopperManager from "../PopperManager";

import { createDropdownRightIcon, InputWrapper } from "../../index";
import { DropdownManagerContext } from "./DropdownManager/DropdownManagerContext";

import { DropdownMenuProps } from "./DropdownMenu";

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
  targetElement,
  offset,
  arrowPadding,
  arrowElem,
  haveArrow,
  colorTextHeader,
}: DropdownMenuProps) {
  const { selectedItem } = React.useContext(DropdownManagerContext);

  const popperElement = useCallback(() => <Wrapper styles={[stylesPopper]}>{children}</Wrapper>, [
    stylesPopper,
    children,
  ]);
  const referenceElement = useCallback(
    (toggleVisible: () => void, visible: boolean) =>
      Boolean(targetElement) ? (
        <Wrapper onClick={toggleVisible}>{targetElement}</Wrapper>
      ) : (
        <InputWrapper
          size={size}
          iconLeft={iconLeft}
          iconRight={createDropdownRightIcon(visible)}
          outerStyles={[stylesReference]}
          renderComponent={(styles) => (
            <DropdownHeader
              text={selectedItem ? selectedItem : placeholder}
              styles={[styles, headerStyle]}
              colorTextHeader={colorTextHeader}
            />
          )}
          onClick={toggleVisible}
        />
      ),
    [size, iconLeft, stylesReference, placeholder, headerStyle, selectedItem],
  );

  return (
    <PopperManager
      placement={placement}
      modifiers={modifiers}
      offset={offset}
      arrowPadding={arrowPadding}
      outsideHandler={outsideHandler}
      referenceElement={referenceElement}
      popperElement={popperElement}
      arrowElem={arrowElem}
      haveArrow={haveArrow}
    />
  );
}

export default React.memo(DropdownContainer);
