import React, { Ref } from "react";
import { eventValue } from "@worksolutions/utils";

import {
  flex,
  flexValue,
  flexWrap,
  height,
  lastChild,
  marginBottom,
  marginRight,
  minWidth,
  padding,
} from "../../styles";

import Form from "../Form";
import Wrapper from "../Wrapper";
import InputContainer, { InputContainerInterface } from "../InputContainer";

import { InputContainerSize } from "../InputContainer/enums";
import { createDefaultInputStyles } from "../InputContainer/libs";

export interface TokenListInterface extends Omit<InputContainerInterface, "size" | "outerRef"> {
  styles?: any;
  placeholder?: string;
  children: React.ReactNode;
  canCreate?: boolean;
  onCreate?: (title: string) => void;
}

function TokenList(
  {
    outerStyles,
    styles: stylesProp,
    placeholder,
    children,
    canCreate = true,
    onCreate,
    ...inputContainerProps
  }: TokenListInterface,
  ref: Ref<HTMLElement>,
) {
  const [value, setValue] = React.useState("");

  const handleCreateToken = React.useCallback(() => {
    if (!onCreate || value === "") return;
    setValue("");
    onCreate(value);
  }, [onCreate, value]);

  return (
    <InputContainer
      outerStyles={outerStyles}
      outerRef={ref}
      {...inputContainerProps}
      renderComponent={(styles) => {
        const childComponents = React.Children.toArray(children) as React.ReactElement<{ styles?: any }>[];
        return (
          <Wrapper styles={[styles, flex, flexWrap, padding("4px 4px 0 4px"), stylesProp]}>
            {childComponents.map((child) =>
              React.cloneElement(child, {
                styles: [marginRight(4), lastChild(marginRight(0), "&"), marginBottom(4), child.props.styles],
              }),
            )}
            {canCreate && (
              <Form styles={[height(24), flexValue(1), minWidth(140), marginBottom(4)]} onSubmit={handleCreateToken}>
                <Wrapper
                  as="input"
                  placeholder={placeholder}
                  styles={createDefaultInputStyles("definitions.InputContainerVariantDefault.placeholder")}
                  value={value}
                  onChange={eventValue(setValue)}
                />
              </Form>
            )}
          </Wrapper>
        );
      }}
    />
  );
}

export default React.memo(React.forwardRef(TokenList));
