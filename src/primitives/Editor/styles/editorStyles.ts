import { css } from "styled-components";

import { TypographyTypes } from "../../Typography";

import { boxShadow, getColor } from "../../../styles";
import { elevation16Raw } from "../../../constants/shadows";
import { htmlTextStyles } from "./htmlStyles";

export const editorStyles = css`
  .ck {
    &.ck-dropdown.ck-toolbar__grouped-dropdown.ck-toolbar-dropdown {
      display: none !important;
    }
    figure.image {
      margin: 0 auto;
    }

    &.ck-editor {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      position: static;
    }

    &.ck-editor__top {
      width: 100%;
      border-bottom: 1px solid ${getColor("definitions.Editor.TopPanel.borderBottomColor")};
      z-index: 1;
      position: sticky;
      top: 0;

      .ck-sticky-panel__placeholder {
        height: 0 !important;
        opacity: 0 !important;
      }
      .ck-sticky-panel__content {
        position: static !important;
        box-shadow: none !important;
      }
    }

    &.ck-toolbar {
      background: white !important;
      border: none;
      display: flex;
      justify-content: center;

      &__items {
        justify-content: center;
        max-width: 1054px;
        margin: 0 !important;
        height: 40px;
      }

      &.ck-toolbar_grouping .ck-toolbar__separator {
        align-self: center !important;
        height: 12px;
        width: 1px;
        background-color: ${getColor("definitions.Editor.TopPanel.ButtonsGroupDivider.color")};
        margin: 0 11px;
      }

      .ck-dropdown__button .ck-icon.ck-dropdown__arrow {
        display: none !important;
      }

      .ck-button {
        min-height: 32px !important;
        max-height: 32px !important;
        min-width: 32px !important;
        max-width: 32px !important;
        margin: 0 1px !important;
        padding: 4px !important;
        border-radius: 6px !important;
        border: none !important;
        box-shadow: none !important;
        cursor: pointer;
        color: ${getColor("definitions.Editor.TopPanel.Item.Inactive.color")} !important;

        svg {
          * {
            fill: ${getColor("definitions.Editor.TopPanel.Button.Inactive.color")} !important;
          }
          height: 24px !important;
          width: 24px !important;
        }

        :hover {
          background: ${getColor("definitions.Editor.TopPanel.Item.Inactive.Hover.backgroundColor")} !important;
        }
      }

      .ck-button.ck-on {
        background: ${getColor("definitions.Editor.TopPanel.Item.Active.backgroundColor")} !important;
        color: ${getColor("definitions.Editor.TopPanel.Item.Active.color")} !important;
        svg * {
          fill: ${getColor("definitions.Editor.TopPanel.Button.Active.color")} !important;
        }
      }

      .custom-toolbar-button {
        outline: none !important;
      }

      .ck-dropdown__panel {
        top: calc(100% + 6px) !important;
        background: white;
        border: 1px solid ${getColor("definitions.Editor.TopPanel.Dropdown.borderColor")} !important;
        ${boxShadow(...elevation16Raw)}
        border-radius: 6px !important;
        overflow: hidden;
        padding: 7px 8px !important;

        .ck-button.ck-on {
          color: ${getColor("definitions.Editor.TopPanel.Item.Inactive.color")} !important;
        }
      }

      .ck-insert-table-dropdown__label {
        color: ${getColor("gray-blue/05")};
        ${TypographyTypes["body-regular"]};
        margin-top: 8px;
        display: flex;
        height: 20px;
        justify-content: center;
        align-items: center;
      }

      .ck-insert-table-dropdown__grid {
        width: 140px !important;
        padding: 0 !important;
        border-radius: 6px;
        border: none !important;
        cursor: pointer;

        .ck-insert-table-dropdown-grid-box {
          background-color: ${getColor("gray-blue/01")};
          border-color: ${getColor("gray-blue/02")};
          width: 12px !important;
          height: 12px !important;
          border-radius: 2px !important;
        }

        .ck-insert-table-dropdown-grid-box.ck-on {
          background-color: ${getColor("blue/01")};
          border-color: ${getColor("blue/03")};
        }
      }

      .ck-heading-dropdown {
        min-width: 128px;
        height: 32px;
        margin: 0 1px;

        .ck-dropdown__button {
          min-width: 100% !important;
          min-height: 100% !important;
          padding: 4px 12px 4px 16px !important;

          ${TypographyTypes["button"]};

          color: ${getColor("gray-blue/07")};

          &:hover {
            background: ${getColor("gray-blue/01")} !important;
          }
          .ck-icon.ck-dropdown__arrow {
            margin-left: 8px;
            * {
              fill: ${getColor("gray-blue/07")} !important;
            }
            transition: transform 0.2s;
            display: block !important;
          }

          &.ck-on {
            transition: border 50ms !important;
            box-shadow: ${boxShadow([0, 0, 0, 2, "blue/04"])} !important;
            background: ${getColor("gray-blue/01")} !important;
            .ck-icon.ck-dropdown__arrow {
              transform: rotate(180deg);
            }
          }
        }

        .ck-dropdown__panel {
          width: 200px;
        }

        .ck-list {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;

          &__item {
            width: 100%;
            min-width: 100% !important;
            height: 40px;
            margin: 1px 0;
          }

          &__item > .ck-button {
            ${TypographyTypes["body-regular"]};

            padding: 10px 8px !important;
            min-width: 100% !important;
            min-height: 100% !important;
            border-radius: 4px;
            color: ${getColor("green/02")};
          }

          &__item > .ck-button.ck-on,
          &__item > .ck-button:hover {
            color: ${getColor("gray-blue/10")};
            background-color: ${getColor("gray-blue/01")} !important;
          }

          .ck-heading_paragraph {
            ${TypographyTypes["body-regular"]};
          }
          .ck-heading_heading3 {
            ${TypographyTypes["h3-bold"]};
          }
          .ck-heading_heading2 {
            ${TypographyTypes["h2-bold"]};
          }
        }
      }
    }

    &.ck-editor__main {
      display: flex;
      justify-content: center;
      width: 100%;
      flex-grow: 1;
      min-height: 200px;

      > .ck-editor__editable {
        padding: 16px 24px !important;
        background: ${getColor("definitions.Editor.ActiveArea.backgroundColor")};
        width: 100%;
        min-height: 100%;

        border: none !important;
        box-shadow: none !important;
        outline: none;
      }
    }

    figure.table {
      display: block;

      table,
      tbody,
      table .ck-editor__editable,
      table tr {
        border-color: ${getColor("gray-blue/02")} !important;
        border: none;
      }

      table {
        border: 1px solid;

        * {
          margin: 0;
        }

        .ck-editor__editable {
          ${TypographyTypes["body-regular"]};
          padding: 8px;
          &:not(:last-child) {
            border-right: 1px solid;
          }
        }

        tr:not(:last-child) {
          border-bottom: 1px solid;
        }
      }
    }

    ${htmlTextStyles}
  }
`;
