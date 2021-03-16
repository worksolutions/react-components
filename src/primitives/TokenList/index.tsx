import React, { Ref } from "react";
import { eventValue, SuggestInterface } from "@worksolutions/utils";

import { flex, flexValue, flexWrap, height, marginBottom, marginRight, minWidth, padding } from "../../styles";

import Form from "../Form";
import Wrapper from "../Wrapper";
import InputContainer, { BaseInputWrapperInterface } from "../InputContainer";

import Token from "./Token";
import { InputContainerSize } from "../InputContainer/enums";
import { createDefaultInputStyles } from "../InputContainer/libs";

export interface TokenListInterface<CODE extends string | number> extends Omit<BaseInputWrapperInterface, "size"> {
  placeholder?: string;
  styles?: any;
  items: SuggestInterface<CODE>[];
  children?: React.ReactNode;
  canRemove?: boolean;
  canCreate?: boolean;
  onRemove?: (code: CODE) => void;
  onCreate?: (title: string) => void;
}

function TokenList(
  {
    outerStyles,
    styles: stylesProp,
    placeholder,
    items,
    children,
    canCreate = true,
    canRemove = true,
    onRemove,
    onCreate,
    ...InputContainerProps
  }: TokenListInterface<string>,
  ref: Ref<HTMLElement>,
) {
  const [value, setValue] = React.useState("");

  function onCreateToken() {
    onCreate && onCreate(value);
    setValue("");
  }

  function onRemoveToken(code: string) {
    onRemove && onRemove(code);
  }

  return (
    <InputContainer
      outerStyles={outerStyles}
      outerRef={ref}
      size={InputContainerSize.LARGE}
      {...InputContainerProps}
      renderComponent={(styles) => (
        <Wrapper styles={[styles, flex, flexWrap, padding("8px 8px 4px 8px"), stylesProp]}>
          {items.map(({ code, title }) => (
            <Token
              key={code}
              styles={[marginRight(4), marginBottom(4)]}
              title={title}
              canRemove={canRemove}
              remove={() => onRemoveToken(code)}
            />
          ))}
          {canCreate && (
            <Form styles={[height(24), flexValue(1), minWidth(140), marginBottom(4)]} onSubmit={onCreateToken}>
              <Wrapper
                as="input"
                placeholder={items.length === 0 ? placeholder : ""}
                styles={createDefaultInputStyles()}
                value={value}
                onChange={eventValue(setValue)}
              />
            </Form>
          )}
          {children}
        </Wrapper>
      )}
    />
  );
}

export default React.memo(React.forwardRef(TokenList)) as <CODE extends string | number>(
  props: TokenListInterface<CODE> & { ref?: Ref<HTMLElement> },
) => JSX.Element;
