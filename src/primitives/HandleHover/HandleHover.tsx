import React from "react";

import Wrapper from "../Wrapper";

export interface DropdownItemProps {
  children: React.ReactNode;
  onHandleEnter: () => void;
  onHandleLeave: () => void;
}

function HandleHover({ children, onHandleEnter, onHandleLeave }: DropdownItemProps) {
  return (
    <Wrapper onMouseEnter={onHandleEnter} onMouseLeave={onHandleLeave}>
      {children}
    </Wrapper>
  );
}

export default React.memo(HandleHover);
