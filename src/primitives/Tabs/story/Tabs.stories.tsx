import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { colorControl } from "storybook/storyHelpers";

import { child, flex, flexColumn, jc, marginBottom } from "styles";

import Tabs, { TabsInterface } from "../index";
import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

export default {
  title: "Tabs",
  component: Tabs,
  argTypes: {
    bottomLineColor: colorControl(),
    tabBackgroundColor: colorControl(),
    tabTitleColor: colorControl(),
    tabTitleHoverColor: colorControl(),
    tabTitleActiveColor: colorControl(),
    activeTabTitleColor: colorControl(),
  },
};

const TitleComponent = () => (
  <Typography>
    Текст <strong>c разметкой</strong>
  </Typography>
);

const Template: Story<TabsInterface> = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <Wrapper styles={[flex, flexColumn, child([flex, jc("align-center"), marginBottom(50)])]}>
      <Tabs
        items={[
          { render: () => <div>1</div>, title: <TitleComponent /> },
          { render: () => <div>Текст</div>, title: "Текст" },
          { render: () => <div />, title: "Статьи по теме" },
        ]}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        bottomLineColor="red/05"
      />
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  bottomLineColor: "red/05",
  tabBackgroundColor: "transparent",
  tabTitleColor: "gray-blue/05",
  tabTitleHoverColor: "gray-blue/07",
  tabTitleActiveColor: "gray-blue/09",
  activeTabTitleColor: "gray-blue/09",
};
