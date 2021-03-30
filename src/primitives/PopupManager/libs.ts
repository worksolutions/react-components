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

export function handleTriggerElementEventsForClick(triggerElement: HTMLElement, context: { toggle: () => void }) {
  triggerElement.addEventListener("click", context.toggle);
  return () => {
    triggerElement.removeEventListener("click", context.toggle);
  };
}
