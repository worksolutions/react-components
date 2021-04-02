import React from "react";

import Wrapper from "../Wrapper";
import {
  child,
  firstChild,
  flex,
  flexColumn,
  lastChild,
  margin,
  marginBottom,
  marginTop,
  padding,
  verticalMargin,
} from "../../styles";
import LoadingProvider from "../../components/LoadingContainer/LoadingProvider";
import Loading from "../../components/LoadingContainer/Loading";

export interface ListInterface {
  children?: React.ReactNode;
  topElement?: React.ReactNode;
  bottomElement?: React.ReactNode;
  loading?: boolean;
  outerStyles?: any;
  listWrapperStyles?: any;
  listStyles?: any;
}

function List(
  { children, loading, listWrapperStyles, outerStyles, topElement, listStyles, bottomElement }: ListInterface,
  listElementRef: React.Ref<HTMLElement>,
) {
  return (
    <Wrapper styles={[flex, flexColumn, outerStyles]}>
      {topElement}
      <LoadingProvider>
        {(ref) => (
          <Wrapper ref={ref} styles={[margin(4), listWrapperStyles]}>
            <Wrapper
              ref={listElementRef}
              styles={[
                flex,
                flexColumn,
                padding(4),
                child(verticalMargin(2)),
                firstChild(marginTop(0)),
                lastChild(marginBottom(0)),
                listStyles,
              ]}
            >
              {children}
            </Wrapper>
            {loading && <Loading />}
          </Wrapper>
        )}
      </LoadingProvider>
      {bottomElement}
    </Wrapper>
  );
}

export default React.memo(React.forwardRef(List));
