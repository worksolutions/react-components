import { storybookWrapper } from "../src/storybook/storybookWrapper";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [storybookWrapper];
