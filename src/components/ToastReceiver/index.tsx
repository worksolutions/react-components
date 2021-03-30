import React from "react";
import { observer } from "mobx-react-lite";
import { useEventEmitter } from "@worksolutions/react-utils";
import { EventEmitter } from "@worksolutions/utils";

import ToastsController from "./ToastsController";
import Toast, { ToastInterface } from "../../primitives/Toast";

export interface ToastReceiverInterface {
  eventEmitter: EventEmitter<{ ADD_TOAST: ToastInterface }>;
  toastsController: ToastsController;
}

function ToastReceiver({ eventEmitter, toastsController }: ToastReceiverInterface) {
  useEventEmitter(eventEmitter, "ADD_TOAST", (data) => {
    toastsController.addToast(data);
  });

  const removeToastFabric = React.useCallback((toastId: number) => () => toastsController.removeToast(toastId), [
    toastsController,
  ]);

  return (
    <>
      {toastsController.toasts.map(({ id, toast }, index) => (
        <Toast key={id} index={index} removeToast={removeToastFabric(id)} {...toast} />
      ))}
    </>
  );
}

export default observer(ToastReceiver);
