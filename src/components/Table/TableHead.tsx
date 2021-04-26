import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "../../primitives/Wrapper";
import Typography, { TypographyInterface } from "../../primitives/Typography";

export interface TableHeadInterface {
  styles?: any;
  children: React.ReactNode;
}

function TableHead({ styles, children }: TableHeadInterface) {
  return (
    <Wrapper as="thead" styles={styles}>
      {children}
    </Wrapper>
  );
}

export default observer(TableHead);

export function TableHeadTypography(props: TypographyInterface) {
  return <Typography type="caption-semi-bold" color="gray-blue/05" {...props} />;
}
