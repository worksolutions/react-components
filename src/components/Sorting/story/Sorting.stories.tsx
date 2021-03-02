import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Sorting, { SortingInterface, SortingElementInterface } from "../index";

export default {
  title: "Sorting",
  component: Sorting.type,
  argTypes: {},
};

const Template: Story<SortingInterface> = (props) => {
  const [sorting, setSorting] = React.useState<SortingElementInterface>({
    id: "date",
  });

  return (
    <Sorting
      items={[
        { title: "по дате создания", id: "date", hasDirection: true },
        { title: "по новизне", id: "new", hasDirection: false },
        { title: "по алфавиту", id: "alphabet", hasDirection: true },
      ]}
      selected={sorting}
      onChange={(id, direction) => {
        setSorting({ id, direction });
      }}
    />
  );
};

export const Default = Template.bind({});

Default.args = {};
