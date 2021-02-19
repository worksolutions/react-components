import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { colorControl } from "storyHelpers";

import TypographyLinkComponent, { TypographyLinkProps } from "../TypographyLink";
import Typography from "../index";
import Wrapper from "../../Wrapper";
import { borderBottom, flex, flexColumn, fullWidth, marginBottom, paddingBottom, whiteSpace, width } from "styles";

export default {
  title: "Typography",
  component: TypographyLinkComponent.type,
  argTypes: {
    color: colorControl(),
  },
};

const Template: Story<TypographyLinkProps> = (args, { history }) => {
  const [state, setState] = React.useState("");

  React.useEffect(() => {
    setState(JSON.stringify(history.location, null, 4));
    return history.listen(() => setState(JSON.stringify(history.location, null, 4)));
  }, []);

  return (
    <Wrapper styles={[flex, flexColumn, width(500)]}>
      <Typography
        styles={[whiteSpace("pre-wrap"), fullWidth, paddingBottom(8), borderBottom(1, "gray-blue/05"), marginBottom(8)]}
      >
        location = {state}
      </Typography>
      <TypographyLinkComponent {...args} />
    </Wrapper>
  );
};

export const Link = Template.bind({});

Link.args = {
  children: "Click on me",
  to: "/test",
} as TypographyLinkProps;
