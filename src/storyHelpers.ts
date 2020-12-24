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
    control: "color",
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
