import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";
import { selectControl } from "storyHelpers";

import MaskedInput, { InputSize, makeMask, MaskedInputInterface } from "./MaskedInput";

import { internalIcons } from "../Icon/list";
import { InputTitlePosition } from "./InputWrapper";

export default {
  title: "Masked",
  component: MaskedInput.type,
  decorators: [storybookWrapper],
  argTypes: {
    iconLeft: selectControl(Object.keys(internalIcons)),
    iconRight: selectControl(Object.keys(internalIcons)),
    titlePosition: selectControl([InputTitlePosition.LEFT, InputTitlePosition.TOP]),
    size: selectControl([InputSize.LARGE, InputSize.MEDIUM]),
  },
};

const MaskedTemplate: Story<MaskedInputInterface> = (props) => <MaskedInput {...props} />;

export const CalendarInput = MaskedTemplate.bind({});
export const InputPhone = MaskedTemplate.bind({});

const dateMaskCharacters = [/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/];
const maskCharacter = "_";
const calendarMask = makeMask(dateMaskCharacters);

CalendarInput.args = {
  mask: calendarMask,
  guide: true,
  showMaskWhenEmpty: true,
  maskCharacter: maskCharacter,
  iconRight: "calendar",
  value: "value",
  title: "title",
};

const phoneMaskCharacters = ["+", "7", " ", /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/];
const phoneMask = makeMask(phoneMaskCharacters);

InputPhone.args = {
  mask: phoneMask,
  guide: true,
  placeholder: "+7",
  maskCharacter: maskCharacter,
  value: "value",
  title: "title",
};
