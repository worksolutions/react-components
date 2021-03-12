import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import {
  AvatarSize,
  backgroundColor,
  borderRadius,
  hover,
  ListItemSize,
  padding,
  width,
  Wrapper,
} from "../../../index";

import AvatarComponent from "../../Avatar";
import Icon from "../../Icon";
import DropdownItem from "../DropdownItem/DropdownItem";
import DropdownDivider from "../DropdownDivider";
import DropdownGroup, { DropdownGroupProps } from "../DropdownGroup/DropdownGroup";

import { left, marginRight, position, top, transform } from "styles";

export default {
  title: "DropDownMenu/DropdownGroup",
  component: DropdownGroup.type,
  argTypes: {},
};

const Template: Story<DropdownGroupProps> = (props: any) => {
  const [itemSize, setItemSize] = useState(ListItemSize.MEDIUM);
  const [hideElement, setHideElement] = useState(true);

  return (
    <Wrapper
      styles={[position("absolute"), top("40%"), left("50%"), marginRight("-50%"), transform("translate(-50%, -50%)")]}
    >
      <DropdownGroup {...props} styles={[width(250)]}>
        <DropdownItem itemSize={itemSize} code="ValueByDefault">
          ValueByDefault
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem code="DropdownItemElement3" itemSize={itemSize} disabled>
          DropdownItemElement3
        </DropdownItem>
        {hideElement && (
          <DropdownItem
            code="DropdownItemElement4"
            leftContent="user"
            itemSize={itemSize}
            rightContent={
              <Wrapper
                onClick={() => setHideElement(false)}
                styles={[padding(5), borderRadius("50%"), hover([backgroundColor("red/06")])]}
              >
                <Icon icon="delete" />
              </Wrapper>
            }
          >
            Удалить
          </DropdownItem>
        )}
        <DropdownItem
          code="DropdownItemElement1"
          subTitle="Еще один тайтл • email@worksolutions.ru"
          leftContent="user"
          itemSize={itemSize}
        >
          DropdownItemElement1
        </DropdownItem>
        <DropdownItem code="DropdownItemElement2" subTitle="Еще один тайтл" itemSize={itemSize}>
          DropdownItemElement2
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem
          itemSize={itemSize}
          code="ValueByDefault"
          rightContent={
            <Wrapper
              onClick={() => setItemSize(ListItemSize.LARGE)}
              styles={[padding(5), borderRadius("50%"), hover([backgroundColor("blue/05")])]}
            >
              <AvatarComponent size={AvatarSize.SMALL} />
            </Wrapper>
          }
        >
          ValueByDefault
        </DropdownItem>
      </DropdownGroup>
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {
  isHoveredItems: true,
};
