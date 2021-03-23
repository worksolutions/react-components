import { createGlobalStyle } from "styled-components";

import { getColor } from "../../styles";

export const ScrollbarsGlobalStyles = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  * {
    scrollbar-color: ${getColor("definitions.Scrollbars.draggablePartColor")} ${getColor(
  "definitions.Scrollbars.basePlaceBackgroundColor",
)};
  }

  *:hover {
    scrollbar-color: ${getColor("definitions.Scrollbars.draggablePartHoverColor")} ${getColor(
  "definitions.Scrollbars.basePlaceBackgroundColor",
)};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${getColor("definitions.Scrollbars.draggablePartColor")};
    border-radius: 20px;
    cursor: pointer;
    min-height: 40px;
    min-width: 40px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${getColor("definitions.Scrollbars.draggablePartHoverColor")};
  }

  ::-webkit-scrollbar-track {background-color: ${getColor("definitions.Scrollbars.basePlaceBackgroundColor")}}
`;
