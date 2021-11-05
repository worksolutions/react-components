import React from "react";
import { provideRef } from "@worksolutions/react-utils";
import { observer } from "mobx-react-lite";

import { Reference } from "primitives/Popper/Reference";
import { Manager } from "primitives/Popper/Manager";

import VisibilityManager, { VisibilityManagerContextInterface } from "../../VisibilityManager";
import { SetVisibilityContextAndTriggerRef } from "./types";

export type PopupManagerForClickTriggerElementContext = Required<VisibilityManagerContextInterface>;

export interface PopupManagerForClickInterface {
  popupElementNode: React.ReactNode;
  closeOnClickOutside?: boolean;
  excludeElementsForClickEvent?: HTMLElement[] | (() => HTMLElement[]);
  setVisibilityContextAndTriggerRef: SetVisibilityContextAndTriggerRef;
  renderTriggerElement: (context: PopupManagerForClickTriggerElementContext) => JSX.Element;
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
        <Reference>
          {({ ref: reactPopperReferenceRef }) => (
            <TriggerElement
              {...context}
              initRef={provideRef(context.initRef, reactPopperReferenceRef, setVisibilityContextAndTriggerRef(context))}
            />
          )}
        </Reference>
      </>
    ),
    [TriggerElement, setVisibilityContextAndTriggerRef],
  );

  const ignoreElements = React.useMemo(() => [popupElementHtmlNode], [popupElementHtmlNode]);

  return (
    <Manager>
      <VisibilityManager outsideClickIgnoreElements={ignoreElements} closeOnClickOutside={closeOnClickOutside}>
        {Element}
      </VisibilityManager>
      {popupElementNode && React.cloneElement(popupElementNode as any, { ref: setPopupElementHtmlNode })}
    </Manager>
  );
}

export default observer(PopupManagerForClick);
