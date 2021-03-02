import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export interface OutsideHandlerProps {
  children: any;
  onHandler: (...args: any) => any;
  observableElement: Element | null;
}

const OutsideHandler = function ({ children, onHandler, observableElement }: OutsideHandlerProps) {
  const handleClickOutside = (e: any) => {
    const nodePopper = ReactDOM.findDOMNode(observableElement);

    if (!nodePopper || !nodePopper.contains(e.target)) {
      onHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [observableElement]);

  return children;
};

export default React.memo(OutsideHandler);
