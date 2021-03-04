import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Breadcrumbs, { BreadcrumbsProps } from "../index";
import { BreadcrumbsItemInterface } from "../BreadcrumbsItem";
import BreadcrumbsText from "../ItemContent/BreadcrumbsText";
import BreadcrumbsLink from "../ItemContent/BreadcrumbsLink";

export default {
  title: "Breadcrumbs",
  component: Breadcrumbs.type,
};

const BreadcrumbsTemplate: Story<BreadcrumbsProps> = (props) => {
  const items: BreadcrumbsItemInterface[] = [
    { content: BreadcrumbsText, contentProps: { text: "Главная" } },
    { content: BreadcrumbsLink, contentProps: { text: "Страница категории", to: "/asd" } },
  ];

  return <Breadcrumbs {...props} items={items} />;
};

export const Default = BreadcrumbsTemplate.bind({});
