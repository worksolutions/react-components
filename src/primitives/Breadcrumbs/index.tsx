import React from "react";

import Wrapper from "../Wrapper";
import { flex, flexWrap, fullWidth } from "../../styles";
import { Colors } from "../../constants/colors";

export interface BreadcrumbsProps {
  children: React.ReactNode;
  withBadge: boolean;
  badgeColor: Colors;
}

function Breadcrumbs({ withBadge = false, badgeColor = "blue/05", children }: BreadcrumbsProps) {
  return <Wrapper styles={[flex, flexWrap, fullWidth]}>{children}</Wrapper>;
}

export default React.memo(Breadcrumbs);
