import React, { Ref } from "react";
import { useToggle } from "react-use";
import { eventValue } from "@worksolutions/utils";
import { useDebouncedInput } from "@worksolutions/react-utils";

import Wrapper from "../Wrapper";
import Button, { ButtonSize, ButtonType } from "../Button";

import InputContainer from "../InputContainer";
import { InputInterface } from "./Input";

export interface InputPasswordInterface extends Omit<InputInterface, "rightIcon"> {}

const Password = React.forwardRef(function (
  { value, onChange, placeholder, debounce = 100, styles, ...inputContainerProps }: InputPasswordInterface,
  ref: Ref<HTMLInputElement>,
) {
  const { onInputChange, inputValue } = useDebouncedInput(value, debounce, onChange);
  const [showPassword, toggleShowPassword] = useToggle(false);
  return (
    <InputContainer
      {...inputContainerProps}
      rightIcon={
        <Button
          size={ButtonSize.SMALL}
          type={ButtonType.ICON}
          iconLeft={showPassword ? "eye-off" : "eye-on"}
          onClick={toggleShowPassword}
        />
      }
      renderComponent={(inputStyles) => (
        <Wrapper
          ref={ref}
          as="input"
          disabled={inputContainerProps.disabled}
          type={showPassword ? "text" : "password"}
          styles={[inputStyles, styles]}
          value={inputValue}
          placeholder={placeholder}
          onChange={eventValue(onInputChange)}
        />
      )}
    />
  );
});

export default React.memo(Password);
