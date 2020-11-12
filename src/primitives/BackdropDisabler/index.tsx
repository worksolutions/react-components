import ReactDOM from "react-dom";
import React from "react";
import { createGlobalStyle } from "styled-components";

import { bottom, left, position, right, top } from "../../styles";

import Wrapper from "../Wrapper";

const DisableSelect = createGlobalStyle`
* {
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none; 
       -moz-user-select: none;
        -ms-user-select: none; 
            user-select: none;
}`;

function BackdropDisabler({ styles }: { styles?: any }) {
  const [rootElement] = React.useState(() => document.getElementById("root")!);

  return ReactDOM.createPortal(
    <>
      <Wrapper styles={[position("fixed"), left(0), right(0), top(0), bottom(0), styles]} />
      <DisableSelect />
    </>,
    rootElement,
  );
}

export default React.memo(BackdropDisabler);
