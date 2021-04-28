import React from "react";

import { parseStylePX } from "../../utils/parseStylePX";

export function useAutosizeTextarea(minRows: number, maxRows: number) {
  const autosizeTextareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (!autosizeTextareaRef.current) return;

    const element = autosizeTextareaRef.current;

    const styles = getComputedStyle(element);
    const lineHeight = parseStylePX(styles.lineHeight);
    const paddingTop = parseStylePX(styles.paddingTop);
    const paddingBottom = parseStylePX(styles.paddingBottom);
    const borderTop = parseStylePX(styles.borderTop);
    const borderBottom = parseStylePX(styles.borderBottom);

    const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom + borderTop + borderBottom;

    const inputListener = () => {
      element.style.height = "auto";
      let overflow = "hidden";
      let newHeight = element.scrollHeight;

      if (element.scrollHeight >= maxHeight) {
        overflow = "auto";
        newHeight = maxHeight;
      }

      element.style.overflow = overflow;
      element.style.height = newHeight + "px";
    };

    element.rows = minRows;
    element.addEventListener("input", inputListener);
    return () => element.removeEventListener("input", inputListener);
  }, []);

  return [autosizeTextareaRef];
}
