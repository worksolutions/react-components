import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "../../storybookWrapper";

import ImageWithDefault, { ImageInterface } from "./index";
import { backgroundColor } from "../../styles";

export default {
  title: "ImageWithDefault",
  component: ImageWithDefault.type,
  decorators: [storybookWrapper],
};

const ImageWithDefaultTemplate: Story<ImageInterface> = (props) => <ImageWithDefault {...props} />;

export const Default = ImageWithDefaultTemplate.bind({});
Default.args = {
  src:
    "https://portal.worksolutions.ru/upload/resize_cache/main/23e/58_58_2/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202020-06-25%20%D0%B2%209.57.33.png",
  height: 200,
  aspectRatio: 2,
  styles: [backgroundColor("green/01")],
};
