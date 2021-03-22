import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core/lib/enums";

import { booleanControl, numbersControl, selectControl } from "../../../storybook/storyHelpers";

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

import { internalIcons } from "../../Icon/list";
import SelectItem from "../SelectItem";
import Select from "../index";
import { InputContainerSize } from "../../InputContainer/enums";

export default {
  title: "Select",
  component: Select,
  argTypes: {
    iconLeft: selectControl(Object.keys(internalIcons)),
    size: selectControl(Object.values(InputContainerSize)),
    itemSize: selectControl(Object.values(ListItemSize)),
    primaryPlacement: selectControl(placements),
    widthTargetElem: numbersControl(200, 700, 5),
    multiselect: booleanControl(),
  },
};

function getItems(itemSize: ListItemSize) {
  return [
    <SelectItem size={itemSize} code={null}>
      Пустой элемент
    </SelectItem>,
    <SelectItem leftContent="clock-deadline" code={1} size={itemSize}>
      Элемент 1
    </SelectItem>,
    <SelectItem code={2} size={itemSize}>
      Элемент 2
    </SelectItem>,
  ];
}

const Template: Story<
  SelectInterface<string> & {
    itemSize: ListItemSize;
    widthTargetElem: number;
    isHover: boolean;
    multiselect: boolean;
  }
> = (props) => {
  const [selected, setSelected] = useState<SelectItemCode>(null);

  return (
    <Wrapper styles={[absoluteCenter, top("40%"), flex]}>
      <Select {...props} selectedItemCode={selected} popupWidth="auto" onChange={setSelected}>
        {getItems(props.itemSize)}
      </Select>
      <Select
        {...props}
        selectedItemCode={selected}
        outerStyles={[marginLeft(12), width(props.widthTargetElem)]}
        triggerElementStyles={[backgroundColor("green/01"), emptyBoxShadow, hover(emptyBoxShadow)]}
        triggerTextStyles={[color("green/08")]}
        triggerElementRightIcon="16-triangle-down"
        triggerElementRightIconWidth={16}
        triggerElementRightIconHeight={16}
        triggerElementRightIconColor="green/07"
        popupWidth="100%"
        onChange={setSelected}
      >
        {getItems(props.itemSize)}
      </Select>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  primaryPlacement: "bottom-start",
  size: InputContainerSize.MEDIUM,
  itemSize: ListItemSize.MEDIUM,
  placeholder: "на этом месте будут выбранные элементы",
  widthTargetElem: 350,
};
