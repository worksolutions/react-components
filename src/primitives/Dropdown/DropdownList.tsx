import React, { useMemo } from "react";
import Wrapper from "../Wrapper";
import { fontSize, fontWeight, lineHeight, marginBottom, marginTop, paddingLeft, Typography } from "../../index";
import DropdownDivider from "./DropdownDivider";
import DropdownItemElement from "./DropdownItem/DropdownItem";
import { ListItemSize } from "./DropdownItem/types";

export interface DropdownItemGroupInterface {
  children: JSX.Element[] | JSX.Element;
  heading: string;
  valueByDefault?: string;
  valueByDefaultSelected: boolean;
  onChange: () => void;
}

function getTextStyles() {
  return [fontWeight(600), fontSize(14), lineHeight(16), marginTop(10), marginBottom(14), paddingLeft(8)];
}

function DropdownGroupList({
  children,
  heading,
  valueByDefault,
  onChange,
  valueByDefaultSelected,
}: DropdownItemGroupInterface) {
  const textStyles = useMemo(getTextStyles, []);

  return (
    <Wrapper>
      {valueByDefault && (
        <DropdownItemElement onChange={onChange} selected={valueByDefaultSelected} itemSize={ListItemSize.SMALL}>
          {valueByDefault}
        </DropdownItemElement>
      )}
      <DropdownDivider />
      <Typography color="gray-blue/07" styles={textStyles}>
        {heading}
      </Typography>
      {children}
    </Wrapper>
  );
}

export default React.memo(DropdownGroupList);
