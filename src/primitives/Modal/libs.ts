import { makeAutoObservable } from "mobx";

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