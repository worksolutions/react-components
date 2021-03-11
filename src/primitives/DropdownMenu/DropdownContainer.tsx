import React, { useCallback, useMemo, useState } from "react";

import Wrapper from "../Wrapper";
import DropdownHeader from "./DropdownHeader/DropdownHeader";
import PopperManager from "../PopperManager";

import { createDropdownRightIcon, InputWrapper, width } from "../../index";
import { DropdownManagerContext } from "./DropdownManager/DropdownManagerContext";

import { DropdownMenuInterface } from "./DropdownMenu";

const defaultOffset: [number, number] = [0, 4];
const defaultOffsetWithArrow: [number, number] = [0, 18];
const defaultArrowPadding = -10;

function setOffset(offset?: [number, number], haveArrow?: boolean) {
  if (offset) return offset;
  if (haveArrow) return defaultOffsetWithArrow;
  return defaultOffset;
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
  targetElement,
  offset,
  arrowPadding,
  arrowElem,
  haveArrow,
}: DropdownMenuInterface) {
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
            <DropdownHeader text={selectedItem ? selectedItem : placeholder} styles={[styles, headerStyle]} />
          )}
          onClick={toggleVisible}
        />
      ),
    [size, iconLeft, stylesReference, placeholder, headerStyle, selectedItem],
  );

  const offsetValue = useMemo(() => setOffset(offset, haveArrow), [haveArrow, offset]);

  return (
    <PopperManager
      placement={placement}
      modifiers={Boolean(modifiers) ? modifiers : []}
      offset={offsetValue}
      arrowPadding={Boolean(arrowPadding) ? arrowPadding : defaultArrowPadding}
      outsideHandler={outsideHandler}
      referenceElement={referenceElement}
      popperElement={popperElement}
      arrowElem={arrowElem}
      haveArrow={haveArrow}
    />
  );
}

export default React.memo(DropdownContainer);
