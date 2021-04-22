import React from "react";
import { Story } from "@storybook/react/types-6-0";

import PaginationComponent, { PaginationInterface } from "../index";

export default {
  title: "Pagination",
  // @ts-ignore
  component: PaginationComponent.baseElement,
};

const PaginationTemplate: Story<PaginationInterface> = (props) => {
  const [page, setPage] = React.useState(1);
  return <PaginationComponent {...props} page={page} onChange={setPage} />;
};

export const Pagination = PaginationTemplate.bind({});

Pagination.args = {
  perPage: 8,
  maxLinksCount: 8,
  totalElements: 51,
  getPageUrl: (page) => "/page/" + page,
};
