import React, { useMemo } from "react";

import Wrapper from "../Wrapper";
import { fontSize, fontWeight, lineHeight, marginBottom, marginTop, paddingLeft, Typography } from "../../index";
import DropdownDivider from "./DropdownDivider";

export interface DropdownItemGroupInterface {
  children: JSX.Element[] | JSX.Element;
  heading?: string;
  topElement?: JSX.Element;
  stylesHeading?: any;
}

function getTextStyles() {
  return [fontWeight(600), fontSize(14), lineHeight(16), marginTop(10), marginBottom(14), paddingLeft(8)];
}

function DropdownGroup({ children, heading, topElement, stylesHeading }: DropdownItemGroupInterface) {
  const textStyles = useMemo(getTextStyles, []);

  return (
    <Wrapper>
      {topElement && topElement}
      <DropdownDivider />
      {heading && (
        <Typography color="gray-blue/07" styles={[textStyles, stylesHeading]}>
          {heading}
        </Typography>
      )}
      {children}
    </Wrapper>
  );
}

export default React.memo(DropdownGroup);
