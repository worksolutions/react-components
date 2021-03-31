import React, { Ref } from "react";
import { Link, LinkProps } from "react-router-dom";
import { isNil } from "ramda";
import { linkIsNative } from "@worksolutions/utils";

import { color, disableDecoration, hover, transition } from "../../styles";
import { duration160 } from "../../constants/durations";

import Typography, { TypographyInterface, TypographyTypes } from "./index";

type TypographyLinkInternalProps = TypographyInterface & Omit<LinkProps, "to" | "as" | "type">;

export type TypographyLinkInterface = TypographyLinkInternalProps & { to: string; native?: boolean; theme?: Theme };

export const externalTypographyLinkStyles = [
  transition(`color ${duration160}`),
  color("definitions.TypographyLink.External.color"),
  hover(color("definitions.TypographyLink.External.hoverColor")),
];

export const internalTypographyLinkStyles = [
  TypographyTypes["body-semi-bold"],
  transition(`color ${duration160}`),
  color("definitions.TypographyLink.Internal.color"),
  hover(color("definitions.TypographyLink.Internal.hoverColor")),
  disableDecoration,
];

type Theme = "internal" | "external";

const CustomRouterLink = ({ _css, ...props }: any) => <Link {...props} />;

function MakeTypographyLinkComponent(
  link: string,
  theme: Theme | undefined,
  nativeParams: { native: boolean | undefined; download: boolean; target?: string },
) {
  const themeStyles = React.useMemo(() => {
    if (theme) return theme === "internal" ? internalTypographyLinkStyles : externalTypographyLinkStyles;
    return nativeParams.native ? externalTypographyLinkStyles : internalTypographyLinkStyles;
  }, [nativeParams.native, theme]);

  return React.forwardRef(({ styles, ...data }: TypographyLinkInternalProps, ref: Ref<HTMLAnchorElement>) => {
    if (nativeParams.native) {
      return (
        <Typography
          {...data}
          styles={[themeStyles, styles]}
          {...nativeParams}
          // @ts-ignore
          href={link}
          as="a"
          ref={ref}
        />
      );
    }

    // @ts-ignore
    return <Typography as={CustomRouterLink} {...data} styles={[themeStyles, styles]} to={link} ref={ref} />;
  });
}

function TypographyLink({ to, target, download, native, theme, ...props }: TypographyLinkInterface) {
  const Component = MakeTypographyLinkComponent(to, theme, {
    native: isNil(native) ? linkIsNative(to) : native,
    download,
    target,
  });

  return <Component {...props} />;
}

export default React.memo(TypographyLink);
