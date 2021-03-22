import React from "react";
import { Manager as ReactPopperManager, Reference as ReactPopperReference } from "react-popper";
import { provideRef } from "@worksolutions/react-utils";

import VisibilityManager, { VisibilityManagerContextInterface } from "../../VisibilityManager";
import { SetVisibilityContextAndTriggerRef } from "./types";

export interface PopupManagerForClickInterface {
  popupElementNode: React.ReactNode;
  closeOnClickOutside?: boolean;
  setVisibilityContextAndTriggerRef: SetVisibilityContextAndTriggerRef;
  renderTriggerElement: (data: Required<VisibilityManagerContextInterface>) => JSX.Element;
}

function PopupManagerForClick({
  popupElementNode,
  closeOnClickOutside,
  renderTriggerElement: TriggerElement,
  setVisibilityContextAndTriggerRef,
}: PopupManagerForClickInterface) {
  const [popupElementHtmlNode, setPopupElementHtmlNode] = React.useState<HTMLElement | undefined>(undefined);

  const Element = React.useCallback(
    (context: VisibilityManagerContextInterface) => (
      <>
        <ReactPopperReference>
          {({ ref: reactPopperReferenceRef }) => (
            <TriggerElement
              {...context}
              initRef={provideRef(context.initRef, reactPopperReferenceRef, setVisibilityContextAndTriggerRef(context))}
            />
          )}
        </ReactPopperReference>
      </>
    ),
    [TriggerElement, setVisibilityContextAndTriggerRef],
  );

  const ignoreElements = React.useMemo(() => [popupElementHtmlNode], [popupElementHtmlNode]);

  return (
    <ReactPopperManager>
      <VisibilityManager outsideClickIgnoreElements={ignoreElements} closeOnClickOutside={closeOnClickOutside}>
        {Element}
      </VisibilityManager>
      {popupElementNode && React.cloneElement(popupElementNode as any, { ref: setPopupElementHtmlNode })}
    </ReactPopperManager>
  );
}

export default PopupManagerForClick;
