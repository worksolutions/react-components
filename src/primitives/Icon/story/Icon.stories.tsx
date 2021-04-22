import React from "react";
import { Story } from "@storybook/react/types-6-0";

import Icon, { IconInterface, expandIcons } from "../index";
import { internalIcons } from "../list";

export default {
  title: "Icon",
  component: Icon.type,
};

expandIcons({
  "expanded custom svg": require("./image.svg"),
  "expanded link": "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
});

const DefaultTemplate: Story<IconInterface> = (args) => (
  <ul>
    {Object.keys(internalIcons).map((name) => (
      <li style={{ listStyle: "none", display: "flex", alignItems: "center", marginBottom: 8 }}>
        <div style={{ marginRight: 8 }}>{name}:</div>
        <Icon key={name} {...args} icon={name} />
      </li>
    ))}
  </ul>
);

export const Default = DefaultTemplate.bind({});
Default.args = {};
