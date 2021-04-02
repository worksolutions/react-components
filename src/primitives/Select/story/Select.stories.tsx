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
  marginBottom,
  marginLeft,
  SelectInterface,
  SelectItemCode,
  top,
  width,
  Wrapper,
} from "../../../index";
import SelectItem from "../SelectItem";
import Select from "../index";
import ListItemsDivider from "../../List/ListItemsDivider";
import ListItemSearch from "../../List/ListItemSearch";
import ListItemEmpty from "../../List/ListItemEmpty";
import Icon from "../../Icon";

export default {
  title: "Select",
  component: Select,
  argTypes: {
    loading: booleanControl(),
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
    size: selectControl(Object.values(ListItemSize)),
    tip: textControl(),
    error: booleanControl(),
    success: booleanControl(),
    disabled: booleanControl(),
  },
};

function getItems() {
  return [
    <SelectItem key={0} code={null}>
      Элемент 0
    </SelectItem>,
    <SelectItem key={1} leftContent="clock-deadline" code={1}>
      Элемент 1
    </SelectItem>,
    <SelectItem key={2} code={2}>
      Элемент 2
    </SelectItem>,
  ];
}

const Template: Story<SelectInterface<string>> = (props) => {
  const [selected, setSelected] = useState<SelectItemCode>(null);
  const items = getItems();
  const [search, setSearch] = React.useState("");

  const last = parseFloat(search);
  const newItems = isNaN(last) ? items : items.slice(0, last);

  const popupTopElement = (
    <>
      <ListItemSearch size={props.size} placeholder="Количество элементов" value={search} onChange={setSearch} />
      <ListItemsDivider />
    </>
  );

  const children =
    newItems.length === 0 ? (
      <ListItemEmpty
        text="По вашему запросу ничего не найдено"
        beforeText={<Icon icon="alert-alt" color="red/04" width={44} height={44} styles={marginBottom(16)} />}
      />
    ) : (
      newItems
    );

  return (
    <Wrapper styles={[absoluteCenter, top("40%"), flex]}>
      <Select {...props} popupTopElement={popupTopElement} selectedItemCode={selected} onChange={setSelected}>
        {children}
      </Select>
      <Select
        {...props}
        popupTopElement={popupTopElement}
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
        {children}
      </Select>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  primaryPlacement: "bottom-start",
  size: ListItemSize.MEDIUM,
  placeholder: "на этом месте будут выбранные элементы",
};
