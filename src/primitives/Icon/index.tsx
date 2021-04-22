import React from "react";
import { isDeepEqual, isPureObject } from "@worksolutions/utils";
import { IncomeColorVariant } from "@worksolutions/react-utils";

import { internalIcons } from "./list";
import { Colors } from "../../constants/colors";
import InternalSvg from "./variants/InternalSvg";
import StringLikeLink from "./variants/StringLikeLink";

export type InternalIcons = keyof typeof internalIcons;

export interface IconInterface {
  icon?: InternalIcons | string;
  className?: string;
  color?: IncomeColorVariant<Colors>;
  width?: number | string;
  height?: number | string;
  styles?: any;
}

function isInternalIcon(icon: string): icon is InternalIcons {
  return isPureObject(internalIcons[icon]);
}

const Icon = React.forwardRef(function ({ color, icon, className, ...props }: IconInterface, ref: any) {
  if (!icon) return null;
  const resultClassName = className ? `icon ${className}` : "icon";
  if (isInternalIcon(icon))
    return <InternalSvg ref={ref} color={color} icon={icon} className={resultClassName} {...props} />;

  return <StringLikeLink ref={ref} icon={internalIcons[icon] || icon} className={resultClassName} {...props} />;
});

Icon.defaultProps = {
  width: 24,
  height: 24,
};

export default React.memo(Icon, isDeepEqual);

export const expandIcons = <T extends string>(icons: Record<T, any>) => {
  Object.assign(internalIcons, icons);
};
