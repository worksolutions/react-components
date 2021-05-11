import React, { Ref } from "react";
import { eventValue } from "@worksolutions/utils";
import { useDebouncedInput, useProvideRef } from "@worksolutions/react-utils";

import { resize } from "../../styles";

import Wrapper from "../Wrapper";

import InputContainer, { InputContainerInterface } from "../InputContainer";
import { useAutosizeTextarea } from "./hooks";

export interface InputInterface extends Omit<InputContainerInterface, "onClick"> {
  autofocus?: boolean;
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
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
    autosize,
    minRows = 1,
    maxRows = Infinity,
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
  const autosizeTextareaRef = useAutosizeTextarea(minRows, maxRows);
  const isAutosizeTextarea = multiline && autosize;
  const inputRef = useProvideRef(ref, isAutosizeTextarea ? autosizeTextareaRef : undefined);

  const renderComponent = React.useCallback(
    (inputStyles: any) => (
      <>
        <Wrapper
          ref={inputRef}
          as={multiline ? "textarea" : "input"}
          type={type}
          autoFocus={autofocus}
          disabled={inputContainerProps.disabled}
          styles={[inputStyles, styles, isAutosizeTextarea && resize("none")]}
          value={inputValue}
          placeholder={placeholder}
          onChange={eventValue(onInputChange)}
        />
      </>
    ),
    [
      inputRef,
      isAutosizeTextarea,
      multiline,
      type,
      autofocus,
      inputContainerProps.disabled,
      styles,
      inputValue,
      placeholder,
      onInputChange,
    ],
  );

  return <InputContainer {...inputContainerProps} renderComponent={renderComponent} />;
});

export default React.memo(Input);
