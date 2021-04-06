import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { child, flex, flexColumn, jc, marginBottom } from "styles";

import Tabs, { TabsInterface } from "../index";
import Wrapper from "../../Wrapper";
import Tab from "../Tab";

export default {
  title: "Tabs",
  component: Tabs.type,
};

const Template: Story<TabsInterface> = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <Wrapper styles={[flex, flexColumn, child([flex, jc("align-center"), marginBottom(50)])]}>
      <Tabs
        tabs={[
          { content: () => <div>1</div>, title: "Заголовок 1", tabItem: Tab },
          {
            content: () => <div>Контент второго таба</div>,
            title: "Текст",
            tabItem: (props) => <Tab {...props} />,
          },
          { content: () => <div />, title: "Статьи по теме" },
        ]}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {};
