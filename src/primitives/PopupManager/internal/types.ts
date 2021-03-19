import { VisibilityManagerContextInterface } from "../../VisibilityManager/types";
import React from "react";

export type TriggerPopupElementType = (data: VisibilityManagerContextInterface & { ref: any }) => React.ReactNode;
