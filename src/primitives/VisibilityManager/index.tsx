import React, { useCallback, useMemo } from "react";
import { useBoolean } from "@worksolutions/react-utils";

import HandleClickOutside from "../HandleClickOutside";
import { VisibilityManagerContext } from "./VisibilityManagerContext";
import { VisibilityManagerContextInterface } from "./types";
import Wrapper from "../Wrapper";

export interface VisibilityManagerInterface {
  closeOnClickOutside?: boolean;
  closeAfterClick?: boolean;
  children: (data: VisibilityManagerContextInterface) => React.ReactNode;
}

function VisibilityManager({
  children,
  closeOnClickOutside = true,
  closeAfterClick = true,
}: VisibilityManagerInterface) {
  const [visibility, show, hide] = useBoolean(false);

  const toggle = useCallback(() => (visibility ? hide() : show()), [hide, show, visibility]);

  const visibilityManagerContextValue = useMemo(
    () => ({
      toggle,
      show,
      visibility,
      hide: () => closeAfterClick && hide(),
    }),
    [toggle, show, visibility, closeAfterClick, hide],
  );

  return (
    <VisibilityManagerContext.Provider value={visibilityManagerContextValue}>
      {closeOnClickOutside ? (
        <HandleClickOutside onClickOutside={hide}>
          {(ref) => <Wrapper ref={ref}>{children({ visibility, show, hide, toggle })}</Wrapper>}
        </HandleClickOutside>
      ) : (
        children({ visibility, show, hide, toggle })
      )}
    </VisibilityManagerContext.Provider>
  );
}

export default React.memo(VisibilityManager);
