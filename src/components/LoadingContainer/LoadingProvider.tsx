import React, { Ref } from "react";
import { observer } from "mobx-react-lite";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { IncomeColorVariant, useBoolean } from "@worksolutions/react-utils";

import Wrapper from "../../primitives/Wrapper";
import Spinner, { SpinnerSize } from "../../primitives/Spinner";

import { ai, flex, fullHeight, fullWidth, jc, left, opacity, position, top, transform, transition } from "../../styles";
import { Colors } from "../../constants/colors";
import { zIndex_loadingProvider } from "../../constants/zIndexes";
import { duration120, duration120Number, duration300 } from "../../constants/durations";

import { LoadingProviderLogic, loadingProviderLogicStore } from "./internal/LoadingProviderLogic";

export interface LoadingProviderInterface {
  centered?: boolean;
  backplateStyles?: any;
  spinnerStyles?: any;
  spinnerWidth?: number;
  spinnerColor?: IncomeColorVariant<Colors>;
  spinnerBackplateColor?: IncomeColorVariant<Colors>;
  spinnerWithBackplate?: boolean;
  spinnerSize?: SpinnerSize;
  children: (loadingProviderRef: Ref<HTMLElement | undefined>) => JSX.Element;
}

function LoadingProvider({
  centered = true,
  spinnerStyles,
  backplateStyles,
  children,
  spinnerColor,
  spinnerSize,
  spinnerWidth,
  spinnerBackplateColor,
  spinnerWithBackplate,
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
  }, [id]);

  const needShowSpinner = loadingProviderLogicStore.providers[id]?.spinnerCount !== 0 && !!ref.current;
  const [spinnerVisible, showSpinner, hideSpinner] = useBoolean(needShowSpinner);
  const timerRef = React.useRef<any>();

  React.useEffect(() => {
    clearTimeout(timerRef.current);
    if (needShowSpinner) {
      showSpinner();
      return;
    }

    timerRef.current = setTimeout(() => {
      hideSpinner();
    }, 16);
  }, [hideSpinner, needShowSpinner, showSpinner]);

  return (
    <>
      {children(ref)}
      <CSSTransition unmountOnExit mountOnEnter in={spinnerVisible} timeout={duration120Number}>
        {(status) =>
          ReactDOM.createPortal(
            <Wrapper
              className={LoadingProvider.wrapperClassName}
              styles={[
                transition(`opacity ${duration120}`),
                opacity(status === "entered" ? 1 : 0),
                zIndex_loadingProvider,
                position("absolute"),
                left(0),
                top(0),
                fullWidth,
                fullHeight,
                flex,
                centered && [ai("center"), jc("center")],
                backplateStyles,
              ]}
            >
              <Spinner
                styles={[
                  transition(`transform ${duration300}`),
                  transform(status === "entered" ? "scale(1)" : "scale(0)"),
                  spinnerStyles,
                ]}
                size={spinnerSize}
                width={spinnerWidth}
                color={spinnerColor}
                backplateColor={spinnerBackplateColor}
                withBackplate={spinnerWithBackplate}
              />
            </Wrapper>,
            ref.current!,
          )
        }
      </CSSTransition>
    </>
  );
}

LoadingProvider.wrapperClassName = "loading-provider-wrapper-mark";

export default observer(LoadingProvider);
