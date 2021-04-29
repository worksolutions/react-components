import React from "react";

export type CellSize = number | "auto";

export type CellSizes = "auto" | CellSize[];

export interface TableContextInterface {
  cellHorizontalPadding: number;
  cellVerticalPadding: number;
  cellSizes: CellSizes;
}

export const tableContext = React.createContext<TableContextInterface>(null!);

export const defaultTableContext: TableContextInterface = {
  cellHorizontalPadding: 8,
  cellVerticalPadding: 12,
  cellSizes: "auto",
};
