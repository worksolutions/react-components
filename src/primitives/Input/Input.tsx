import React, { Ref } from "react";
import { eventValue } from "@worksolutions/utils";
import { useDebouncedInput, provideRef } from "@worksolutions/react-utils";

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

  const renderComponent = React.useCallback(
    (inputStyles: any) => (
      <>
        <Wrapper
          ref={provideRef(ref, isAutosizeTextarea ? autosizeTextareaRef : undefined)}
          {...(multiline ? { as: "textarea" } : { as: "input" })}
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
      autofocus,
      isAutosizeTextarea,
      inputContainerProps.disabled,
      inputValue,
      multiline,
      onInputChange,
      placeholder,
      ref,
      styles,
      type,
    ],
  );

  return <InputContainer {...inputContainerProps} renderComponent={renderComponent} />;
});

export default React.memo(Input);
