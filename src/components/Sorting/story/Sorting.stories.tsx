import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { selectControl } from "../../../storybook/storyHelpers";

import SortingComponent, { SelectedSortingItem, SortingInterface } from "../index";
import { SortingDirection, SortingItem } from "../types";
import Wrapper from "../../../primitives/Wrapper";
import Typography from "../../../primitives/Typography";
import { marginTop, whiteSpace } from "../../../styles";
import { ButtonSize } from "../../../primitives/Button";
import { ListItemSize } from "../../../primitives/List/ListItem/enum";

export default {
  title: "Sorting",
  // @ts-ignore
  component: SortingComponent.baseElement,
  argTypes: {
    defaultDirectionAfterChange: selectControl(Object.keys(SortingDirection)),
    buttonSize: selectControl(Object.keys(ButtonSize)),
    listItemSize: selectControl(Object.keys(ListItemSize)),
  },
};

const SortingTemplate: Story<SortingInterface> = (props) => {
  const items: SortingItem[] = React.useMemo(
    () => [
      { id: "date", title: "Дата создания", hasDirection: true },
      { id: "magic", title: "По магическому параметру", hasDirection: false },
    ],
    [],
  );

  const [selected, setSelected] = React.useState<SelectedSortingItem>(() => ({
    id: "date",
  }));

  return (
    <Wrapper>
      <SortingComponent
        {...props}
        items={items}
        selected={selected}
        onChange={(value) => {
          setSelected(value);
          props.onChange(value);
        }}
      />
      <Typography styles={[marginTop(12), whiteSpace("pre")]}>
        selected = {JSON.stringify(selected, null, 4)}
      </Typography>
    </Wrapper>
  );
};

export const Sorting = SortingTemplate.bind({});

Sorting.args = {};
