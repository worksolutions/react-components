import React from "react";

import Icon from "../Icon";
import {
  ai,
  backgroundColor,
  border,
  borderRadius,
  boxShadow,
  flex,
  fullHeight,
  fullWidth,
  height,
  jc,
  minHeight,
  minWidth,
  overflow,
  width,
} from "../../styles";
import Wrapper from "../Wrapper";

export interface AvatarInterface {
  styles?: any;
  iconStyles?: any;
  url?: string;
  size?: AvatarSize;
}

export enum AvatarSize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
}

const matchSizeAndPixels: Record<AvatarSize, number> = {
  [AvatarSize.SMALL]: 24,
  [AvatarSize.MEDIUM]: 32,
};

function Avatar({ styles, iconStyles, size = AvatarSize.MEDIUM, url }: AvatarInterface, ref: React.Ref<HTMLElement>) {
  const realSize = matchSizeAndPixels[size];

  return (
    <Wrapper
      ref={ref}
      styles={[
        flex,
        ai("center"),
        jc("center"),
        borderRadius("100%"),
        width(realSize),
        minWidth(realSize),
        height(realSize),
        minHeight(realSize),
        overflow("hidden"),
        backgroundColor("definitions.Avatar.Wrapper.backgroundColor"),
        boxShadow([0, 0, 0, 2, "definitions.Avatar.Wrapper.shadowColor"]),
        styles,
      ]}
    >
      {url ? (
        <Icon styles={[fullWidth, fullHeight, iconStyles]} icon={url} />
      ) : (
        <Icon styles={iconStyles} color="definitions.Avatar.Empty.color" icon="employee" />
      )}
    </Wrapper>
  );
}

export default React.memo(React.forwardRef(Avatar));
