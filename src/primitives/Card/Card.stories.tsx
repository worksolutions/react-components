import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";
import { numbersControl, selectControl } from "storyHelpers";

import { CardActionInterface, CardComponentInterface, CardStatusIconSize, CardStatusInterface } from "./index";
import Card from "./index";
import { backgroundColor, child, content, height, position, width } from "../../styles";
import { TypographyLink } from "../../index";

export default {
  title: "Card",
  component: Card,
  decorators: [storybookWrapper],
  argsType: {
    size: selectControl(Object.values(CardStatusIconSize)),
    aspectRatio: numbersControl(0, 20, 0.25),
  },
};

const actions: CardActionInterface[] = [
  {
    name: "Редактировать",
    icon: "edit",
    iconColor: "gray-blue/05",
    loading: false,
    handler: async () => console.log("asd"),
  },
  {
    name: "Опубликовать",
    icon: "bolt-alt",
    iconColor: "green/05",
    loading: false,
    handler: async () => console.log("asd"),
  },
];
function setSizeStatuses(size: any): CardStatusInterface[] {
  return [{ icon: "badge", color: "orange/05", hint: "Не опубликовано", size: size }];
}

function setImageConfig(aspectRatio: number) {
  return { aspectRatio: aspectRatio };
}

const CardTemplate: Story<CardComponentInterface & Record<string, any>> = (card) => {
  const props = {
    ...card,
    actions,
    statuses: setSizeStatuses(card.size),
    imageConfig: setImageConfig(card.aspectRatio),
  };

  return (
    <TypographyLink
      to="asd"
      styles={[
        width(200),
        height(200),
        backgroundColor("blue/04"),
        position("relative"),
        child([content(""), position("absolute"), backgroundColor("red/08"), width(20), height(20)], ":after"),
      ]}
    >
      123
    </TypographyLink>
  );
  return <Card {...props} />;
};

export const CardBlock = CardTemplate.bind({});

CardBlock.args = {
  size: CardStatusIconSize.SMALL,
  heading: "14 ноября 2020",
  title: "123asdasdasdah",
  image: "https://worksolutions.ws-dev.ru/storage/KAhU7hcCaHkcjc0PHl3qx0uZFLxgNgbfLFK72mmu.png",
  aspectRatio: 1.6,
  id: 39,
};
