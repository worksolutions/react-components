export function convertPercentageStringToNumber(percentageString: string) {
  if (!percentageString.endsWith("%")) return 1;

  const number = parseFloat(percentageString);

  if (!isNaN(number)) return number / 100;

  return 1;
}
