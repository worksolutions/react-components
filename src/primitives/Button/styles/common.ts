import { child, marginLeft, marginRight, padding } from "../../../styles";

export const defaultLargeStyles = [
  child(marginRight(8), ".icon-left"),
  child(marginLeft(8), ".icon-right"),
  padding("8px 20px"),
];
export const defaultMediumStyles = [
  child(marginRight(8), ".icon-left"),
  child(marginLeft(8), ".icon-right"),
  padding("4px 16px"),
];
export const defaultSmallStyles = [
  child(marginRight(4), ".icon-left"),
  child(marginLeft(4), ".icon-right"),
  padding("0 8px"),
];
export const iconLargeStyles = [padding(8)];
export const iconMediumStyles = [padding(4)];
export const iconSmallStyles = [padding(0)];
