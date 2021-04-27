import React, { Ref } from "react";
import { eventValue } from "@worksolutions/utils";
import { useDebouncedInput, provideRef } from "@worksolutions/react-utils";

import Wrapper from "../Wrapper";

import InputContainer, { InputContainerInterface } from "../InputContainer";

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
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const isAutosizeTextarea = multiline && autosize;

  React.useEffect(() => {
    if (!textareaRef.current) return;

    const element = textareaRef.current;

    const styles = getComputedStyle(element);
    const lineHeight = styles.lineHeight.includes("px") ? parseFloat(styles.lineHeight) : 0;
    const paddingTop = styles.paddingTop.includes("px") ? parseFloat(styles.paddingTop) : 0;
    const paddingBottom = styles.paddingBottom.includes("px") ? parseFloat(styles.paddingBottom) : 0;
    const borderTop = styles.borderTop.includes("px") ? parseFloat(styles.borderTop) : 0;
    const borderBottom = styles.borderBottom.includes("px") ? parseFloat(styles.borderBottom) : 0;

    const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom + borderTop + borderBottom;

    const inputHandler = () => {
      element.style.height = "auto";
      let overflow = "hidden";
      let newHeight = element.scrollHeight;

      if (element.scrollHeight >= maxHeight) {
        overflow = "auto";
        newHeight = maxHeight;
      }

      element.style.overflow = overflow;
      element.style.height = newHeight + "px";
    };

    element.rows = minRows;
    element.addEventListener("input", inputHandler);
    return () => element.removeEventListener("input", inputHandler);
  }, []);

  const renderComponent = React.useCallback(
    (inputStyles: any) => (
      <>
        <Wrapper
          ref={provideRef(ref, isAutosizeTextarea ? textareaRef : undefined)}
          {...(multiline ? { as: "textarea" } : { as: "input" })}
          type={type}
          autoFocus={autofocus}
          disabled={inputContainerProps.disabled}
          styles={[inputStyles, styles, isAutosizeTextarea && [{ resize: "none" }]]}
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
