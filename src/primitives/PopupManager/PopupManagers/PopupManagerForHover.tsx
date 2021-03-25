import React from "react";
import { Manager as ReactPopperManager, Reference as ReactPopperReference } from "react-popper";
import { provideRef } from "@worksolutions/react-utils";

import VisibilityManager, { VisibilityManagerContextInterface } from "../../VisibilityManager";
import { SetVisibilityContextAndTriggerRef } from "./types";

export interface PopperManagerForHoverInterface {
  popupElementNode: React.ReactNode;
  showDelay?: number;
  setVisibilityContextAndTriggerRef: SetVisibilityContextAndTriggerRef;
  renderTriggerElement: (data: Pick<Required<VisibilityManagerContextInterface>, "initRef" | "visible">) => JSX.Element;
}

function PopupManagerForHover({
  popupElementNode,
  setVisibilityContextAndTriggerRef,
  renderTriggerElement: TriggerElement,
}: PopperManagerForHoverInterface) {
  const Element = React.useCallback(
    (context: VisibilityManagerContextInterface) => (
      <>
        <ReactPopperReference>
          {({ ref: reactPopperReferenceRef }) => (
            <TriggerElement
              initRef={provideRef(context.initRef, reactPopperReferenceRef, setVisibilityContextAndTriggerRef(context))}
              visible={context.visible}
            />
          )}
        </ReactPopperReference>
      </>
    ),
    [TriggerElement, setVisibilityContextAndTriggerRef],
  );

  return (
    <>
      <ReactPopperManager>
        <VisibilityManager>{Element}</VisibilityManager>
        {popupElementNode}
      </ReactPopperManager>
    </>
  );
}

export default PopupManagerForHover;
