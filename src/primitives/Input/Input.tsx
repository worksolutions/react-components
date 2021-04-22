import React, { Ref } from "react";
import { eventValue } from "@worksolutions/utils";
import { useDebouncedInput } from "@worksolutions/react-utils";

import Wrapper from "../Wrapper";

import InputContainer, { InputContainerInterface } from "../InputContainer";

export interface InputInterface extends Omit<InputContainerInterface, "onClick"> {
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
    placeholder,
    multiline,
    debounce = 100,
    styles,
    type,
    onChange,
    ...inputContainerProps
  }: InputInterface & { type?: string },
  ref: Ref<HTMLInputElement>,
) {
  const { onInputChange, inputValue } = useDebouncedInput(value, debounce, onChange);

  const renderComponent = React.useCallback(
    (inputStyles: any) => (
      <>
        <Wrapper
          ref={ref}
          {...(multiline ? { as: "textarea" } : { as: "input" })}
          type={type}
          autoFocus={autofocus}
          disabled={inputContainerProps.disabled}
          styles={[inputStyles, styles]}
          value={inputValue}
          placeholder={placeholder}
          onChange={eventValue(onInputChange)}
        />
      </>
    ),
    [autofocus, inputContainerProps.disabled, inputValue, multiline, onInputChange, placeholder, ref, styles, type],
  );

  return <InputContainer {...inputContainerProps} renderComponent={renderComponent} />;
});

export default React.memo(Input);
