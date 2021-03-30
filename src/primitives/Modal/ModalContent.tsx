import { observer } from "mobx-react-lite";
import React from "react";
import { isNil, last } from "ramda";

import {
  ai,
  backgroundColor,
  border,
  borderRadius,
  child,
  display,
  firstChild,
  flex,
  flexColumn,
  fullWidth,
  horizontalPadding,
  jc,
  marginLeft,
  marginTop,
  maxWidth,
  padding,
  paddingBottom,
  paddingTop,
  position,
  right,
  textAlign,
  top,
  verticalAlign,
  verticalPadding,
  width,
} from "../../styles";

import Typography from "../Typography";
import Button, { ButtonSize, ButtonType } from "../Button";
import HandleClickOutside from "../HandleClickOutside";
import Wrapper from "../Wrapper";
import { elevation32 } from "../../constants/shadows";

import { activeModal } from "./libs";
import { ModalInterface, ModalSize } from "./types";

const modalWidthBySize: Record<ModalSize, string | number> = {
  [ModalSize.FULL_WIDTH]: "100%",
  [ModalSize.ADJUST_CONTENT]: "auto",
  [ModalSize.SMALL]: 416,
};

export const modalHorizontalPadding = 24;

type ModalContentInterface = Omit<ModalInterface, "children" | "opened" | "onClose" | "wrappedContent"> & {
  id: number;
  close: () => void;
  children: React.ReactNode;
};

function ModalContent({
  actionsBlock,
  size = ModalSize.SMALL,
  title,
  subTitle,
  close,
  children,
  primaryActionText,
  secondaryActionText,
  primaryActionLoading,
  secondaryActionLoading,
  actionsInColumn,
  id,
  centerTitleAndSubtitle,
  preTitleContent,
  closeOnBackdropClick,
  showCloseButton = true,
  onPrimaryAction,
  onSecondaryAction,
}: ModalContentInterface) {
  const primaryAction = primaryActionText && onPrimaryAction && (
    <Button
      size={ButtonSize.LARGE}
      type={ButtonType.PRIMARY}
      loadingRight={primaryActionLoading}
      onClick={() => onPrimaryAction(close)}
    >
      {primaryActionText}
    </Button>
  );

  const secondaryAction = secondaryActionText && onSecondaryAction && (
    <Button
      size={ButtonSize.LARGE}
      type={ButtonType.SECONDARY}
      loadingRight={secondaryActionLoading}
      onClick={() => onSecondaryAction(close)}
    >
      {secondaryActionText}
    </Button>
  );

  const clickOutsideEnabled = isNil(closeOnBackdropClick)
    ? true
    : closeOnBackdropClick
    ? last(activeModal.activeModals) === id
    : false;

  const titleElement = title && (
    <Typography
      type="h2-bold"
      styles={[
        fullWidth,
        centerTitleAndSubtitle && textAlign("center"),
        horizontalPadding(modalHorizontalPadding),
        paddingTop(16),
        !subTitle && paddingBottom(24),
      ]}
    >
      {title}
    </Typography>
  );

  const closeButtonElement = showCloseButton && (
    <Button
      styles={[position("absolute"), right(16), top(16)]}
      size={ButtonSize.SMALL}
      type={ButtonType.ICON}
      iconLeft="cross-big"
      onClick={close}
    />
  );

  const subTitleElement = subTitle && (
    <Typography
      color="gray-blue/06"
      styles={[
        fullWidth,
        centerTitleAndSubtitle && textAlign("center"),
        horizontalPadding(modalHorizontalPadding),
        paddingTop(8),
        paddingBottom(24),
      ]}
    >
      {subTitle}
    </Typography>
  );
  return (
    <HandleClickOutside enabled={clickOutsideEnabled} onClickOutside={close}>
      {(ref) => (
        <Wrapper
          ref={ref}
          styles={[
            position("relative"),
            display("inline-block"),
            verticalAlign("middle"),
            maxWidth(`calc(100% - 80px)`),
            width(modalWidthBySize[size]),
            border(1, "gray-blue/02"),
            backgroundColor("white"),
            elevation32,
            borderRadius(8),
            textAlign("left"),
          ]}
        >
          {preTitleContent}
          {titleElement}
          {closeButtonElement}
          {subTitleElement}
          {children && <Wrapper styles={horizontalPadding(modalHorizontalPadding)}>{children}</Wrapper>}
          <Wrapper
            styles={[
              flex,
              actionsInColumn
                ? [flexColumn, child(marginTop(8)), firstChild(marginTop(0))]
                : [ai("center"), jc("flex-end"), child(marginLeft(12)), firstChild(marginLeft(0))],
              paddingTop(16),
              paddingBottom(24),
              horizontalPadding(modalHorizontalPadding),
            ]}
          >
            {primaryAction}
            {secondaryAction}
            {actionsBlock}
          </Wrapper>
        </Wrapper>
      )}
    </HandleClickOutside>
  );
}

export default observer(ModalContent);
