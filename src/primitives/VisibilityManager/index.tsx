import React, { useCallback, useMemo } from "react";
import { useBoolean } from "@worksolutions/react-utils";

import HandleClickOutside from "../HandleClickOutside";
import { VisibilityManagerContext } from "./VisibilityManagerContext";
import { VisibilityManagerContextInterface } from "./types";

export interface VisibilityManagerInterface {
  closeOnClickOutside?: boolean;
  ignoreElements?: (HTMLElement | undefined | null)[];
  children: (data: VisibilityManagerContextInterface) => JSX.Element;
}

function VisibilityManager({
  children: Children,
  closeOnClickOutside = true,
  ignoreElements,
}: VisibilityManagerInterface) {
  const [visible, show, hide] = useBoolean(false);

  const toggle = useCallback(() => (visible ? hide() : show()), [hide, show, visible]);

  const visibilityManagerContextValue = useMemo<VisibilityManagerContextInterface>(
    () => ({ visible, toggle, show, hide }),
    [toggle, show, visible, hide],
  );

  return (
    <VisibilityManagerContext.Provider value={visibilityManagerContextValue}>
      {closeOnClickOutside ? (
        <HandleClickOutside onClickOutside={hide} ignoreElements={ignoreElements}>
          {(ref) => <Children initRef={ref} visible={visible} show={show} hide={hide} toggle={toggle} />}
        </HandleClickOutside>
      ) : (
        <Children visible={visible} show={show} hide={hide} toggle={toggle} />
      )}
    </VisibilityManagerContext.Provider>
  );
}

export default React.memo(VisibilityManager);
