import React from "react";

import { child, hover, opacity } from "../../../../styles";

export function getHoveredStylesForBorderContent(borderContentSelector: string, showOnHover?: boolean) {
  if (showOnHover) {
    return [child(opacity(0), borderContentSelector), hover(child(opacity(1), borderContentSelector))];
  }

  return null;
}
