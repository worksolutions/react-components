import React from "react";

import * as stylesBuilders from "../styles";

export function reactStylesToStylesComponent(reactStyles: React.CSSProperties): any {
  if (!reactStyles) return null;
  const stylesComponents: any = [];

  Object.entries(reactStyles).forEach(([key, value]: [any, React.CSSProperties]) => {
    // @ts-ignore
    const cssCondition: any = stylesBuilders[key] as any;
    if (cssCondition || !value) stylesComponents.push(cssCondition(value));
  });

  return stylesComponents;
}
