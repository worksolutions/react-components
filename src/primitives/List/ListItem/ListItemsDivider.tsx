import React from "react";

import Wrapper from "../../Wrapper";

import { backgroundColor, fullWidth, height } from "../../../index";

export interface DropdownDividerInterface {
  styles?: any;
}

function ListItemsDivider({ styles }: DropdownDividerInterface) {
  return (
    <Wrapper styles={[fullWidth, height(1), backgroundColor("definitions.ListItemsDivider.backgroundColor"), styles]} />
  );
}

export default React.memo(ListItemsDivider);
