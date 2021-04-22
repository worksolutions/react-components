import { findElementInDOMParentTree, isFunction } from "@worksolutions/utils";

export function handleTriggerElementEventsForHover(
  triggerElement: HTMLElement,
  showDelay: number,
  context: { show: () => void; hide: () => void },
) {
  let showTimeout: any;
  function show() {
    showTimeout = setTimeout(context!.show, showDelay);
  }

  function hide() {
    clearTimeout(showTimeout);
    context!.hide();
  }

  triggerElement.addEventListener("mouseenter", show);
  triggerElement.addEventListener("mouseleave", hide);

  return () => {
    triggerElement.removeEventListener("mouseenter", show);
    triggerElement.removeEventListener("mouseleave", hide);
  };
}

export function handleTriggerElementEventsForClick(
  triggerElement: HTMLElement,
  context: { toggle: () => void },
  excludeElementsForClickEvent: HTMLElement[] | (() => HTMLElement[]) | undefined,
) {
  function clickListener(event: MouseEvent) {
    if (!excludeElementsForClickEvent) {
      context.toggle();
      return;
    }

    const excludeElements = isFunction(excludeElementsForClickEvent)
      ? excludeElementsForClickEvent()
      : excludeElementsForClickEvent;

    if (findElementInDOMParentTree(event.target as any, (element) => excludeElements.includes(element))) return;

    context.toggle();
  }

  triggerElement.addEventListener("click", clickListener);
  return () => {
    triggerElement.removeEventListener("click", clickListener);
  };
}
