import { makeAutoObservable } from "mobx";
import { without } from "ramda";

import type { ToastInterface } from "../../primitives/Toast";

interface InternalToastInterface {
  id: number;
  removeSubscriber: any;
  toast: ToastInterface;
}

export default class ToastsController {
  static defaultAutoRemoveTime = 4000;

  constructor() {
    makeAutoObservable(this);
  }

  toasts: InternalToastInterface[] = [];

  private _id = 0;

  private generateId() {
    return this._id++;
  }

  addToast(toast: ToastInterface) {
    const newToast = { id: this.generateId(), removeSubscriber: null, toast };
    this.toasts.push(newToast);
    this.subscribeToastRemove(newToast);
  }

  removeToast(toastId: number) {
    this.deleteToastFromList(toastId);
    this.unSubscribeToastRemove(toastId);
  }

  private findToast(toastId: number) {
    return this.toasts.find((savedToast) => savedToast.id === toastId);
  }

  private deleteToastFromList(toastId: number) {
    const foundToast = this.findToast(toastId);
    if (!foundToast) return;
    this.toasts = without([foundToast], this.toasts);
  }

  private subscribeToastRemove(toast: InternalToastInterface) {
    const foundToast = this.findToast(toast.id);
    if (!foundToast) return;
    foundToast.removeSubscriber = setTimeout(
      () => this.deleteToastFromList(toast.id),
      ToastsController.defaultAutoRemoveTime,
    );
  }

  private unSubscribeToastRemove(toastId: number) {
    const foundToast = this.findToast(toastId);
    if (!foundToast) return;
    clearTimeout(foundToast.removeSubscriber);
  }
}
