export function removeItemByIndex(array: any[], index: number) {
  const copyArray = [...array];
  copyArray.splice(index, 1);
  return copyArray;
}
