export function isSelected<CODE extends string | number>(value: CODE[], code: CODE) {
  return value.includes(code);
}
