import React, { Ref } from "react";
import useMaskedInput from "@viewstools/use-masked-input";
import { eventValue } from "@worksolutions/utils";
import { provideRef, useDebouncedInput } from "@worksolutions/react-utils";

import Wrapper from "../Wrapper";

import InputContainer from "../InputContainer";
import { InputInterface } from "./Input";

export interface MaskedInputInterface extends InputInterface {
  mask: MaskType;
  guide?: boolean;
  showMaskWhenEmpty?: boolean;
  maskCharacter?: string;
}

const MaskedInput = React.forwardRef(function (
  {
    value,
    placeholder,
    debounce = 100,
    styles,
    showMaskWhenEmpty,
    guide = false,
    maskCharacter,
    mask,
    onChange,
    ...InputContainerProps
  }: MaskedInputInterface,
  innerRef: Ref<HTMLInputElement>,
) {
  const ref = React.useRef<HTMLInputElement>();

  const { onInputChange, inputValue } = useDebouncedInput(value, debounce, onChange);

  const onChangeMasked = useMaskedInput({
    value: inputValue,
    input: ref,
    mask: mask.elements,
    guide,
    placeholderChar: maskCharacter,
    showMask: showMaskWhenEmpty,
    onChange: eventValue(onInputChange),
  });

  return (
    <InputContainer
      {...InputContainerProps}
      renderComponent={(inputStyles) => (
        <Wrapper
          ref={provideRef((element) => {
            if (element === ref.current) return;
            provideRef(innerRef)(element);
          }, ref)}
          as="input"
          disabled={InputContainerProps.disabled}
          styles={[inputStyles, styles]}
          placeholder={placeholder}
          onChange={onChangeMasked}
        />
      )}
    />
  );
});

export default React.memo(MaskedInput);

export const makeMask = function (elements: (RegExp | string)[]) {
  return { elements, maxLength: elements.length };
};

export type MaskType = ReturnType<typeof makeMask>;
