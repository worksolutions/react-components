import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { useToggle } from "@worksolutions/react-utils";

import DrawerComponent, { DrawerInterface } from "../index";
import Button from "../../../primitives/Button";

export default {
  title: "Drawer",
  // @ts-ignore
  component: DrawerComponent.baseElement,
};

const DrawerTemplate: Story<DrawerInterface> = (props) => {
  const [opened, toggle] = useToggle(false);

  React.useEffect(() => {
    DrawerComponent.setRootElement(document.querySelector(".ws-box")!);
  }, []);

  return (
    <>
      <Button onClick={toggle}>OPEN</Button>
      <DrawerComponent {...props} opened={opened} onClose={toggle}>
        {({ close }) => <Button onClick={close}>Close</Button>}
      </DrawerComponent>
    </>
  );
};

export const Drawer = DrawerTemplate.bind({});

Drawer.args = {};
