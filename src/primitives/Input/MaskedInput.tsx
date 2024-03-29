import React, { Ref } from "react";
import useMaskedInput from "@viewstools/use-masked-input";
import { eventValue } from "@worksolutions/utils";
import { provideRef, useDebouncedInput, useSyncToRef } from "@worksolutions/react-utils";

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
    ...inputContainerProps
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

  const onChangeMaskedRef = useSyncToRef(onChangeMasked);

  const renderComponent = React.useCallback(
    (inputStyles: any) => (
      <Wrapper
        ref={provideRef(innerRef, ref)}
        as="input"
        disabled={inputContainerProps.disabled}
        styles={[inputStyles, styles]}
        placeholder={placeholder}
        onChange={onChangeMaskedRef.current}
      />
    ),
    [innerRef, inputContainerProps.disabled, onChangeMaskedRef, placeholder, styles],
  );

  return <InputContainer {...inputContainerProps} renderComponent={renderComponent} />;
});

export default React.memo(MaskedInput);

export const makeMask = function (elements: (RegExp | string)[]) {
  return { elements, maxLength: elements.length };
};

export type MaskType = ReturnType<typeof makeMask>;
