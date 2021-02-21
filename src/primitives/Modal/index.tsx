import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { isNil, without } from "ramda";
import { observer } from "mobx-react-lite";
import { useBoolean, useEffectSkipFirst } from "@worksolutions/react-utils";

import {
  bottom,
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
  backgroundColor,
  createAlphaColor,
} from "../../styles";

import Wrapper from "../Wrapper";

import { activeModal, ModalContent, ModalInterface, ModalSize } from "./ModalContent";
import { zIndex_modal } from "../../constants/zIndexes";
import { Colors } from "../..";

function Modal({
  actionBlock,
  opened: openedProp,
  size = ModalSize.SMALL,
  wrappedContent,
  title,
  onSecondaryAction,
  onPrimaryAction,
  secondaryActionText,
  primaryActionText,
  subTitle,
  onClose,
  children,
  secondaryActionLoading,
  primaryActionLoading,
  actionsInColumn,
  closeOnBackdropClick,
}: ModalInterface) {
  const [root] = React.useState(() => document.getElementById("root")!);

  const [opened, open, close] = useBoolean(() => (isNil(openedProp) ? false : openedProp));

  useEffectSkipFirst(() => {
    if (openedProp) {
      open();
      return;
    }
    close();
  }, [openedProp]);

  const modalId = React.useMemo(activeModal.getModalId, []);

  React.useEffect(() => {
    if (opened) {
      activeModal.activeModals.push(modalId);
      return;
    }
    activeModal.activeModals = without([modalId], activeModal.activeModals);
  }, [opened]);

  useEffectSkipFirst(() => {
    if (opened) return;
    onClose && onClose();
  }, [opened]);

  return (
    <>
      {wrappedContent && wrappedContent(open)}
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
              overflow("overlay" as CSSProperties["overflowY"]),
              backgroundColor(createAlphaColor("gray-blue/09", 122)),
            ]}
          >
            <Wrapper styles={[position("absolute"), left(0), top(0), fullWidth, fullHeight, textAlign("center")]}>
              <Wrapper styles={[display("inline-block"), fullHeight, verticalAlign("middle")]} />
              <ModalContent
                actionBlock={actionBlock}
                closeOnBackdropClick={closeOnBackdropClick}
                id={modalId}
                size={size}
                title={title}
                close={close}
                subTitle={subTitle}
                onPrimaryAction={onPrimaryAction}
                onSecondaryAction={onSecondaryAction}
                primaryActionText={primaryActionText}
                secondaryActionText={secondaryActionText}
                primaryActionLoading={primaryActionLoading}
                secondaryActionLoading={secondaryActionLoading}
                actionsInColumn={actionsInColumn}
              >
                {children && children()}
              </ModalContent>
            </Wrapper>
          </Wrapper>,
          root,
        )}
    </>
  );
}

export default React.memo(observer(Modal));
