import React from "react";
import { asyncTimeout, findElementInDOMParentTree } from "@worksolutions/utils";
import { observer } from "mobx-react-lite";

import { LoadingProviderLogic, loadingProviderLogicStore } from "./internal/LoadingProviderLogic";

function findProviderContainerId(element: HTMLElement) {
  const providerElement = findElementInDOMParentTree(element, (element) =>
    element.hasAttribute(LoadingProviderLogic.attributeName),
  );
  if (!providerElement) return null;
  return providerElement.getAttribute(LoadingProviderLogic.attributeName);
}

async function runMountProviderLogic(spanRef: React.RefObject<HTMLElement>) {
  await asyncTimeout(16);
  const foundElementId = findProviderContainerId(spanRef.current!);
  if (!foundElementId) return null;
  loadingProviderLogicStore.providers[foundElementId].spinnerCount++;
  return foundElementId;
}

async function runUnmountProviderLogic(elementId: string | null) {
  if (!elementId) return;
  await asyncTimeout(16);
  loadingProviderLogicStore.providers[elementId!].spinnerCount--;
}

function Loading() {
  const spanRef = React.useRef<HTMLElement>(null!);
  React.useEffect(() => {
    let foundElementId: string | null = null;
    runMountProviderLogic(spanRef).then((id) => (foundElementId = id));
    return () => {
      runUnmountProviderLogic(foundElementId);
    };
  }, []);

  return <span ref={spanRef} className={Loading.markClassName} />;
}

Loading.markClassName = "loading-provider-loader-mark";

export default observer(Loading);
