import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "../../storybookWrapper";

import DropDown, { DropdownInterface } from "./index";

export default {
  title: "DropDown",
  component: DropDown,
  decorators: [storybookWrapper],
};

enum InputSize {
  MEDIUM = "medium",
  LARGE = "large",
}

enum InputTitlePosition {
  TOP,
  LEFT,
}

const DropDownTemplate: Story<DropdownInterface<string>> = (props) => <DropDown {...props} />;

export const Default = DropDownTemplate.bind({});
Default.args = {
  title: "Сбоку:",
  titlePosition: InputTitlePosition.LEFT,
  size: InputSize.LARGE,
  selectedItemCode: "new",
  placeholder: "тест 1",
  items: [
    {
      title: "Выбранный длинный пункт",
      code: "new",
      subTitle: "Еще один тайтл • email@worksolutions.ru",
      leftContent: "user",
    },
    {
      title: "Выбранный короткий пункт",
      code: "stas",
      subTitle: "Еще один тайтл • email@worksaaaolutions.ru",
      leftContent: "user",
    },
    {
      title: "Выбранный длинный пункт",
      code: "baa",
      subTitle: "Еще один тайтл • email@a.ru",
      leftContent: "user",
    },
  ],
};
