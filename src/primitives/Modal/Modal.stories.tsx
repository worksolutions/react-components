import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "../../storybookWrapper";
import Modal from "./index";
import { ModalInterface, ModalSize } from "./ModalContent";
import Button from "../Button";

export default {
  title: "Modal",
  component: Modal.type,
  decorators: [storybookWrapper],
};

const ModalTemplate: Story<ModalInterface> = (props) => <Modal {...props} />;

export const ProgressInput = ModalTemplate.bind({});

ProgressInput.args = {
  size: ModalSize.ADJUST_CONTENT,
  title: "Модальное окно 1",
  subTitle: "Вы уверены, что это модальное окно открыто?? И еще некий текст на новой строке",
  wrappedContent: (open) => <Button onClick={open}>Модальное окно</Button>,
  primaryActionText: "Действие 1",
  closeOnBackdropClick: true,
  onPrimaryAction: (close) => close(),
};
