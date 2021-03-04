import React from "react";
import { isReactComponent } from "@worksolutions/react-utils";

import Wrapper from "../../Wrapper";
import { ai, flex, padding } from "../../../styles";

export interface BreadcrumbsItemInterface<ContentProps = any> {
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
  content: React.FC<ContentProps> | React.ReactNode;
  contentProps?: ContentProps;
}

function BreadcrumbsItem({
  leftChildren,
  rightChildren,
  content: ContentComponent,
  contentProps,
}: BreadcrumbsItemInterface) {
  return (
    <>
      <Wrapper styles={[flex, flex, ai("center"), padding("2px 8px")]}>
        {leftChildren}
        {isReactComponent(ContentComponent) ? <ContentComponent {...contentProps} /> : ContentComponent}
        {rightChildren}
      </Wrapper>
    </>
  );
}

export default React.memo(BreadcrumbsItem);
