import React from "react";

import Wrapper from "../Wrapper";
import { ai, flex, flexWrap, fullWidth, horizontalMargin } from "../../styles";
import BreadcrumbsItem, { BreadcrumbsItemInterface } from "./BreadcrumbsItem";
import Typography from "../Typography";

export interface BreadcrumbsInterface {
  items: BreadcrumbsItemInterface[];
}

function Breadcrumbs({ items }: BreadcrumbsInterface) {
  const lastIndex = items.length - 1;

  return (
    <Wrapper styles={[flex, flexWrap, fullWidth, ai("center")]}>
      {items.map((item, index) => (
        <>
          <BreadcrumbsItem key={index} {...item} />
          {index !== lastIndex && (
            <Typography
              color="definitions.Breadcrumbs.LevelDivider.color"
              type="caption-regular"
              styles={horizontalMargin(2)}
            >
              /
            </Typography>
          )}
        </>
      ))}
    </Wrapper>
  );
}

export default React.memo(Breadcrumbs);
