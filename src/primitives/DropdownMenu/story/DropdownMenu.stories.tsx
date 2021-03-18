import React, { useState } from "react";
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
  margin,
  marginRight,
  padding,
  top,
  width,
  Wrapper,
} from "../../../index";

import DropdownMenu, { DropdownMenuInterface } from "../index";
import { internalIcons } from "../../Icon/list";
import DropdownItem from "../DropdownItem";
import DropdownDivider from "../../List/ListItem/ListItemsDivider";

import AvatarComponent from "../../Avatar";
import { numbersControl, selectControl } from "../../../storybook/storyHelpers";
import TooltipContainer from "../../Tooltip/TooltipContainer";
import { InputContainerSize } from "../../InputContainer/enums";

export default {
  title: "DropdownMenu/DropdownMenu",
  component: DropdownMenu,
  argTypes: {
    iconLeft: selectControl(Object.keys(internalIcons)),
    size: selectControl(Object.values(InputContainerSize)),
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

const Template: Story<DropdownMenuInterface<string> & StoryDropdownProps> = (props) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectedElement = React.useMemo(
    () =>
      selectedItems.length === 0 ? null : (
        <DropdownItem
          code={selectedItems[0]}
          size={props.itemSize}
          styles={[margin(0)]}
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
      ),
    [props.itemSize, selectedItems],
  );

  return (
    <Wrapper styles={[absoluteCenter, top("40%"), flex]}>
      <Wrapper styles={[marginRight(50)]}>
        <DropdownMenu
          {...props}
          selectedItem={selectedElement}
          stylesMainButton={[width(props.widthTargetElem)]}
          popupWidth="140%"
          closeAfterClickItem={false}
        >
          <List multiselect selectedItems={selectedItems} setSelectedItems={setSelectedItems}>
            <DropdownItem
              size={props.itemSize}
              code="Невозможно выбрать"
              showArrowOnSelection={false}
              canSelect={false}
            >
              Невозможно выбрать
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem code="DropdownItemElement3" size={props.itemSize} showArrowOnSelection>
              DropdownItemElement3
            </DropdownItem>
            <DropdownItem
              code="DropdownItemElement4"
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
            </DropdownItem>
            <DropdownItem
              code="DropdownItemElement1"
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
            </DropdownItem>
            <DropdownItem
              code="DropdownItemElement2"
              subTitle="Еще один тайтл"
              size={props.itemSize}
              showArrowOnSelection={false}
            >
              DropdownItemElement2
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem
              size={props.itemSize}
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
              Невозможно выбрать, но с аватаркой
            </DropdownItem>
          </List>
        </DropdownMenu>
      </Wrapper>
      <DropdownMenu
        {...props}
        placeholder="Без периода"
        stylesMainButton={[backgroundColor("blue/01"), emptyBoxShadow, disableOutline]}
        stylesTextMainButton={[fontWeight(600), color("gray-blue/08")]}
        popperStyles={[border(1, "red/04"), backgroundColor("blue/01")]}
        size={InputContainerSize.SMALL}
      >
        <List multiselect selectedItems={selectedItems} setSelectedItems={setSelectedItems}>
          <DropdownItem hovered={false} size={props.itemSize} code="ValueByDefault">
            ValueByDefault
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem code="DropdownItemElement3" size={props.itemSize}>
            DropdownItemElement3
          </DropdownItem>
          <DropdownItem code="DropdownItemElement4" disabled leftContent="user" size={props.itemSize}>
            DropdownItemElement4
          </DropdownItem>
          <DropdownItem
            code="DropdownItemElement1"
            subTitle="Еще один тайтл • email@worksolutions.ru"
            leftContent="user"
            size={props.itemSize}
          >
            DropdownItemElement1
          </DropdownItem>
          <DropdownItem code="DropdownItemElement2" subTitle="Еще один тайтл" size={props.itemSize}>
            DropdownItemElement2
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem size={props.itemSize} code="ValueByDefault">
            ValueByDefault
          </DropdownItem>
          <TooltipContainer tooltipText="text" primaryPlacement="right">
            {({ toggle }) => (
              <Wrapper onClick={toggle}>
                <Input value="baseValue" onChange={() => {}} />
              </Wrapper>
            )}
          </TooltipContainer>
        </List>
      </DropdownMenu>
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
