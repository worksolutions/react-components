import { omit } from "ramda";
import areEqual from "./areEqual";

export default function areEqualWithIgnorePropNames(ignorePropNames: string[]) {
  return function (prevProps: any, nextProps: any) {
    const prevPropsWithoutIgnored = omit(ignorePropNames, prevProps);
    const nextPropsWithoutIgnored = omit(ignorePropNames, nextProps);

    return areEqual(prevPropsWithoutIgnored, nextPropsWithoutIgnored);
  };
}
