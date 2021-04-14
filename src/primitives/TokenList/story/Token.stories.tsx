import React from "react";
import { Story } from "@storybook/react/types-6-0";

import TokenListComponent, { TokenListInterface } from "../index";
import Token from "../Token";
import { append, propEq, remove } from "ramda";

export default {
  title: "TokenList",
  // @ts-ignore
  component: TokenListComponent.type.render,
};

const Template: Story<TokenListInterface> = (props) => {
  const [tokens, setTokens] = React.useState([
    { code: "0", title: "Есть риски" },
    { code: "1", title: "По плану" },
    { code: "2", title: "Заблокирована" },
  ]);

  const handleCreate = React.useCallback((title: string) => setTokens(append({ title, code: Math.random() })), []);

  const handleRemove = React.useCallback(
    (code: string) => setTokens(remove(tokens.findIndex(propEq("code", code)), 1)),
    [tokens],
  );

  return (
    <TokenListComponent {...props} onCreate={handleCreate}>
      {tokens.map((token) => (
        <Token key={token.code} title={token.title} code={token.code} canRemove onRemove={handleRemove} />
      ))}
    </TokenListComponent>
  );
};

export const TokenList = Template.bind({});

TokenList.args = {};
