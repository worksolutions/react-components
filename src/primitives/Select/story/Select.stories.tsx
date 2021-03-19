import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core/lib/enums";

import {
  absoluteCenter,
  AvatarSize,
  backgroundColor,
  borderRadius,
  flex,
  hover,
  ListItemSize,
  marginRight,
  padding,
  SelectInterface,
  top,
  width,
  Wrapper,
} from "../../../index";

import { internalIcons } from "../../Icon/list";
import SelectItem from "../SelectItem";
import DropdownDivider from "../../List/ListItemsDivider";

import AvatarComponent from "../../Avatar";
import { booleanControl, numbersControl, selectControl } from "../../../storybook/storyHelpers";
import { InputContainerSize } from "../../InputContainer/enums";
import Select from "..";
import { without } from "ramda";

export default {
  title: "Select/Select",
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

interface StoryDropdownProps {
  itemSize: ListItemSize;
  widthTargetElem: number;
  isHover: boolean;
  multiselect: boolean;
}

const Template: Story<SelectInterface<string> & StoryDropdownProps> = (props) => {
  const [selectedItemCodes, setSelectedItemCodes] = useState<string[]>([]);
  const [selectedItemCodesMulti, setSelectedItemCodesMulti] = useState<string[]>([]);
  const onHandleChange = (code: string) => setSelectedItemCodes([code]);

  const onHandleChangeMultiple = (code: string) => {
    if (selectedItemCodesMulti.includes(code)) {
      setSelectedItemCodesMulti(without([code], selectedItemCodesMulti));
      return;
    }
    setSelectedItemCodesMulti(selectedItemCodesMulti.concat([code]));
  };

  return (
    <Wrapper styles={[absoluteCenter, top("40%"), flex]}>
      <Wrapper styles={marginRight(50)}>
        <Select
          {...props}
          selectedItemCodes={selectedItemCodes}
          stylesTriggerElement={[width(props.widthTargetElem)]}
          popupWidth="100%"
          onChange={onHandleChange}
        >
          <SelectItem size={props.itemSize} code="a" showArrowOnSelection={false} canSelect={false}>
            Невозможно выбрать
          </SelectItem>
          <DropdownDivider />
          <SelectItem code="b" size={props.itemSize} showArrowOnSelection>
            DropdownItemElement3
          </SelectItem>
          <SelectItem
            code="v"
            disabled={true}
            leftContent="user"
            size={props.itemSize}
            rightContent={
              <Wrapper
                styles={[padding(5), borderRadius("50%"), hover([backgroundColor("blue/05")])]}
                onClick={() => console.log("asdsa")}
              >
                <AvatarComponent size={AvatarSize.SMALL} />
              </Wrapper>
            }
          >
            DropdownItemElement4
          </SelectItem>
          <SelectItem
            code="g"
            subTitle="Еще один тайтл • email@worksolutions.ru"
            leftContent="user"
            size={props.itemSize}
            showIconRightOnHover
            showIconLeftOnHover
            showArrowOnSelection={false}
            rightContent={
              <Wrapper
                styles={[padding(5), borderRadius("50%"), hover([backgroundColor("blue/05")])]}
                onClick={() => console.log("asdsa")}
              >
                <AvatarComponent size={AvatarSize.SMALL} />
              </Wrapper>
            }
          >
            DropdownItemElement1
          </SelectItem>
          <SelectItem code="d" subTitle="Еще один тайтл" size={props.itemSize} showArrowOnSelection={false}>
            DropdownItemElement2
          </SelectItem>
          <DropdownDivider />
          <SelectItem
            size={props.itemSize}
            code="e"
            showArrowOnSelection={false}
            canSelect={false}
            rightContent={
              <Wrapper
                styles={[padding(5), borderRadius("50%"), hover([backgroundColor("blue/05")])]}
                onClick={() => console.log("asdsa")}
              >
                <AvatarComponent size={AvatarSize.SMALL} />
              </Wrapper>
            }
          >
            Невозможно выбрать, зато с аватаркой
          </SelectItem>
        </Select>
      </Wrapper>
      <Select
        {...props}
        selectedItemCodes={selectedItemCodesMulti}
        stylesTriggerElement={[width(props.widthTargetElem)]}
        popupWidth="100%"
        onChange={onHandleChangeMultiple}
      >
        <SelectItem size={props.itemSize} code="a" showArrowOnSelection={false} canSelect={false}>
          Невозможно выбрать
        </SelectItem>
        <DropdownDivider />
        <SelectItem code="b" size={props.itemSize} showArrowOnSelection>
          DropdownItemElement3
        </SelectItem>
        <SelectItem
          code="v"
          disabled={true}
          leftContent="user"
          size={props.itemSize}
          rightContent={
            <Wrapper
              styles={[padding(5), borderRadius("50%"), hover([backgroundColor("blue/05")])]}
              onClick={() => console.log("asdsa")}
            >
              <AvatarComponent size={AvatarSize.SMALL} />
            </Wrapper>
          }
        >
          DropdownItemElement4
        </SelectItem>
        <SelectItem
          code="g"
          subTitle="Еще один тайтл • email@worksolutions.ru"
          leftContent="user"
          size={props.itemSize}
          showIconRightOnHover
          showIconLeftOnHover
          showArrowOnSelection={false}
          rightContent={
            <Wrapper
              styles={[padding(5), borderRadius("50%"), hover([backgroundColor("blue/05")])]}
              onClick={() => console.log("asdsa")}
            >
              <AvatarComponent size={AvatarSize.SMALL} />
            </Wrapper>
          }
        >
          DropdownItemElement1
        </SelectItem>
        <SelectItem code="d" subTitle="Еще один тайтл" size={props.itemSize} showArrowOnSelection={false}>
          DropdownItemElement2
        </SelectItem>
        <DropdownDivider />
        <SelectItem
          size={props.itemSize}
          code="e"
          showArrowOnSelection={false}
          canSelect={false}
          rightContent={
            <Wrapper
              styles={[padding(5), borderRadius("50%"), hover([backgroundColor("blue/05")])]}
              onClick={() => console.log("asdsa")}
            >
              <AvatarComponent size={AvatarSize.SMALL} />
            </Wrapper>
          }
        >
          Невозможно выбрать, зато с аватаркой
        </SelectItem>
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
