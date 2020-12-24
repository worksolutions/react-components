import React from "react";

import { expandedIcons, internalIcons } from "./list";
import { Colors } from "../../constants/colors";
import isEqual from "../../CB/changeDetectionStrategy/performance/isEqual";
import InternalSvg from "./variants/InternalSvg";
import StringLikeSvg from "./variants/StringLikeSvg";
import StringLikeLink from "./variants/StringLikeLink";

export type InternalIcons = keyof typeof internalIcons;

interface StyledSVGInterface {
  width?: number | string;
  height?: number | string;
  styles?: any;
}

export interface IconInterface extends StyledSVGInterface {
  icon?: InternalIcons | string;
  className?: string;
  color?: Colors;
}

function isInternalIcon(icon: string): icon is InternalIcons {
  return icon in internalIcons;
}

const Icon = React.forwardRef(function ({ color, icon, ...props }: IconInterface, ref: any) {
  if (!icon) return null;
  if (isInternalIcon(icon)) {
    return <InternalSvg ref={ref} color={color} icon={icon} {...props} />;
  }

  if (icon.startsWith("<svg")) return <StringLikeSvg ref={ref} color={color} icon={icon} {...props} />;

  if (expandedIcons[icon] && expandedIcons[icon].startsWith("<svg"))
    return <StringLikeSvg ref={ref} color={color} icon={expandedIcons[icon]} {...props} />;

  return <StringLikeLink ref={ref} icon={expandedIcons[icon] || icon} {...props} />;
});

Icon.defaultProps = {
  width: 24,
  height: 24,
};

export default React.memo(Icon, isEqual);

export const expandIcons = <T extends string>(icons: Record<T, any>) => {
  return Object.assign(expandedIcons, internalIcons, icons);
};
