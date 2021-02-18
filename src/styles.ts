import { buildStyles } from "@worksolutions/react-utils";

import { Colors, colors } from "constants/colors";

const styles = buildStyles(colors);

export type AllAvailableColorsType = Colors;

export type BoxShadow = [
  number | string,
  number | string,
  number | string,
  number | string,
  AllAvailableColorsType,
  boolean?,
];

export const getColor = styles.getColor;
export const backgroundColor = styles.backgroundColor;
export const border = styles.border;
export const borderBottom = styles.borderBottom;
export const borderColor = styles.borderColor;
export const borderLeft = styles.borderLeft;
export const borderLeftColor = styles.borderLeftColor;
export const borderRight = styles.borderRight;
export const borderTop = styles.borderTop;
export const color = styles.color;
export const createAlphaColor = styles.createAlphaColor;
export const createLinearGradientColor = styles.createLinearGradientColor;
export const createRadialGradientColor = styles.createRadialGradientColor;
export const fillColor = styles.fillColor;
export const boxShadowString = styles.boxShadowString;
export const boxShadow = styles.boxShadow;
export const hover = styles.hover;
export const focus = styles.focus;
export const active = styles.active;
export const mediaScreen = styles.mediaScreen;
export const animation = styles.animation;
export const background = styles.background;
export const backgroundImage = styles.backgroundImage;
export const backgroundRepeat = styles.backgroundRepeat;
export const backgroundSize = styles.backgroundSize;
export const backgroundPosition = styles.backgroundPosition;
export const borderWidth = styles.borderWidth;
export const borderRadius = styles.borderRadius;
export const borderLeftRadius = styles.borderLeftRadius;
export const borderRightRadius = styles.borderRightRadius;
export const borderBottomRadius = styles.borderBottomRadius;
export const borderTopRadius = styles.borderTopRadius;
export const child = styles.child;
export const firstChild = styles.firstChild;
export const lastChild = styles.lastChild;
export const nthChild = styles.nthChild;
export const borderNone = styles.borderNone;
export const emptyBoxShadow = styles.emptyBoxShadow;
export const stringOrPixels = styles.stringOrPixels;
export const disableOutline = styles.disableOutline;
export const zIndex = styles.zIndex;
export const display = styles.display;
export const opacity = styles.opacity;
export const visibility = styles.visibility;
export const content = styles.content;
export const verticalAlign = styles.verticalAlign;
export const willChange = styles.willChange;
export const pointer = styles.pointer;
export const pointerEvents = styles.pointerEvents;
export const cursor = styles.cursor;
export const flex = styles.flex;
export const inlineFlex = styles.inlineFlex;
export const flexWrap = styles.flexWrap;
export const flexValue = styles.flexValue;
export const flexGrow = styles.flexGrow;
export const flexBasis = styles.flexBasis;
export const flexShrink = styles.flexShrink;
export const flexColumn = styles.flexColumn;
export const jc = styles.jc;
export const alignSelf = styles.alignSelf;
export const alignContent = styles.alignContent;
export const ai = styles.ai;
export const verticalScroll = styles.verticalScroll;
export const horizontalScroll = styles.horizontalScroll;
export const overflow = styles.overflow;
export const overflowX = styles.overflowX;
export const overflowY = styles.overflowY;
export const position = styles.position;
export const left = styles.left;
export const right = styles.right;
export const top = styles.top;
export const bottom = styles.bottom;
export const absoluteCenter = styles.absoluteCenter;
export const width = styles.width;
export const minWidth = styles.minWidth;
export const maxWidth = styles.maxWidth;
export const height = styles.height;
export const minHeight = styles.minHeight;
export const maxHeight = styles.maxHeight;
export const fullWidth = styles.fullWidth;
export const fullHeight = styles.fullHeight;
export const margin = styles.margin;
export const verticalMargin = styles.verticalMargin;
export const horizontalMargin = styles.horizontalMargin;
export const marginLeft = styles.marginLeft;
export const marginRight = styles.marginRight;
export const marginTop = styles.marginTop;
export const marginBottom = styles.marginBottom;
export const padding = styles.padding;
export const verticalPadding = styles.verticalPadding;
export const horizontalPadding = styles.horizontalPadding;
export const paddingLeft = styles.paddingLeft;
export const paddingRight = styles.paddingRight;
export const paddingTop = styles.paddingTop;
export const paddingBottom = styles.paddingBottom;
export const textOverflow = styles.textOverflow;
export const whiteSpace = styles.whiteSpace;
export const lineHeight = styles.lineHeight;
export const fontSize = styles.fontSize;
export const letterSpacing = styles.letterSpacing;
export const fontWeight = styles.fontWeight;
export const capitalizeFirstLetter = styles.capitalizeFirstLetter;
export const textTransform = styles.textTransform;
export const textAlign = styles.textAlign;
export const textDots = styles.textDots;
export const disableDecoration = styles.disableDecoration;
export const transform = styles.transform;
export const transformOrigin = styles.transformOrigin;
export const transition = styles.transition;
export const order = styles.order;
