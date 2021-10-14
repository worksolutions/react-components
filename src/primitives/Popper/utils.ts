import { Ref } from "react";
import { any } from "ramda";

export const safeInvoke = <F>(fn?: any, ...args: any): any => {
  if (typeof fn === "function") {
    return fn(...args);
  }
};

export const setRef = (ref: any, node?: HTMLElement): void => {
  // if its a function call it
  if (typeof ref === "function") {
    return safeInvoke(ref, node);
  }
  // otherwise we should treat it as a ref object
  else if (ref != null) {
    ref.current = node;
  }
};

export const fromEntries = (entries: Array<[string, any]>): { [key: string]: any } =>
  entries.reduce((acc: any, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
export const unwrapArray = (arg: any): any => (Array.isArray(arg) ? arg[0] : arg);
