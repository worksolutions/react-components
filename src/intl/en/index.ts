import { IntlDictionaryInterface, INTL } from "@worksolutions/utils";

export const enIntlDictionary: IntlDictionaryInterface = {
  momentLanguageCode: "en",
  dateConverterMap: {
    DAY_WITH_STRING_MONTH: "DD MMMM",
    DATE: "MM/DD/YYYY",
    DATE_WITH_STRING_MONTH: "DD MMMM YYYY",
    TIME: "hh:mm A",
    DATE_TIME: "MM/DD/YYYY hh:mm A",
    DATE_TIME_WITH_STRING_MONTH: "DD MMMM YYYY hh:mm A",
    HOURS: "hh",
    SHORT_HOURS: "h",
    MINUTES: "mm",
    SHORT_MINUTES: "m",
    ...INTL.universalDates,
  },
  textDictionary: {
    components: {
      dropdown: {
        notFound: "Not found",
        searchInputPlaceholder: "Search",
      },
      combobox: {
        allElementsAreSelected: "All elements are selected",
      },
      calendar: {
        todayButtonText: "Today",
      },
      editor: {
        heading: "Heading",
      },
    },
  },
  decl: {
    dict: {},
    converter: (count, declValue) => (count === 1 ? declValue[0] : declValue[1]),
  },
};
