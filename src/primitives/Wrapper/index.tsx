import React, { forwardRef, ReactNode } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div``;

export interface WrapperInterface {
  className?: string;
  styles?: any;
  as?: any;
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
