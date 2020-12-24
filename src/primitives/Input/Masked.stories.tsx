import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";

import MaskedInput, { makeMask, MaskedInputInterface } from "./MaskedInput";

export default {
  title: "Masked",
  component: MaskedInput.type,
  decorators: [storybookWrapper],
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
};

const phoneMaskCharacters = ["+", "7", " ", /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/];
const phoneMask = makeMask(phoneMaskCharacters);

InputPhone.args = {
  mask: phoneMask,
  guide: true,
  placeholder: "+7",
  maskCharacter: maskCharacter,
  value: "value",
};
