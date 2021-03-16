import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { horizontalPadding, Typography } from "index";

import Modal from "../index";
import { modalHorizontalPadding, ModalInterface, ModalSize } from "../ModalContent";
import Button from "../../Button";
import Wrapper from "../../Wrapper";

export default {
  title: "Modal",
  component: Modal.type,
};

const ModalTemplate: Story<ModalInterface> = (props) => {
  const [primaryLoading, setPrimaryLoading] = React.useState(false);
  const [actionsInColumn, setActionsInColumn] = React.useState(false);
  const [size] = React.useState(ModalSize.SMALL);

  return (
    <Modal
      size={size}
      {...props}
      onPrimaryAction={(close) => {
        setPrimaryLoading(true);
        setTimeout(() => {
          setPrimaryLoading(false);
          close();
        }, 1000);
      }}
      primaryActionLoading={primaryLoading}
      actionsInColumn={actionsInColumn}
      onSecondaryAction={() => setActionsInColumn(!actionsInColumn)}
    >
      {() => (
        <Wrapper styles={horizontalPadding(modalHorizontalPadding)}>
          <Typography>Тут некий контент</Typography>
          <Modal
            size={size}
            title="Модальное окно 2"
            subTitle="1"
            closeOnBackdropClick={false}
            wrappedContent={(open) => <Button onClick={open}>Модальное окно 2</Button>}
          >
            {() => (
              <Wrapper styles={horizontalPadding(modalHorizontalPadding)}>
                <Typography>Modal 2</Typography>
              </Wrapper>
            )}
          </Modal>
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
  primaryActionText: "Действие 1",
  secondaryActionText: "Переставить действия",
  closeOnBackdropClick: true,
};
