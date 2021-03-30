import React, { Ref } from "react";
import { Link, LinkProps } from "react-router-dom";
import { isNil } from "ramda";
import { linkIsNative } from "@worksolutions/utils";

import { color, disableDecoration, hover, transition } from "../../styles";
import { duration160 } from "../../constants/durations";

import Typography, { TypographyInterface, TypographyTypes } from "./index";

type TypographyLinkInternalProps = TypographyInterface & Omit<LinkProps, "to" | "as" | "type">;

export type TypographyLinkInterface = TypographyLinkInternalProps & { to: string; native?: boolean; theme?: Theme };

export const blueTypographyLinkStyles = [color("blue/06")];

export const blackTypographyLinkStyles = [
  TypographyTypes["body-semi-bold"],
  transition(`color ${duration160}`),
  hover(color("gray-blue/07")),
  disableDecoration,
];

type Theme = "black" | "blue";

const CustomRouterLink = ({ _css, ...props }: any) => <Link {...props} />;

function makeTypographyLink(
  link: string,
  theme: Theme | undefined,
  nativeParams: { native: boolean | undefined; download: boolean; target?: string },
) {
  const themeStyles = theme
    ? theme === "black"
      ? blackTypographyLinkStyles
      : blueTypographyLinkStyles
    : nativeParams.native
    ? blueTypographyLinkStyles
    : blackTypographyLinkStyles;

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
  const Component = makeTypographyLink(to, theme, {
    native: isNil(native) ? linkIsNative(to) : native,
    download,
    target,
  });

  return <Component {...props} />;
}

export default React.memo(TypographyLink);
