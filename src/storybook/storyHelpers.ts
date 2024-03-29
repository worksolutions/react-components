import { colors } from "../constants/colorsMap/dark";
import { internalIcons } from "../primitives/Icon/list";

export function selectControl(options: any[]) {
  return {
    control: {
      type: "select",
      options: options,
    },
  };
}

export function textControl() {
  return {
    control: {
      type: "text",
    },
  };
}

export function iconsControl() {
  return {
    control: {
      type: "select",
      options: Object.keys(internalIcons),
    },
  };
}

export function colorControl() {
  return {
    control: {
      type: "select",
      options: Object.keys(colors),
    },
  };
}

export function numbersControl(min: number, max: number, step: number) {
  return {
    control: {
      type: "number",
      mim: min,
      max: max,
      step: step,
    },
  };
}

export function booleanControl() {
  return {
    control: {
      type: "boolean",
    },
  };
}
