# UI Path Assignment

## Pages

### Orders List

**Showcasing**

1. Page size set to 15 with corresponding pagination.
2. Sortable set to true, but false specifically for *Total* column.
3. Settings area to enable / disable individual columns from being displayed.
4. Data served as Observable from Orders service, randomised data on load.

### Users List

**Showcasing**

1. Page size set to null, displaying all users.
2. Data served as Array from Users service, randomised data on load.

### Show Progress Page

1. Progress bar as a cricle.
2. Slider to adjust current progress.

## Components

### app-t-grid

- Inputs
  - data `T[] | Observable<T[]>`
  - sortable `boolean`
  - pageSize `number | null`
- Outputs
  - sortChange `SortChangeEvent` -> `{ columnName: string; direction: SortDirection; }`
  - paginationChange `PaginationChangeEvent` -> `{ currentPage: number; pageSize: number | null; }`

### app-t-column

- Inputs
  - name `string`
  - property `keyof T`
  - sortable `boolean`

### app-t-pagination

Create a separate component to handle pagination to off load complexity from main grid and make it more modular.

- Inputs
  - numPages `number | null`
- Output
  - pageChange - `currentPage` -> `number`

### app-progress-circle

- Inputs
  - radius `number`
  - progress `number`
  - color `string`
- Output
  - complete
