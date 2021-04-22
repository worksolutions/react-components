export enum SortingDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type SortingID = string | number;

export type SortingItem = { id: SortingID; title: string; hasDirection: boolean };
