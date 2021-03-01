import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybook/storybookWrapper";

import Breadcrumbs, { BreadcrumbsProps } from "./index";
import BreadcrumbsItem, { BreadcrumbsItemProps } from "./BreadcrumbsItem";
import { colorControl } from "storybook/storyHelpers";

export default {
  title: "Breadcrumbs",
  component: Breadcrumbs.type,
  argTypes: {
    badgeColor: colorControl(),
  },
  decorators: [storybookWrapper],
};

const BreadcrumbsTemplate: Story<BreadcrumbsProps> = (props) => {
  const items: Omit<BreadcrumbsItemProps, "isLastItem" | "withBadge" | "badgeColor">[] = [
    { to: "/", text: "Главная" },
    { to: "/catalog", text: "Каталог" },
    { to: "/catalog/category", text: "Страница категории" },
    { to: "/catalog/category/product", text: "Страница подкатегории" },
    { to: "/catalog/category/product/item", text: "Страница конкретного товара" },
    { to: "/catalog/category/product/item/reviews", text: "Страница отзывов об этом конкретном товаре" },
    { to: "/catalog/category/product/item/reviews/561234", text: "Страница конкретного отзыва" },
  ];

  return (
    <Breadcrumbs {...props}>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        const { to, text } = item;
        return (
          <BreadcrumbsItem
            key={index}
            isLastItem={isLastItem}
            text={text}
            to={to}
            withBadge={props.withBadge}
            badgeColor={props.badgeColor}
          />
        );
      })}
    </Breadcrumbs>
  );
};

export const Default = BreadcrumbsTemplate.bind({});

Default.args = {
  withBadge: true,
  badgeColor: "blue/05",
};
