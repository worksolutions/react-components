export function parseStylePX(styleValue: string) {
  return styleValue.endsWith("px") ? parseFloat(styleValue) : 0;
}
