import React from "react";
import { VisibilityManagerContextInterface } from "../../VisibilityManager";

export type TriggerPopupElementType = (data: VisibilityManagerContextInterface & { ref: any }) => React.ReactNode;
