import React, { Ref } from "react";
import { observer } from "mobx-react-lite";
import ReactDOM from "react-dom";

import Wrapper from "../../primitives/Wrapper";
import Spinner from "../../primitives/Spinner";

import {
  ai,
  backgroundColorWithoutMemoization,
  bottom,
  createAlphaColor,
  flex,
  jc,
  left,
  position,
  right,
  top,
} from "../../styles";
import { Colors } from "../../constants/colors";
import { zIndex_loadingProvider } from "../../constants/zIndexes";

import { LoadingProviderLogic, loadingProviderLogicStore } from "./LoadingProviderLogic";

interface LoadingProviderInterface {
  withBackground?: boolean;
  backplateStyles?: any;
  styles?: any;
  children: (loadingProviderRef: Ref<HTMLElement | undefined>) => JSX.Element;
  color?: Colors;
}

function LoadingProvider({
  styles,
  backplateStyles,
  children,
  color,
  withBackground = true,
}: LoadingProviderInterface) {
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
            className={LoadingProvider.wrapperClassName}
            styles={[
              zIndex_loadingProvider,
              position("absolute"),
              left(0),
              right(0),
              top(0),
              bottom(0),
              withBackground &&
                backgroundColorWithoutMemoization(
                  createAlphaColor("definitions.LoadingProvider.Backplate.backgroundColor", 160),
                ),
              flex,
              ai("center"),
              jc("center"),
              backplateStyles,
            ]}
          >
            <Spinner styles={styles} color={color || "definitions.LoadingProvider.Spinner.color"} />
          </Wrapper>,
          ref.current!,
        )}
    </>
  );
}

LoadingProvider.wrapperClassName = "loading-provider-wrapper-mark";

export default observer(LoadingProvider);
