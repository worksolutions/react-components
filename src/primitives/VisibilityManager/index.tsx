import React, { useCallback } from "react";
import { provideRef, useBoolean } from "@worksolutions/react-utils";

import HandleClickOutside, { HandleClickOutsideIgnoreElements } from "../HandleClickOutside";

export interface VisibilityManagerContextInterface {
  initRef?: React.Ref<HTMLElement>;
  visible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

export interface VisibilityManagerInterface {
  closeOnClickOutside?: boolean;
  outsideClickIgnoreElements?: HandleClickOutsideIgnoreElements;
  children: React.FC<VisibilityManagerContextInterface>;
}

function VisibilityManager(
  { children: Children, closeOnClickOutside = true, outsideClickIgnoreElements }: VisibilityManagerInterface,
  childrenRef?: React.Ref<HTMLElement>,
) {
  const [visible, show, hide] = useBoolean(false);

  const toggle = useCallback(() => (visible ? hide() : show()), [hide, show, visible]);

  if (closeOnClickOutside)
    return (
      <HandleClickOutside onClickOutside={hide} ignoreElements={outsideClickIgnoreElements}>
        {(ref) => (
          <Children initRef={provideRef(ref, childrenRef)} visible={visible} show={show} hide={hide} toggle={toggle} />
        )}
      </HandleClickOutside>
    );

  return <Children initRef={childrenRef} visible={visible} show={show} hide={hide} toggle={toggle} />;
}

export default React.memo(React.forwardRef(VisibilityManager));
