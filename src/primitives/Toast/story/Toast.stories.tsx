import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { useBoolean } from "@worksolutions/react-utils";

import { left, marginTop, position, transform } from "styles";

import Toast, { ToastComponentInterface } from "../index";
import Wrapper from "../../Wrapper";
import Typography from "../../Typography";
import Button from "../../Button";

export default {
  title: "Toast",
  component: Toast.type,
};

interface ToastStoriesInterface {
  cancelText: string;
  hasCancelButton: boolean;
}

const TemplateDefault: Story<ToastComponentInterface & ToastStoriesInterface> = (props) => {
  const [actionText, setActionText] = React.useState(props.text);
  React.useEffect(() => setActionText(props.text), [props.text]);

  const [deleted, deleteToast, rollback] = useBoolean(false);

  if (deleted) {
    return (
      <Wrapper styles={[marginTop(40), left("50%"), position("fixed"), transform("translateX(-50%)")]}>
        <Typography>Тост удален</Typography>
        <Button onClick={rollback}>Вернуть</Button>
      </Wrapper>
    );
  }

  return (
    <Toast
      {...props}
      text={actionText}
      cancelButton={
        props.hasCancelButton
          ? {
              text: props.cancelText,
              onClick: () => setActionText("Действие отменено"),
            }
          : undefined
      }
      removeToast={deleteToast}
    />
  );
};

export const Default = TemplateDefault.bind({});

Default.args = {
  text: "Удаление 12 файлов успешно завершено",
  cancelText: "Не удалять",
  hasCancelButton: false,
};
