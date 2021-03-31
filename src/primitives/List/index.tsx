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
  styles?: any;
}

function List({ children, loading, styles }: ListInterface) {
  return (
    <LoadingProvider>
      {(ref) => (
        <Wrapper ref={ref} styles={styles}>
          <Wrapper
            styles={[
              flex,
              flexColumn,
              padding(8),
              child(verticalMargin(2)),
              firstChild(marginTop(0)),
              lastChild(marginBottom(0)),
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
