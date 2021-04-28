import React, { FormEvent } from "react";
import { preventDefault } from "@worksolutions/react-utils";

import Wrapper, { WrapperInterface } from "../Wrapper";
import { display } from "../../styles";

export interface FormInterface extends WrapperInterface {
  children: React.ReactNode;
  onSubmit: (event: FormEvent) => void;
}

function Form({ children, onSubmit, ...props }: FormInterface) {
  return (
    <Wrapper {...props} as="form" onSubmit={preventDefault(onSubmit)}>
      <Wrapper as="input" type="submit" styles={display("none")} />
      {children}
    </Wrapper>
  );
}

export default React.memo(Form);
