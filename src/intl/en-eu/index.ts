import { IntlDictionaryInterface, INTL, wordDeclinationEn } from "@worksolutions/utils";

export const enEuIntlDictionary: IntlDictionaryInterface = {
  languageCode: "en",
  matchDateModeAndLuxonTypeLiteral: {
    DAY_WITH_STRING_MONTH: "dd MMMM",
    DAY_WITH_STRING_SHORT_MONTH: "dd MMM",
    DATE: "dd.MM.yyyy",
    DATE_WITH_STRING_MONTH: "dd MMMM yyyy",
    DATE_WITH_STRING_SHORT_MONTH: "dd MMM yyyy",
    TIME: "HH:mm",
    DATE_TIME: "dd.MM.yyyy HH:mm",
    DATE_TIME_WITH_STRING_MONTH: "dd MMMM yyyy HH:mm",
    DATE_TIME_WITH_STRING_SHORT_MONTH: "dd MMM yyyy HH:mm",
    HOURS: "HH",
    SHORT_HOURS: "H",
    MINUTES: "mm",
    SHORT_MINUTES: "m",
    ...INTL.universalDates,
  },
  textDictionary: {
    components: {
      calendar: {
        todayButtonText: "Today",
      },
      editor: {
        heading: "Heading",
      },
      pagination: {
        of: "of",
        goToPage: "Go to",
      },
    },
  },
  decl: {
    dict: {},
    converter: wordDeclinationEn,
  },
};
