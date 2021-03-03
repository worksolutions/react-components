import React, { Ref } from "react";
import { observer } from "mobx-react-lite";
import ReactDOM from "react-dom";

import Wrapper from "../../primitives/Wrapper";
import Spinner from "../../primitives/Spinner";

import {
  absoluteCenter,
  backgroundColor,
  bottom,
  createAlphaColor,
  left,
  position,
  right,
  top,
  zIndex,
} from "../../styles";
import { Colors } from "../../constants/colors";

import { LoadingProviderLogic, loadingProviderLogicStore } from "./LoadingProviderLogic";

function LoadingProvider({
  children,
  color,
}: {
  children: (loadingProviderRef: Ref<HTMLElement | undefined>) => JSX.Element;
  color?: Colors;
}) {
  const id = React.useMemo(() => loadingProviderLogicStore.generateId(), []);
  const ref = React.useRef<HTMLElement>();

  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.position = "relative";
      ref.current.setAttribute(LoadingProviderLogic.attributeName, id.toString());
      loadingProviderLogicStore.providers[id] = { spinnerCount: 0 };
    }

    return () => {
      loadingProviderLogicStore.providers[id].spinnerCount = 0;
    };
  }, []);

  const needShowSpinner = loadingProviderLogicStore.providers[id]?.spinnerCount !== 0 && !!ref.current;
  const [realShowSpinner, setRealShowSpinner] = React.useState(needShowSpinner);
  const timerRef = React.useRef<any>();

  React.useEffect(() => {
    clearTimeout(timerRef.current);
    if (needShowSpinner) {
      setRealShowSpinner(true);
      return;
    }

    timerRef.current = setTimeout(() => {
      setRealShowSpinner(false);
    }, 16);
  }, [needShowSpinner]);

  return (
    <>
      {children(ref)}
      {realShowSpinner &&
        ReactDOM.createPortal(
          <Wrapper
            styles={[
              zIndex(1),
              position("fixed"),
              left(0),
              right(0),
              top(0),
              bottom(0),
              backgroundColor(createAlphaColor("white", 160)),
            ]}
          >
            <Wrapper styles={absoluteCenter}>
              <Spinner color={color} />
            </Wrapper>
          </Wrapper>,
          ref.current!,
        )}
    </>
  );
}

export default observer(LoadingProvider);
