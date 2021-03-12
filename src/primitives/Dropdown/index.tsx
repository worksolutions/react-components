import React, { Ref } from "react";
import { provideRef } from "@worksolutions/react-utils";

import { ai, borderRadius, flex, flexValue, overflow, pointer, textAlign } from "../../styles";

import Typography from "../Typography";
import Wrapper from "../Wrapper";
import { InputSize } from "../Input/Input";
import InputWrapper from "../Input/InputWrapper";

import { DropdownInterface } from "./types";
import DropdownContainer, { createDropdownRightIcon } from "./DropdownContainer";

const Dropdown = function (
  {
    styles: stylesProp,
    searchable,
    optionalAction,
    outerStyles,
    size = InputSize.MEDIUM,
    placeholder,
    selectedItemCode,
    items,
    onChange,
    ...inputWrapperProps
  }: DropdownInterface<string>,
  ref: Ref<HTMLElement>,
) {
  return (
    <Wrapper styles={outerStyles}>
      <DropdownContainer
        selectedItemCodes={selectedItemCode ? [selectedItemCode] : undefined}
        onChange={onChange}
        items={items}
        size={size}
        optionalAction={optionalAction}
        searchable={searchable}
      >
        {([selectedItem]) => (state, parentRef, subChild) => (
          <InputWrapper
            outerStyles={[outerStyles, pointer]}
            outerRef={provideRef(ref, parentRef)}
            size={size}
            {...inputWrapperProps}
            iconLeftStyles={[borderRadius("100%")]}
            onClick={state.toggle}
            // @ts-ignore
            iconLeft={selectedItem?.leftContent}
            iconRight={createDropdownRightIcon(state.opened)}
            renderComponent={(styles) => (
              <Wrapper as="button" styles={[styles, stylesProp, pointer]}>
                {selectedItem ? (
                  <Wrapper styles={[flex, ai("center")]}>
                    <Typography styles={[flexValue(1), textAlign("left")]} dots>
                      {selectedItem.title}
                    </Typography>
                  </Wrapper>
                ) : (
                  <Typography
                    className="placeholder"
                    styles={[flexValue(1), textAlign("left")]}
                    dots
                    color="gray-blue/04"
                  >
                    {placeholder}
                  </Typography>
                )}
                {subChild}
              </Wrapper>
            )}
          />
        )}
      </DropdownContainer>
    </Wrapper>
  );
};

export default React.memo(React.forwardRef(Dropdown)) as <ITEM extends string | number>(
  props: DropdownInterface<ITEM> & { ref?: Ref<HTMLElement> },
) => JSX.Element;

export { createDropdownRightIcon } from "./DropdownContainer";
