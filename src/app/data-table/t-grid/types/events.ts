import { SortDirection } from './column';

export type SortChangeEvent = {
  columnName: string;
  direction: SortDirection;
};

export type PaginationChangeEvent = {
  currentPage: number;
  pageSize: number | null;
};
