import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { child, flex, flexColumn, jc, marginBottom } from "styles";

import Tabs, { TabsInterface } from "../index";
import Wrapper from "../../Wrapper";

export default {
  title: "Tabs",
  component: Tabs,
};

const Template: Story<TabsInterface> = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <Wrapper styles={[flex, flexColumn, child([flex, jc("align-center"), marginBottom(50)])]}>
      <Tabs
        items={[
          { render: () => <div>1</div>, title: "Атрибуты" },
          { render: () => <div>Текст</div>, title: "Текст" },
          { render: () => <div />, title: "Статьи по теме" },
        ]}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {};
