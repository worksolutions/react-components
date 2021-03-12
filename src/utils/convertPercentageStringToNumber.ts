export function convertPercentageStringToNumber(percentageString: string) {
  if (!percentageString.endsWith("%")) return 1;

  const number = parseInt(percentageString, 10);

  if (Boolean(number)) return number / 100;

  return 1;
}
