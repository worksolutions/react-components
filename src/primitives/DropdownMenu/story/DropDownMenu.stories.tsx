import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { placements } from "@popperjs/core/lib/enums";

import {
  absoluteCenter,
  AvatarSize,
  backgroundColor,
  border,
  borderRadius,
  disableOutline,
  emptyBoxShadow,
  flex,
  fontWeight,
  hover,
  ListItemSize,
  padding,
  Wrapper,
} from "../../../index";
import DropdownMenu, { DropdownMenuProps } from "../DropdownMenu";
import { internalIcons } from "../../Icon/list";
import DropdownItem from "../DropdownItem/DropdownItem";
import { InputSize } from "../../Input/InputWrapper";
import DropdownDivider from "../DropdownDivider";
import List from "../List/List";

import { marginRight, top, width } from "styles";
import { colorControl, numbersControl, selectControl } from "storybook/storyHelpers";
import AvatarComponent from "../../Avatar";

export default {
  title: "DropdownMenu/DropdownMenu",
  component: DropdownMenu.type,
  argTypes: {
    iconLeft: selectControl(Object.keys(internalIcons)),
    size: selectControl(Object.values(InputSize)),
    itemSize: selectControl(Object.values(ListItemSize)),
    placement: selectControl(placements),
    widthTargetElem: numbersControl(200, 700, 5),
    colorTextHeader: colorControl(),
  },
};

interface StoryDropDownProp {
  itemSize: ListItemSize;
  widthTargetElem: number;
  isHover: boolean;
}

const Template: Story<DropdownMenuProps & StoryDropDownProp> = (props: any) => {
  return (
    <Wrapper styles={[absoluteCenter, top("40%"), flex]}>
      <Wrapper styles={[marginRight(50)]}>
        <DropdownMenu {...props} stylesReference={[width(props.widthTargetElem)]}>
          <List isHoveredItems={props.isHover}>
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
              showIconRightHover
              showIconLeftHover
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
                <Wrapper styles={[padding(5), borderRadius("50%"), hover([backgroundColor("blue/05")])]}>
                  <AvatarComponent size={AvatarSize.SMALL} />
                </Wrapper>
              }
            >
              ValueByDefault
            </DropdownItem>
          </List>
        </DropdownMenu>
      </Wrapper>

      <DropdownMenu
        {...props}
        placeholder="Без периода"
        stylesReference={[backgroundColor("blue/01"), emptyBoxShadow, disableOutline]}
        colorTextHeader="gray-blue/08"
        textReferenceStyles={[fontWeight(600)]}
        stylesPopper={[border(1, "red/04"), backgroundColor("blue/01")]}
      >
        <List isHoveredItems={props.isHover}>
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
        </List>
      </DropdownMenu>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  placement: "bottom-start",
  size: InputSize.MEDIUM,
  itemSize: ListItemSize.MEDIUM,
  placeholder: "на этом месте будут выбранные элементы",
  widthTargetElem: 350,
};
