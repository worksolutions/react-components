import { VisibilityManagerContextInterface } from "../../VisibilityManager";

export type SetVisibilityContextAndTriggerRef = (
  context: VisibilityManagerContextInterface,
) => (triggerElement: HTMLElement | undefined) => void;
