import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { isNil } from "ramda";
import { linkIsNative } from "@worksolutions/utils";

import { color, disableDecoration, hover, transition } from "../../styles";
import { duration160 } from "../../constants/durations";

import Typography, { TypographyInterface, TypographyTypes } from "./index";

export type TypographyLinkInterface = TypographyInterface &
  Omit<LinkProps, "to" | "type" | "color"> & { to: string; native?: boolean; theme?: Theme };

export const externalTypographyLinkStyles = [
  transition(`color ${duration160}`),
  color("definitions.TypographyLink.External.color"),
  hover(color("definitions.TypographyLink.External.hoverColor")),
];

export const internalTypographyLinkStyles = [
  transition(`color ${duration160}`),
  color("definitions.TypographyLink.Internal.color"),
  hover(color("definitions.TypographyLink.Internal.hoverColor")),
  disableDecoration,
];

type Theme = "internal" | "external";

const CustomRouterLink = ({ _css, ...props }: any) => <Link {...props} />;

function TypographyLink(
  { to, native: nativeProp, theme, styles, color, type = "body-semi-bold", ...props }: TypographyLinkInterface,
  ref: React.Ref<HTMLAnchorElement>,
) {
  const native = React.useMemo(() => (isNil(nativeProp) ? linkIsNative(to) : nativeProp), [nativeProp, to]);

  const themeStyles = React.useMemo(() => {
    if (theme) return theme === "internal" ? internalTypographyLinkStyles : externalTypographyLinkStyles;
    return native ? externalTypographyLinkStyles : internalTypographyLinkStyles;
  }, [native, theme]);

  const resultStyles = React.useMemo(() => [TypographyTypes[type], themeStyles, styles], [styles, themeStyles, type]);

  if (native) {
    return (
      <Typography
        ref={ref}
        {...props}
        styles={resultStyles}
        color={color}
        // @ts-ignore
        href={to}
        as="a"
      />
    );
  }

  // @ts-ignore
  return <Typography ref={ref} as={CustomRouterLink} {...props} styles={resultStyles} color={color} to={to} />;
}

export default React.memo(React.forwardRef(TypographyLink));
