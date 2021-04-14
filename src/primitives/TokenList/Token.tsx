import React, { Ref, SyntheticEvent } from "react";
import { stopPropagation } from "@worksolutions/react-utils";

import {
  ai,
  backgroundColor,
  borderNone,
  borderRadius,
  child,
  disableOutline,
  fillColor,
  flex,
  horizontalPadding,
  hover,
  maxWidth,
  padding,
  paddingLeft,
  paddingRight,
  pointer,
  transition,
} from "../../styles";

import Typography from "../Typography";
import Icon from "../Icon";
import Wrapper from "../Wrapper";
import { duration160 } from "../../constants/durations";
import { elevation8 } from "../../constants/shadows";

export interface TokenInterface<CODE extends string | number> {
  styles?: any;
  leftContent?: React.ReactNode;
  title: string | number;
  code: CODE;
  canRemove?: boolean;
  onRemove?: (code: CODE) => void;
}

function Token({ title, styles, leftContent, code, onRemove, canRemove }: TokenInterface<string>) {
  const handleRemove = React.useCallback(
    (ev: SyntheticEvent) => canRemove && onRemove && stopPropagation(() => onRemove(code))(ev),
    [canRemove, code, onRemove],
  );

  return (
    <Wrapper
      styles={[
        maxWidth("100%"),
        flex,
        ai("center"),
        padding(0),
        backgroundColor("definitions.Token.backgroundColor"),
        elevation8,
        disableOutline,
        borderNone,
        borderRadius(4),
        child(transition(`fill ${duration160}`), ".remove-icon use"),
        canRemove
          ? [
              pointer,
              paddingLeft(8),
              paddingRight(2),
              hover(fillColor("definitions.Token.removeIconHoverColor"), ".icon use"),
            ]
          : [horizontalPadding(8)],
        styles,
      ]}
      as="button"
      onClick={handleRemove}
    >
      {leftContent}
      <Typography dots>{title}</Typography>
      {canRemove && <Icon className="remove-icon" icon="cross-small" color="definitions.Token.removeIconColor" />}
    </Wrapper>
  );
}

export default React.memo(Token) as <CODE extends string | number>(
  props: TokenInterface<CODE> & { ref?: Ref<HTMLElement> },
) => JSX.Element;
