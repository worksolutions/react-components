import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import Icon, { IconInterface, expandIcons } from "./index";
import { internalIcons, expandedIcons } from "./list";

export default {
  title: "Icon",
  component: Icon.type,
  decorators: [storybookWrapper],
};

expandIcons({
  "----- Custom icon - svg string": `<svg width="667" height="667" viewBox="0 0 667 667" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M595.473 182.25L333.5 636L71.5273 182.25L595.473 182.25Z" stroke="#EE4A4A" stroke-width="31"/>
<path d="M613.659 171.75L333.5 657L53.3408 171.75L613.659 171.75Z" stroke="black" stroke-width="10"/>
</svg>`,
});

expandIcons({
  "----- Custom icon - link": `https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg`,
});

const DefaultTemplate: Story<IconInterface> = (args) => (
  <ul>
    {[...Object.keys(internalIcons), ...Object.keys(expandedIcons)].map((name) => (
      <li style={{ listStyle: "none", display: "flex", alignItems: "center", marginBottom: 8 }}>
        <div style={{ marginRight: 8 }}>{name}:</div>
        <Icon key={name} {...args} icon={name} />
      </li>
    ))}
  </ul>
);

export const Default = DefaultTemplate.bind({});
Default.args = {};
