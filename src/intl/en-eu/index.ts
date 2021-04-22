import { IntlDictionaryInterface, INTL, wordDeclinationEn } from "@worksolutions/utils";

export const enIntlDictionary: IntlDictionaryInterface = {
  languageCode: "en",
  matchDateModeAndLuxonTypeLiteral: {
    DAY_WITH_STRING_MONTH: "dd MMMM",
    DATE: "dd.MM.yyyy",
    DATE_WITH_STRING_MONTH: "dd MMMM yyyy",
    TIME: "HH:mm",
    DATE_TIME: "dd.MM.yyyy HH:mm",
    DATE_TIME_WITH_STRING_MONTH: "dd MMMM yyyy HH:mm",
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
