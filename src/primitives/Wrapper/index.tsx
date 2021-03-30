import React, { forwardRef, ReactNode } from "react";
import styled from "styled-components";

import { StyledComponentsAs } from "../../types/StyledComponents";

const StyledWrapper = styled.div``;

export interface WrapperInterface {
  className?: string;
  styles?: any;
  as?: StyledComponentsAs;
  children?: ReactNode;
  [name: string]: any;
}

const Wrapper = forwardRef(function (props: WrapperInterface, ref) {
  const { styles, as, className, children, ...otherProps } = props;
  return (
    <StyledWrapper ref={ref} className={className} css={styles} as={as} {...otherProps}>
      {children}
    </StyledWrapper>
  );
});

export default React.memo(Wrapper);
