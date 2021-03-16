import React, { Ref } from "react";
import { eventValue } from "@worksolutions/utils";
import { useDebouncedInput } from "@worksolutions/react-utils";

import Wrapper from "../Wrapper";

import InputWrapper, { BaseInputWrapperInterface } from "../InputContainer";

export interface InputInterface extends Omit<BaseInputWrapperInterface, "onClick"> {
  autofocus?: boolean;
  multiline?: boolean;
  styles?: any;
  value: string;
  placeholder?: string;
  debounce?: number;
  onChange: (value: string) => void;
}

const Input = React.forwardRef(function (
  {
    autofocus,
    value,
    onChange,
    placeholder,
    multiline,
    debounce = 100,
    styles,
    type,
    ...inputWrapperProps
  }: InputInterface & { type?: string },
  ref: Ref<HTMLInputElement>,
) {
  const { onInputChange, inputValue } = useDebouncedInput(value, debounce, onChange);
  return (
    <InputWrapper
      {...inputWrapperProps}
      renderComponent={(inputStyles) => (
        <>
          <Wrapper
            ref={ref}
            {...(multiline ? { as: "textarea" } : { as: "input" })}
            type={type}
            autoFocus={autofocus}
            disabled={inputWrapperProps.disabled}
            styles={[inputStyles, styles]}
            value={inputValue}
            placeholder={placeholder}
            onChange={eventValue(onInputChange)}
          />
        </>
      )}
    />
  );
});

export default React.memo(Input);
