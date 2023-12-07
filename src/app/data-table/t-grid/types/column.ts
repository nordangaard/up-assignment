export type Column<T> = {
  name: string;
  property: keyof T;
  sortable: boolean;
  displayed: boolean;
};

export type SortDirection = 'asc' | 'desc' | null;

export type ColumnSort<T> = {
  column: Column<T>;
  direction: SortDirection;
};
