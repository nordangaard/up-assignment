import { SortDirection } from '../types/column';

export function sortTableData<T>(
  property: keyof T,
  direction: SortDirection,
  data: T[]
) {
  return data.sort((a, b) => {
    return direction === 'asc'
      ? a[property] > b[property]
        ? 1
        : -1
      : a[property] < b[property]
      ? 1
      : -1;
  });
}
