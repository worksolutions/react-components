import React from "react";

export interface TableContextInterface {
  cellHorizontalPadding: number;
  cellVerticalPadding: number;
  cellSizes: "auto" | (number | "auto")[];
}

export const tableContext = React.createContext<TableContextInterface>(null!);

export const defaultTableContext: TableContextInterface = {
  cellHorizontalPadding: 8,
  cellVerticalPadding: 12,
  cellSizes: "auto",
};
