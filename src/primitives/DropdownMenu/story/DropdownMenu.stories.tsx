import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core/lib/enums";

import {
  absoluteCenter,
  AvatarSize,
  backgroundColor,
  border,
  borderRadius,
  color,
  disableOutline,
  emptyBoxShadow,
  flex,
  fontWeight,
  hover,
  Input,
  List,
  ListItemSize,
  marginRight,
  padding,
  top,
  width,
  Wrapper,
} from "../../../index";

import DropdownMenu, { DropdownMenuInterface } from "../DropdownMenu";
import { internalIcons } from "../../Icon/list";
import DropdownItem from "../DropdownItem/DropdownItem";
import { InputSize } from "../../Input/InputWrapper";
import DropdownDivider from "../ListItemsDivider";

import AvatarComponent from "../../Avatar";
import { numbersControl, selectControl } from "../../../storybook/storyHelpers";
import TooltipContainer from "../../Tooltip/TooltipContainer";

export default {
  title: "DropdownMenu/DropdownMenu",
  component: DropdownMenu.type,
  argTypes: {
    iconLeft: selectControl(Object.keys(internalIcons)),
    size: selectControl(Object.values(InputSize)),
    itemSize: selectControl(Object.values(ListItemSize)),
    primaryPlacement: selectControl(placements),
    widthTargetElem: numbersControl(200, 700, 5),
  },
};

interface StoryDropdownProps {
  itemSize: ListItemSize;
  widthTargetElem: number;
  isHover: boolean;
}

const Template: Story<DropdownMenuInterface & StoryDropdownProps> = (props) => {
  return (
    <Wrapper styles={[absoluteCenter, top("40%"), flex]}>
      <Wrapper styles={[marginRight(50)]}>
        <DropdownMenu {...props} stylesSource={[width(props.widthTargetElem)]} widthPopper="140%">
          <Wrapper>
            <DropdownItem
              itemSize={props.itemSize}
              code="ValueByDefault"
              canSelect={false}
              showArrowOnSelection={false}
            >
              ValueByDefault
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem code="DropdownItemElement3" itemSize={props.itemSize} showArrowOnSelection>
              DropdownItemElement3
            </DropdownItem>
            <DropdownItem
              code="DropdownItemElement4"
              disabled={true}
              leftContent="user"
              itemSize={props.itemSize}
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
            </DropdownItem>
            <DropdownItem
              code="DropdownItemElement1"
              subTitle="Еще один тайтл • email@worksolutions.ru"
              leftContent="user"
              itemSize={props.itemSize}
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
            </DropdownItem>
            <DropdownItem
              code="DropdownItemElement2"
              subTitle="Еще один тайтл"
              itemSize={props.itemSize}
              showArrowOnSelection={false}
            >
              DropdownItemElement2
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem
              itemSize={props.itemSize}
              code="ValueByDefault"
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
              ValueByDefault
            </DropdownItem>
          </Wrapper>
        </DropdownMenu>
      </Wrapper>
      <DropdownMenu
        {...props}
        placeholder="Без периода"
        stylesSource={[backgroundColor("blue/01"), emptyBoxShadow, disableOutline]}
        stylesTextSource={[fontWeight(600), color("gray-blue/08")]}
        stylesPopper={[border(1, "red/04"), backgroundColor("blue/01")]}
        size={InputSize.SMALL}
      >
        <Wrapper>
          <DropdownItem itemSize={props.itemSize} code="ValueByDefault">
            ValueByDefault
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem code="DropdownItemElement3" itemSize={props.itemSize}>
            DropdownItemElement3
          </DropdownItem>
          <DropdownItem code="DropdownItemElement4" disabled={true} leftContent="user" itemSize={props.itemSize}>
            DropdownItemElement4
          </DropdownItem>
          <DropdownItem
            code="DropdownItemElement1"
            subTitle="Еще один тайтл • email@worksolutions.ru"
            leftContent="user"
            itemSize={props.itemSize}
          >
            DropdownItemElement1
          </DropdownItem>
          <DropdownItem code="DropdownItemElement2" subTitle="Еще один тайтл" itemSize={props.itemSize}>
            DropdownItemElement2
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem itemSize={props.itemSize} code="ValueByDefault">
            ValueByDefault
          </DropdownItem>
          <TooltipContainer tooltipText="text" primaryPlacement="right">
            {(toggleVisible) => (
              <Wrapper onClick={toggleVisible}>
                <Input value="baseValue" onChange={() => {}} />
              </Wrapper>
            )}
          </TooltipContainer>
        </Wrapper>
      </DropdownMenu>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  primaryPlacement: "bottom-start",
  size: InputSize.MEDIUM,
  itemSize: ListItemSize.MEDIUM,
  placeholder: "на этом месте будут выбранные элементы",
  widthTargetElem: 350,
};
