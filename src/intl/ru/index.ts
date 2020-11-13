import { IntlDictionaryInterface, Intl, wordDeclination } from "@worksolutions/utils";

export const ruIntlDictionary: IntlDictionaryInterface = {
  momentLanguageCode: "ru",
  dateConverterMap: {
    DAY_WITH_STRING_MONTH: "DD MMMM",
    DATE: "DD.MM.YYYY",
    DATE_WITH_STRING_MONTH: "DD MMMM YYYY",
    TIME: "HH:mm",
    DATE_TIME: "DD.MM.YYYY HH:mm",
    DATE_TIME_WITH_STRING_MONTH: "DD MMMM YYYY HH:mm",
    HOURS: "HH",
    SHORT_HOURS: "H",
    MINUTES: "mm",
    SHORT_MINUTES: "m",
    ...Intl.universalDates,
  },
  textDictionary: {
    components: {
      dropdown: {
        notFound: "Ничего не найдено",
        searchInputPlaceholder: "Найти",
      },
      combobox: {
        allElementsAreSelected: "Выбраны все элементы",
      },
      calendar: {
        todayButtonText: "Сегодня",
      },
      editor: {
        heading: "Заголовок",
      },
    },
  },
  decl: {
    dict: {},
    converter: wordDeclination,
  },
};
