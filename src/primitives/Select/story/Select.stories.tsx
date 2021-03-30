import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core/lib/enums";

import {
  booleanControl,
  colorControl,
  iconsControl,
  numbersControl,
  selectControl,
  textControl,
} from "../../../storybook/storyHelpers";

import {
  absoluteCenter,
  backgroundColor,
  color,
  emptyBoxShadow,
  flex,
  hover,
  ListItemSize,
  marginLeft,
  SelectInterface,
  SelectItemCode,
  top,
  width,
  Wrapper,
} from "../../../index";
import SelectItem from "../SelectItem";
import Select from "../index";
import { InputContainerSize } from "../../InputContainer/enums";

export default {
  title: "Select",
  component: Select,
  argTypes: {
    rightIcon: iconsControl(),
    rightIconColor: colorControl(),
    rightIconHeight: numbersControl(1, 24, 1),
    rightIconWidth: numbersControl(1, 24, 1),
    closePopupAfterChange: booleanControl(),
    placeholder: textControl(),
    placeholderColor: colorControl(),
    primaryPlacement: selectControl(placements),
    offset: numbersControl(0, 50, 1),
    popupWidth: selectControl(["auto", 100, 200, "50%", "100%"]),
    title: textControl(),
    size: selectControl(Object.values(InputContainerSize)),
    tip: textControl(),
    error: booleanControl(),
    success: booleanControl(),
    disabled: booleanControl(),
  },
};

function getItems() {
  return [
    <SelectItem key={0} code={0} size={ListItemSize.MEDIUM}>
      Элемент-заглушка
    </SelectItem>,
    <SelectItem key={1} leftContent="clock-deadline" code={1} size={ListItemSize.MEDIUM}>
      Элемент 1
    </SelectItem>,
    <SelectItem key={2} code={2} size={ListItemSize.MEDIUM}>
      Элемент 2
    </SelectItem>,
  ];
}

const Template: Story<SelectInterface<string>> = (props) => {
  const [selected, setSelected] = useState<SelectItemCode>(null);

  return (
    <Wrapper styles={[absoluteCenter, top("40%"), flex]}>
      <Select {...props} selectedItemCode={selected} onChange={setSelected}>
        {getItems()}
      </Select>
      <Select
        {...props}
        selectedItemCode={selected}
        outerStyles={[marginLeft(12), width(320)]}
        styles={[backgroundColor("green/01"), emptyBoxShadow, hover(emptyBoxShadow)]}
        selectedElementTextStyles={color("green/07")}
        placeholder="hello"
        placeholderColor="green/05"
        rightIcon="16-triangle-down"
        rightIconWidth={16}
        rightIconHeight={16}
        rightIconColor="green/07"
        popupWidth="100%"
        onChange={setSelected}
      >
        {getItems()}
      </Select>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  primaryPlacement: "bottom-start",
  size: InputContainerSize.MEDIUM,
  placeholder: "на этом месте будут выбранные элементы",
};
