import React from "react";
import { preventDefault } from "@worksolutions/utils";

import Wrapper, { WrapperInterface } from "../Wrapper";

export interface FormInterface extends WrapperInterface {
  children: React.ReactNode;
  onSubmit: () => void;
}

function Form({ children, onSubmit, ...props }: FormInterface) {
  return (
    <Wrapper {...props} as="form" onSubmit={preventDefault(onSubmit)}>
      {children}
    </Wrapper>
  );
}

export default React.memo(Form);
