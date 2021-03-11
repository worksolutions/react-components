import React from "react";
import { buildStyles } from "@worksolutions/react-utils";
const styles = buildStyles();

export function reactStylesToStylesComponent(reactStyles: React.CSSProperties): any {
  if (!reactStyles) return [];
  const stylesComponents: any = [];
  console.log(reactStyles);
  Object.entries(reactStyles).forEach(([key, value]) => {
    // @ts-ignore
    const cssCondition = styles[key];
    if (cssCondition || !value) stylesComponents.push(cssCondition(value));
  });
  return stylesComponents;
}
