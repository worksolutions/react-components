import { storybookWrapper } from "../src/storybookWrapper";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [storybookWrapper];
