import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionStatus } from "react-transition-group";
import { observer } from "mobx-react-lite";

import Wrapper from "../../primitives/Wrapper";
import {
  animationDuration,
  backgroundColorWithoutMemoization,
  bottom,
  createAlphaColor,
  flex,
  left,
  overflow,
  position,
  right,
  top,
} from "../../styles";
import {
  centerToLeftOnExiting,
  centerToRightOnExiting,
  leftToCenterOnEntering,
  rightToCenterOnEntering,
} from "../../css/slideAnimationClassNames";
import { opacityFullToZeroOnExiting, opacityZeroToFullOnEntering } from "../../css/opacityAnimationClassNames";

export interface DrawerInterface {
  styles?: any;
  opened: boolean;
  position?: "left" | "right";
  animationTimeout?: number;
  rootElement?: HTMLElement;
  onClose: () => void;
  children: React.FC<{ close: () => void }>;
}

function getStylesForLeft(status: TransitionStatus, opened: boolean) {
  return {
    styles: [left(0)],
    className: opened ? leftToCenterOnEntering(status) : centerToLeftOnExiting(status),
  };
}

function getStylesForRight(status: TransitionStatus, opened: boolean) {
  return {
    styles: [right(0)],
    className: opened ? rightToCenterOnEntering(status) : centerToRightOnExiting(status),
  };
}

function getBackClassName(status: TransitionStatus, opened: boolean) {
  return opened ? opacityZeroToFullOnEntering(status) : opacityFullToZeroOnExiting(status);
}

function Drawer({
  styles,
  position: drawerPosition = "left",
  opened,
  rootElement,
  animationTimeout = 300,
  children: Children,
  onClose,
}: DrawerInterface) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const root = React.useMemo(() => rootElement || Drawer._rootElement, [opened, rootElement]);

  return (
    <CSSTransition in={opened} timeout={animationTimeout} unmountOnExit mountOnEnter>
      {(status) => {
        const config = drawerPosition === "left" ? getStylesForLeft(status, opened) : getStylesForRight(status, opened);
        return ReactDOM.createPortal(
          <Wrapper styles={[position("fixed"), top(0), bottom(0), left(0), right(0)]}>
            <Wrapper
              className={getBackClassName(status, opened)}
              styles={[
                position("absolute"),
                top(0),
                bottom(0),
                left(0),
                right(0),
                animationDuration(`${animationTimeout}ms`),
                backgroundColorWithoutMemoization(
                  createAlphaColor("definitions.Drawer.backContentDisablerBackgroundColor", 200),
                ),
              ]}
              onClick={onClose}
            />
            <Wrapper
              className={config.className}
              styles={[
                flex,
                position("absolute"),
                overflow("hidden"),
                animationDuration(`${animationTimeout}ms`),
                config.styles,
                styles,
              ]}
            >
              <Children close={onClose} />
            </Wrapper>
          </Wrapper>,
          root!,
        );
      }}
    </CSSTransition>
  );
}

Drawer._rootElement = document.body;

Drawer.setRootElement = function (element: HTMLElement) {
  Drawer._rootElement = element;
};

const ObservedDrawer = observer(Drawer);

// @ts-ignore
ObservedDrawer.baseElement = Drawer;

export default ObservedDrawer;
