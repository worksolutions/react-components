import React from "react";

export enum ModalSize {
  ADJUST_CONTENT = "ADJUST_CONTENT",
  FULL_WIDTH = "FULL_WIDTH",
  SMALL = "SMALL",
}

export interface ModalInterface {
  size?: ModalSize;
  opened?: boolean;
  primaryActionText?: string;
  secondaryActionText?: string;
  primaryActionLoading?: boolean;
  secondaryActionLoading?: boolean;
  actionsInColumn?: boolean;
  preTitleContent?: React.ReactNode;
  title?: string;
  subTitle?: string;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  centerTitleAndSubtitle?: boolean;
  onClose?: () => void;
  onPrimaryAction?: (close: () => void) => void;
  onSecondaryAction?: (close: () => void) => void;
  children?: React.FC<{ close: () => void }> | React.ReactNode;
  actionsBlock?: ((close: () => void) => React.ReactNode) | React.ReactNode;
  wrappedContent?: React.FC<{ open: () => void }>;
}
