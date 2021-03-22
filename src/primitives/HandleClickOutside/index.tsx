import React from "react";
import { useClickAway } from "react-use";

export type HandleClickOutsideIgnoreElements = (HTMLElement | undefined | null)[];

export interface HandleClickOutsideInterface {
  onClickOutside?: () => void;
  enabled?: boolean;
  ignoreElements?: HandleClickOutsideIgnoreElements;
  children: (ref: { current: HTMLElement | null }) => React.ReactNode;
}

const emptyFunc = () => null;

const HandleClickOutside = function ({
  children,
  ignoreElements,
  enabled = true,
  onClickOutside,
}: HandleClickOutsideInterface) {
  const ref = React.useRef<HTMLElement>(null);
  const handler = (event: Event) => {
    if (ignoreElements?.filter(Boolean).find((ignorableElement) => ignorableElement!.contains(event.target as any)))
      return;
    onClickOutside && onClickOutside();
  };

  useClickAway(ref, enabled ? handler : emptyFunc);

  return <>{children(ref)}</>;
};

export default React.memo(HandleClickOutside);
