import { makeAutoObservable } from "mobx";
import { isNil, last } from "ramda";

class ActiveModal {
  constructor() {
    makeAutoObservable(this);
  }

  private _modalId = 0;

  activeModals: number[] = [];

  getModalId = () => {
    return ++this._modalId;
  };
}

export const activeModal = new ActiveModal();

export function getClickOutsideIsEnabled(id: number, closeOnBackdropClick?: boolean) {
  return isNil(closeOnBackdropClick) ? true : closeOnBackdropClick ? last(activeModal.activeModals) === id : false;
}
