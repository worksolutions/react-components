import React from "react";
import { Manager as ReactPopperManager, Reference as ReactPopperReference } from "react-popper";
import { provideRef } from "@worksolutions/react-utils";
import { observer } from "mobx-react-lite";

import VisibilityManager, { VisibilityManagerContextInterface } from "../../VisibilityManager";
import { SetVisibilityContextAndTriggerRef } from "./types";

export interface PopupManagerForExternalControlInterface {
  popupElementNode: React.ReactNode;
  setVisibilityContextAndTriggerRef: SetVisibilityContextAndTriggerRef;
  renderTriggerElement: (data: Required<VisibilityManagerContextInterface>) => JSX.Element;
}

function PopupManagerForExternalControl({
  popupElementNode,
  renderTriggerElement: TriggerElement,
  setVisibilityContextAndTriggerRef,
}: PopupManagerForExternalControlInterface) {
  const Element = React.useCallback(
    (context: VisibilityManagerContextInterface) => (
      <>
        <ReactPopperReference>
          {({ ref: reactPopperReferenceRef }) => (
            <TriggerElement
              toggle={context.toggle}
              visible={context.visible}
              hide={context.hide}
              show={context.show}
              initRef={provideRef(context.initRef, reactPopperReferenceRef, setVisibilityContextAndTriggerRef(context))}
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
        <VisibilityManager closeOnClickOutside={false}>{Element}</VisibilityManager>
        {popupElementNode}
      </ReactPopperManager>
    </>
  );
}

export default observer(PopupManagerForExternalControl);
