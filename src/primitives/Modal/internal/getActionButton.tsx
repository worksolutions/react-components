import React from "react";

import Button, { ButtonSize, ButtonType } from "../../Button";

interface ActionButtonConfigInterface {
  text?: string;
  type: ButtonType;
  loading?: boolean;
  close: () => void;
  handleClick?: (close: () => void) => void;
}

export function getActionButton({ loading, text, type, handleClick, close }: ActionButtonConfigInterface) {
  if (!handleClick || !text) return null;
  return (
    <Button size={ButtonSize.LARGE} type={type} loadingRight={loading} onClick={() => handleClick(close)}>
      {text}
    </Button>
  );
}
