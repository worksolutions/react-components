import React from "react";
import ReactDOM from "react-dom";

import Typography from "../Typography";
import { visibility } from "../../styles";

interface TextWidthDetectorInterface {
  text: string;
  extraHorizontalPadding?: number;
}

let rootElement = document.body;

function TextWidthDetector(
  { text, extraHorizontalPadding = 0 }: TextWidthDetectorInterface,
  inputRef: React.Ref<HTMLInputElement>,
) {
  const textRef = React.useRef<HTMLElement>(null!);

  React.useLayoutEffect(() => {
    if (!inputRef || !("current" in inputRef) || !inputRef.current) return;

    const width = textRef.current.getBoundingClientRect().width;
    const styles = getComputedStyle(inputRef.current);
    const paddingLeft = styles.paddingLeft.includes("px") ? parseFloat(styles.paddingLeft) : 0;
    const paddingRight = styles.paddingRight.includes("px") ? parseFloat(styles.paddingRight) : 0;
    inputRef.current.style.width = paddingLeft + paddingRight + extraHorizontalPadding + width + "px";
  }, [extraHorizontalPadding, inputRef, text]);

  return ReactDOM.createPortal(
    <Typography ref={textRef} styles={visibility("hidden")} noWrap>
      {text}
    </Typography>,
    rootElement,
  );
}

export function setTextWidthDetectorRootElement(element: HTMLElement) {
  rootElement = element;
}

export default React.memo(React.forwardRef(TextWidthDetector));
