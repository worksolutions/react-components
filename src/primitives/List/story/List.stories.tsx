import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { border, ButtonSize, ButtonType, List, ListItem, ListItemSize, marginLeft } from "../../../index";

import ListItemsDivider from "../ListItemsDivider";
import { selectControl } from "../../../storybook/storyHelpers";
import Button from "../../Button";
import Avatar from "../../Avatar";

export default {
  title: "List",
  component: List.type,
  argTypes: {
    itemSize: selectControl(Object.values(ListItemSize)),
  },
};

const Template: Story<{
  itemSize: ListItemSize;
}> = (props) => {
  return (
    <List outerStyles={[border(1, "gray-blue/02", "dashed")]} {...props}>
      <ListItem size={props.itemSize}>Прсто текст</ListItem>
      <ListItem size={props.itemSize} disabled>
        Выключено
      </ListItem>
      <ListItem size={props.itemSize} leftContent="save-outline" rightContent="notes">
        Иконки слева и справа
      </ListItem>
      <ListItem size={props.itemSize} rightContent="notes" showArrowWhenSelected selected>
        Стрелка справа при выборе
      </ListItem>
      <ListItemsDivider />
      <ListItem size={props.itemSize} hoverable>
        Можно навести
      </ListItem>
      <ListItem leftContent={<Avatar />} size={props.itemSize} hoverable>
        Аватар
      </ListItem>
      <ListItem size={props.itemSize} rightContent="save-outline" hoverable showRightContentOnHover>
        Можно навести - появится иконка
      </ListItem>
      <ListItem
        subTitle="Дополнительный текст"
        leftContent="user"
        size={props.itemSize}
        rightContent={
          <Button styles={[marginLeft(8)]} size={ButtonSize.SMALL} type={ButtonType.SECONDARY}>
            Кнопочка
          </Button>
        }
      >
        Основной текст
      </ListItem>
    </List>
  );
};

export const Default = Template.bind({});

Default.args = {
  itemSize: ListItemSize.MEDIUM,
};
