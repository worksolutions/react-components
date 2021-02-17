import { omit } from "ramda";
import areEqual from "./areEqual";

export default function areEqualWithIgnorePropNames<T>(ignorePropNames: string[]) {
  return function (prevProps: T, nextProps: T) {
    const prevPropsWithoutIgnored = omit(ignorePropNames, prevProps);
    const nextPropsWithoutIgnored = omit(ignorePropNames, nextProps);

    return areEqual(prevPropsWithoutIgnored, nextPropsWithoutIgnored);
  };
}
