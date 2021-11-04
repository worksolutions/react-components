import React from "react";
import { provideRef } from "@worksolutions/react-utils";
import { observer } from "mobx-react-lite";

import { Reference } from "primitives/Popper/Reference";
import { Manager } from "primitives/Popper/Manager";

import VisibilityManager, { VisibilityManagerContextInterface } from "../../VisibilityManager";
import { SetVisibilityContextAndTriggerRef } from "./types";

export type PopupManagerForHoverTriggerElementContext = Pick<
  Required<VisibilityManagerContextInterface>,
  "initRef" | "visible"
>;

export interface PopperManagerForHoverInterface {
  popupElementNode: React.ReactNode;
  showDelay?: number;
  setVisibilityContextAndTriggerRef: SetVisibilityContextAndTriggerRef;
  renderTriggerElement: (context: PopupManagerForHoverTriggerElementContext) => JSX.Element;
}

function PopupManagerForHover({
  popupElementNode,
  setVisibilityContextAndTriggerRef,
  renderTriggerElement: TriggerElement,
}: PopperManagerForHoverInterface) {
  const Element = React.useCallback(
    (context: VisibilityManagerContextInterface) => (
      <>
        <Reference>
          {({ ref: reactPopperReferenceRef }) => (
            <TriggerElement
              initRef={provideRef(context.initRef, reactPopperReferenceRef, setVisibilityContextAndTriggerRef(context))}
              visible={context.visible}
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
        <VisibilityManager>{Element}</VisibilityManager>
        {popupElementNode}
      </Manager>
    </>
  );
}

export default observer(PopupManagerForHover);
