import { colors } from "../constants/colorsMap/dark";

export function selectControl(options: any[]) {
  return {
    control: {
      type: "select",
      options: options,
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

export function momentControl() {
  return {
    control: {
      type: "select",
      options: Object.keys(colors),
    },
  };
}
