import { Intl } from "@worksolutions/utils";

export let intl: Intl = null!;

export function setIntl(newIntl: Intl) {
  intl = newIntl;
}
