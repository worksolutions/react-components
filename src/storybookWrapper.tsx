import React from "react";
import { INTL, wordDeclination } from "@worksolutions/utils";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { Story, StoryContext } from "@storybook/react/types-6-0";
import { IntlDictionaryInterface } from "@worksolutions/utils";

import { TypographyGlobalStyle } from "./primitives/Typography";
import "./styles/index.scss";
import { intl, setIntl } from "./intl";

const intlDictionary: IntlDictionaryInterface = {
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
    ...INTL.universalDates,
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

setIntl(new INTL(intlDictionary));
intl.init();

export const browserHistory = createBrowserHistory();

export function storybookWrapper(Story: Story) {
  return (
    <div className="ws-box" style={{ display: "flex" }}>
      <TypographyGlobalStyle />
      <Router history={browserHistory}>
        <Story />
      </Router>
    </div>
  );
}
