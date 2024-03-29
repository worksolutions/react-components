import { observer } from "mobx-react-lite";
import React from "react";

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
  paddingBottom,
  paddingTop,
  position,
  right,
  textAlign,
  top,
  verticalAlign,
  width,
} from "../../styles";

import Typography from "../Typography";
import Button, { ButtonSize, ButtonType } from "../Button";
import HandleClickOutside from "../HandleClickOutside";
import Wrapper from "../Wrapper";
import { elevation32 } from "../../constants/shadows";

import { getClickOutsideIsEnabled } from "./internal/libs";
import { ModalInterface, ModalSize } from "./types";
import { getActionButton } from "./internal/getActionButton";

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
  styles,
  actionsBlock,
  size = ModalSize.SMALL,
  title,
  titleStyles,
  subTitle,
  subTitleStyles,
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
  const primaryAction = getActionButton({
    text: primaryActionText,
    type: ButtonType.PRIMARY,
    loading: primaryActionLoading,
    close,
    handleClick: onPrimaryAction,
  });

  const secondaryAction = getActionButton({
    text: secondaryActionText,
    type: ButtonType.SECONDARY,
    loading: secondaryActionLoading,
    close,
    handleClick: onSecondaryAction,
  });

  const clickOutsideEnabled = getClickOutsideIsEnabled(id, closeOnBackdropClick);

  const titleElement = title && (
    <Typography
      type="h2-bold"
      styles={[
        fullWidth,
        centerTitleAndSubtitle && textAlign("center"),
        horizontalPadding(modalHorizontalPadding),
        paddingTop(16),
        !subTitle && paddingBottom(24),
        titleStyles,
      ]}
    >
      {title}
    </Typography>
  );

  const closeButtonElement = showCloseButton && (
    <Button
      styles={[position("absolute"), right(18), top(18)]}
      size={ButtonSize.SMALL}
      type={ButtonType.ICON}
      iconLeft="cross-big"
      onClick={close}
    />
  );

  const subTitleElement = subTitle && (
    <Typography
      color="definitions.Modal.subtitleTextColor"
      styles={[
        fullWidth,
        centerTitleAndSubtitle && textAlign("center"),
        horizontalPadding(modalHorizontalPadding),
        paddingTop(8),
        paddingBottom(24),
        subTitleStyles,
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
            display("inline-flex"),
            flexColumn,
            verticalAlign("middle"),
            maxWidth(`calc(100% - 80px)`),
            width(modalWidthBySize[size]),
            border(1, "definitions.Modal.borderColor"),
            backgroundColor("definitions.Modal.backgroundColor"),
            elevation32,
            borderRadius(8),
            textAlign("left"),
            styles,
          ]}
        >
          {preTitleContent}
          {titleElement}
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
          {closeButtonElement}
        </Wrapper>
      )}
    </HandleClickOutside>
  );
}

export default observer(ModalContent);
