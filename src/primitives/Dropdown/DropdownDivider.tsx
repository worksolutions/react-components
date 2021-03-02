import React from "react";

import Wrapper from "../Wrapper";
import { backgroundColor, height, width } from "../../index";

export interface DropdownDividerInterface {
  styles?: any;
}

function DropdownDivider({ styles }: DropdownDividerInterface) {
  return <Wrapper styles={[width("100%"), height(1), backgroundColor("gray-blue/02"), styles]} />;
}

export default React.memo(DropdownDivider);
