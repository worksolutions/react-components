import React from "react";
import ReactDOM from "react-dom";
import { isNil, without } from "ramda";
import { useBoolean, useEffectSkipFirst } from "@worksolutions/react-utils";
import { isFunction } from "@worksolutions/utils";
import { observer } from "mobx-react-lite";

import {
  backgroundColor,
  bottom,
  createAlphaColor,
  display,
  fullHeight,
  fullWidth,
  left,
  overflow,
  position,
  right,
  textAlign,
  top,
  verticalAlign,
} from "../../styles";

import Wrapper from "../Wrapper";

import ModalContent from "./ModalContent";
import { zIndex_modal } from "../../constants/zIndexes";
import { activeModal } from "./internal/libs";
import { ModalInterface } from "./types";

function Modal({
  opened: openedProp,
  wrappedContent: WrapperComponent,
  rootElement,
  onClose,
  children: Children,
  ...props
}: ModalInterface & { rootElement?: HTMLElement }) {
  const [opened, open, close] = useBoolean(() => (isNil(openedProp) ? false : openedProp));
  useEffectSkipFirst(() => {
    openedProp ? open() : close();
  }, [openedProp]);

  const root = React.useMemo(() => (opened ? rootElement || Modal._rootElement : null), [opened, rootElement]);

  const modalId = React.useMemo(() => activeModal.getModalId(), []);

  React.useEffect(() => {
    if (opened) {
      activeModal.activeModals.push(modalId);
      return;
    }
    activeModal.activeModals = without([modalId], activeModal.activeModals);
  }, [modalId, opened]);

  useEffectSkipFirst(() => {
    if (opened) return;
    onClose && onClose();
  }, [opened]);

  return (
    <>
      {WrapperComponent && <WrapperComponent open={open} />}
      {opened &&
        ReactDOM.createPortal(
          <Wrapper
            styles={[
              zIndex_modal,
              position("fixed"),
              left(0),
              top(0),
              bottom(0),
              right(0),
              overflow("overlay"),
              backgroundColor(createAlphaColor("gray-blue/09", 122)),
            ]}
          >
            <Wrapper styles={[position("absolute"), left(0), top(0), fullWidth, fullHeight, textAlign("center")]}>
              <Wrapper styles={[display("inline-block"), fullHeight, verticalAlign("middle")]} />
              <ModalContent {...props} id={modalId} close={close}>
                {isFunction(Children) ? <Children close={close} /> : Children}
              </ModalContent>
            </Wrapper>
          </Wrapper>,
          root!,
        )}
    </>
  );
}

Modal._rootElement = document.body;

Modal.setRootElement = function (element: HTMLElement) {
  Modal._rootElement = element;
};

const WrapperModal = observer(Modal);

// @ts-ignore
WrapperModal.original = Modal;

export default WrapperModal;
