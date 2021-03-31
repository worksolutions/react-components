import React from "react";

import Wrapper from "../Wrapper";
import {
  child,
  firstChild,
  flex,
  flexColumn,
  lastChild,
  marginBottom,
  marginTop,
  padding,
  verticalMargin,
} from "../../styles";
import LoadingProvider from "../../components/LoadingContainer/LoadingProvider";
import Loading from "../../components/LoadingContainer/Loading";

export interface ListInterface {
  children?: React.ReactNode;
  loading?: boolean;
  outerStyles?: any;
  styles?: any;
}

function List({ children, loading, styles, outerStyles }: ListInterface) {
  return (
    <LoadingProvider>
      {(ref) => (
        <Wrapper ref={ref} styles={outerStyles}>
          <Wrapper
            styles={[
              flex,
              flexColumn,
              padding(8),
              child(verticalMargin(2)),
              firstChild(marginTop(0)),
              lastChild(marginBottom(0)),
              styles,
            ]}
          >
            {children}
          </Wrapper>
          {loading && <Loading />}
        </Wrapper>
      )}
    </LoadingProvider>
  );
}

export default React.memo(List);
