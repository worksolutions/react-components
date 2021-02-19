import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import Breadcrumbs, { BreadcrumbsProps } from "./index";

export default {
  title: "Breadcrumbs",
  component: Breadcrumbs.type,
  decorators: [storybookWrapper],
};

const BreadcrumbsTemplate: Story<BreadcrumbsProps> = (props) => <Breadcrumbs {...props} />;

export const Default = BreadcrumbsTemplate.bind({});

Default.args = {
  items: [
    { to: "/", text: "Главная" },
    { to: "/catalog", text: "Каталог" },
    { to: "/catalog/category", text: "Страница категории" },
    { to: "/catalog/category/product", text: "Страница подкатегории" },
    { to: "/catalog/category/product/item", text: "Страница конкретного товара" },
    { to: "/catalog/category/product/item/reviews", text: "Страница отзывов об этом конкретном товаре" },
    { to: "/catalog/category/product/item/reviews/561234", text: "Страница конкретного отзыва" },
  ],
  withBadge: true,
};
