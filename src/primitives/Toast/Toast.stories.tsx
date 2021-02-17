import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { storybookWrapper } from "storybookWrapper";
import { left, marginTop, position, transform } from "styles";

import Toast, { ToastPropsInterface } from "./index";
import Wrapper from "../Wrapper";

export default {
  title: "Toast/Toasts/Toast",
  decorators: [storybookWrapper],
};

interface ToastStoriesInterface {
  cancelText: string;
  haveCancelButton: boolean;
}

const TemplateDefault: Story<ToastPropsInterface & ToastStoriesInterface> = (props) => {
  const [actionText, setActionText] = React.useState(props.text);
  const [isOpened, setOpened] = React.useState(true);

  const cancelButton = {
    text: props.cancelText,
    onClick: () => setActionText("Действие отменено"),
  };

  if (!isOpened) {
    return (
      <Wrapper styles={[marginTop(40), left("50%"), position("fixed"), transform("translateX(-50%)")]}>Удален</Wrapper>
    );
  }

  return props.haveCancelButton ? (
    <Toast {...props} text={actionText} cancelButton={cancelButton} removeToast={() => setOpened(false)} />
  ) : (
    <Toast {...props} text={actionText} removeToast={() => setOpened(false)} />
  );
};

export const Default = TemplateDefault.bind({});

Default.args = {
  text: "Удаление 214124 файлов",
  cancelText: "Не удалять",
  error: false,
  haveCancelButton: true,
};
