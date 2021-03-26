import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { ModalInterface, ModalSize } from "../types";

import Modal, { ModalComponent } from "../index";

import Button from "../../Button";
import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { selectControl } from "../../../storybook/storyHelpers";

export default {
  title: "Modal",
  component: ModalComponent,
  argTypes: {
    size: selectControl(Object.values(ModalSize)),
  },
};

const ModalTemplate: Story<ModalInterface> = (props) => {
  React.useEffect(() => {
    Modal.setRootElement(document.querySelector(".ws-box")!);
  }, []);

  return (
    <Modal {...props}>
      {() => (
        <Wrapper>
          <Typography>Тут некий контент</Typography>
        </Wrapper>
      )}
    </Modal>
  );
};

export const Default = ModalTemplate.bind({});

Default.args = {
  title: "Модальное окно 1",
  subTitle: "Вы уверены, что это модальное окно открыто?? И еще некий текст на новой строке",
  wrappedContent: (open) => <Button onClick={open}>Модальное окно</Button>,
  size: ModalSize.SMALL,
};
