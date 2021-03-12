import React from "react";
import { Story } from "@storybook/react/types-6-0";

import AvatarComponent, { AvatarInterface, AvatarSize } from "../index";
import { selectControl } from "../../../storybook/storyHelpers";

export default {
  title: "Avatar",
  component: AvatarComponent.type,
  argTypes: {
    size: selectControl(Object.keys(AvatarSize)),
  },
};

const AvatarTemplate: Story<AvatarInterface> = (props) => <AvatarComponent {...props} />;

export const Avatar = AvatarTemplate.bind({});

Avatar.args = {
  size: AvatarSize.MEDIUM,
};
