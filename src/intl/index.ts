import { INTL } from "@worksolutions/utils";

export let intl: INTL = null!;

export function setIntl(newIntl: INTL) {
  intl = newIntl;
  console.log(intl);
}
