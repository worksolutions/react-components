import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { child, flex, flexColumn, jc, marginBottom } from "styles";

import Tabs, { TabsInterface } from "../index";
import Wrapper from "../../Wrapper";
import Typography from "../../Typography";
import Tab from "../Tab";

export default {
  title: "Tabs",
  component: Tabs,
};

const TitleComponent = () => (
  <Typography>
    Текст <strong>c разметкой</strong>
  </Typography>
);

const items = [
  { render: () => <div>1</div>, title: <TitleComponent /> },
  { render: () => <div>Текст для таба 2</div>, title: "Текст" },
  { render: () => <div />, title: "Статьи по теме" },
];

const Template: Story<TabsInterface> = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <Wrapper styles={[flex, flexColumn, child([flex, jc("align-center"), marginBottom(30)])]}>
      <Tabs activeIndex={activeIndex}>
        {items.map(({ title, render }, key) => (
          <Tab
            key={key}
            active={activeIndex === key}
            title={title}
            onClick={() => setActiveIndex(key)}
            renderContent={render}
          />
        ))}
      </Tabs>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {};
