import React from "react";
import { provideRef } from "@worksolutions/react-utils";
import { observer } from "mobx-react-lite";

import VisibilityManager, { VisibilityManagerContextInterface } from "../../VisibilityManager";
import { SetVisibilityContextAndTriggerRef } from "./types";
import { Manager } from "../../Popper/Manager";
import { Reference } from "../../Popper/Reference";

export type PopupManagerForExternalControlTriggerElementContext = Required<VisibilityManagerContextInterface>;

export interface PopupManagerForExternalControlInterface {
  popupElementNode: React.ReactNode;
  setVisibilityContextAndTriggerRef: SetVisibilityContextAndTriggerRef;
  renderTriggerElement: (context: PopupManagerForExternalControlTriggerElementContext) => JSX.Element;
}

function PopupManagerForExternalControl({
  popupElementNode,
  renderTriggerElement: TriggerElement,
  setVisibilityContextAndTriggerRef,
}: PopupManagerForExternalControlInterface) {
  const Element = React.useCallback(
    (context: VisibilityManagerContextInterface) => (
      <>
        <Reference>
          {({ ref: reactPopperReferenceRef }) => (
            <TriggerElement
              toggle={context.toggle}
              visible={context.visible}
              hide={context.hide}
              show={context.show}
              initRef={provideRef(context.initRef, reactPopperReferenceRef, setVisibilityContextAndTriggerRef(context))}
            />
          )}
        </Reference>
      </>
    ),
    [TriggerElement, setVisibilityContextAndTriggerRef],
  );

  return (
    <>
      <Manager>
        <VisibilityManager closeOnClickOutside={false}>{Element}</VisibilityManager>
        {popupElementNode}
      </Manager>
    </>
  );
}

export default observer(PopupManagerForExternalControl);
