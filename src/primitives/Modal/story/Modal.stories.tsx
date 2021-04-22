import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { useBoolean } from "@worksolutions/react-utils";

import { ModalInterface, ModalSize } from "../types";

import Modal from "../index";

import Button from "../../Button";
import Wrapper from "../../Wrapper";
import Typography from "../../Typography";

import { selectControl } from "../../../storybook/storyHelpers";

export default {
  title: "Modal",
  // @ts-ignore
  component: Modal.original,
  argTypes: {
    size: selectControl(Object.values(ModalSize)),
  },
};

const ModalTemplate: Story<ModalInterface> = (props) => {
  const [secondOpened, openSecond, closeSeconds] = useBoolean(false);

  React.useEffect(() => {
    Modal.setRootElement(document.querySelector(".ws-box")!);
  }, []);

  return (
    <>
      <Modal {...props} wrappedContent={({ open }) => <Button onClick={open}>Модальное окно 1</Button>}>
        {() => (
          <Wrapper>
            <Typography>Тут некий контент из окна 1</Typography>
          </Wrapper>
        )}
      </Modal>
      <Button onClick={openSecond}>Открыть 2</Button>
      {secondOpened && (
        <Modal {...props} opened onClose={closeSeconds}>
          {() => (
            <Wrapper>
              <Typography>Тут некий контент из окна 1</Typography>
            </Wrapper>
          )}
        </Modal>
      )}
    </>
  );
};

export const Default = ModalTemplate.bind({});

Default.args = {
  title: "Модальное окно 1",
  subTitle: "Вы уверены, что это модальное окно открыто?? И еще некий текст на новой строке",
  size: ModalSize.SMALL,
};
