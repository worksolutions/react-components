import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { ai, child, flex, flexColumn, horizontalPadding, jc, marginBottom } from "styles";

import Tabs, { TabsInterface } from "../index";
import Wrapper from "../../Wrapper";
import Tab, { tabHorizontalPadding } from "../Tab";
import Counter from "../../Counter";

export default {
  title: "Tabs",
  // @ts-ignore
  component: Tabs.type,
};

const Template: Story<TabsInterface> = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <Wrapper styles={[flex, flexColumn, child([flex, jc("align-center"), marginBottom(50)])]}>
      <Tabs
        tabs={[
          { children: () => <div>1</div>, title: "Заголовок 1", tabItemComponent: Tab },
          {
            children: () => <div>Контент второго таба</div>,
            title: "Текст",
            tabItemComponent: (props) => <Tab {...props} />,
          },
          { children: () => <div />, title: "Статьи по теме" },
          {
            children: () => <div>Контент таба с баджем</div>,
            title: "Текст с баджем",
            tabItemComponent: (props) => (
              <Wrapper styles={[horizontalPadding(tabHorizontalPadding), flex, ai("center")]}>
                <Tab {...props} styles={horizontalPadding(0)} />
                <Counter value={4} color="blue/05" />
              </Wrapper>
            ),
          },
        ]}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {};
