import React from "react";

import Wrapper from "../../Wrapper";

import { backgroundColor, fullWidth, height } from "../../../styles";

export interface ListItemsDividerInterface {
  styles?: any;
}

function ListItemsDivider({ styles }: ListItemsDividerInterface) {
  return (
    <Wrapper styles={[fullWidth, height(1), backgroundColor("definitions.ListItemsDivider.backgroundColor"), styles]} />
  );
}

export default React.memo(ListItemsDivider);