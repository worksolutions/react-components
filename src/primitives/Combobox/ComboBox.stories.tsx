import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";
import { Combobox, ComboboxInterface } from "index";

export default {
  title: "Combobox",
  component: Combobox,
  decorators: [storybookWrapper],
};

const Template: Story<ComboboxInterface<string>> = (props) => {
  const [comboValues, setComboValues] = React.useState<string[]>([]);
  const [comboboxItems, setComboboxItems] = React.useState(() => [
    {
      title: "Курьерская служба доставки",
      code: "1",
    },
    {
      title: "Самовывоз",
      code: "2",
    },
    {
      title: "Почта России",
      code: "3",
    },
  ]);
  return (
    <Combobox
      {...props}
      onChange={setComboValues}
      onChangeItemsList={setComboboxItems}
      selectedItemCodes={comboValues}
      items={comboboxItems}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  placeholder: "Выберете спосо доставки",
};
