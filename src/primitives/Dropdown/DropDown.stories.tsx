import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";
import { width } from "styles";

import DropDown, { DropdownInterface } from "./index";
import { selectControl } from "../../storyHelpers";

enum InputSize {
  MEDIUM = "medium",
  LARGE = "large",
}

enum InputTitlePosition {
  TOP,
  LEFT,
}

export default {
  title: "DropDown",
  component: DropDown,
  decorators: [storybookWrapper],
  argTypes: {
    size: selectControl(Object.values(InputSize)),
    titlePosition: selectControl([InputTitlePosition.TOP, InputTitlePosition.LEFT]),
  },
};

const Template: Story<DropdownInterface<string>> = (props) => {
  const [value, setValue] = React.useState<string | number | undefined>("new");
  return <DropDown selectedItemCode={value} {...props} styles={[width(200), props.styles]} onChange={setValue} />;
};

export const Default = Template.bind({});

Default.args = {
  title: "Сбоку:",
  tip: "test",
  titlePosition: InputTitlePosition.LEFT,
  size: InputSize.LARGE,
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

const TemplateError: Story<DropdownInterface<string>> = (props) => {
  const [value, setValue] = React.useState<string | number | undefined>("new");
  return (
    <DropDown
      {...props}
      selectedItemCode={value}
      styles={[width(200), props.styles]}
      onChange={setValue}
      optionalAction={{
        title: "Добавить категорию",
        icon: "plus-big",
        onClick: () => alert("На втором дропдауне есть модалка"),
      }}
    />
  );
};

export const Error = TemplateError.bind({});

Error.args = {
  title: "Cверху:",
  error: true,
  tip: "test",
  searchable: true,
  placeholder: "тест 1",
  items: [
    { title: "Выбранный длинный пункт", code: "new" },
    { title: "по дате", code: "date" },
  ],
};
