import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  filter,
  isObservable,
  map,
  mergeAll,
  of,
} from 'rxjs';
import { Order } from '../../types/order';
import { TColumnComponent } from '../t-column/t-column.component';
import { TPaginationComponent } from '../t-pagination/t-pagination.component';
import { chunkTableData } from './helpers/chunk';
import { sortTableData } from './helpers/sort';
import { Column, ColumnSort } from './types/column';
import { PaginationChangeEvent, SortChangeEvent } from './types/events';

@Component({
  selector: 'app-t-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TColumnComponent, TPaginationComponent],
  providers: [DatePipe],
  templateUrl: './t-grid.component.html',
  styleUrl: './t-grid.component.scss',
})
export class TGridComponent<T extends Order> {
  private subscribers: Subscription[] = [];

  /**
   * Data - the data to be displayed in the table
   */
  private dataSubject = new BehaviorSubject<Observable<T[]>>(of([]));

  @Input()
  set data(value: Observable<T[]> | T[]) {
    this.dataSubject.next(isObservable(value) ? value : of(value));
  }

  get data(): Observable<Observable<T[]>> {
    return this.dataSubject.asObservable();
  }

  data$: Observable<T[]> = this.data.pipe(mergeAll());

  /**
   * Sortable - should grid allow sorting globally, mute column settings
   */
  private sortableSubject = new BehaviorSubject<boolean>(true);

  @Input()
  set sortable(value: boolean) {
    this.sortableSubject.next(value);
  }

  get sortable(): boolean {
    return this.sortableSubject.value;
  }

  isGridSortable$ = this.sortableSubject.asObservable();

  /**
   * PageSize - the maximum amount of items to display on a page
   */
  private pageSizeSubject = new BehaviorSubject<number | null>(null);
  pageSize$: Observable<number | null> = this.pageSizeSubject.asObservable();

  private _pageSize: number | null = null;
  @Input()
  set pageSize(value: number | null) {
    this._pageSize = value;
    this.pageSizeSubject.next(value);
  }

  get pageSize(): number | null {
    return this._pageSize;
  }

  /**
   * Column components - the passed components to be displayed
   */
  @ContentChildren(TColumnComponent)
  tColumns!: QueryList<TColumnComponent>;
  columnSubject = new BehaviorSubject<TColumnComponent[]>([]);

  columnComponents$: Observable<TColumnComponent[]> =
    this.columnSubject.asObservable();

  columns$: Observable<Column<T>[]> = combineLatest(
    this.columnComponents$,
    this.isGridSortable$
  ).pipe(
    map(([columns, isGridSortable]) =>
      columns.map(
        ({ name, property, sortable }) =>
          ({
            name,
            property,
            sortable: isGridSortable && sortable,
          } as Column<T>)
      )
    )
  );

  /**
   * Column sort - the column to be sorted by
   */

  private columnSortSubject = new BehaviorSubject<ColumnSort<T> | null>(null);
  columnSort$: Observable<ColumnSort<T> | null> =
    this.columnSortSubject.asObservable();

  @Output() sortChange = new EventEmitter<SortChangeEvent>();

  /**
   * Final & sorted columns - the columns to be displayed in the table
   */
  sortableColumns$: Observable<ColumnSort<T>[]> = combineLatest([
    this.columns$,
    this.columnSort$,
  ]).pipe(
    map(([columns, columnSort]) =>
      columns.map((column) => {
        if (column === columnSort?.column) {
          return {
            column,
            direction: columnSort.direction,
          };
        }

        return {
          column,
          direction: null,
        };
      })
    )
  );

  /**
   * Pagination - the pagination state of the table
   */
  numPages$: Observable<number> = combineLatest([
    this.data$,
    this.pageSize$,
  ]).pipe(
    map(([data, pageSize]) =>
      pageSize ? Math.ceil(data.length / pageSize) : 1
    )
  );

  dataChunks$: Observable<T[][]> = combineLatest([
    this.data$,
    this.numPages$,
    this.pageSize$,
    this.columnSort$,
  ]).pipe(
    map(([data, numChunks, pageSize, columnSort]) => {
      const perChunk = pageSize ?? data.length;
      const sortedData = !columnSort
        ? data
        : sortTableData(columnSort.column.property, columnSort.direction, data);

      return chunkTableData(numChunks, perChunk, sortedData);
    })
  );

  currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$: Observable<number> = this.currentPageSubject.asObservable();

  @Output() paginationChange = new EventEmitter<PaginationChangeEvent>();

  /**
   * Final chunked and sorted items
   */
  items$: Observable<T[]> = combineLatest([
    this.dataChunks$,
    this.currentPage$,
  ]).pipe(map(([dataChunks, currentPage]) => dataChunks[currentPage - 1]));

  /**
   * Lifecycle hooks
   */
  ngOnInit() {
    const sortEventSub = this.columnSort$
      .pipe(filter((sort) => !!sort))
      .subscribe((sort) => {
        const sortChange = sort as ColumnSort<T>;
        this.sortChange.emit({
          columnName: sortChange.column.name,
          direction: sortChange.direction,
        });
      });

    const paginationEventSub = combineLatest([
      this.currentPage$,
      this.pageSize$,
    ]).subscribe(([currentPage, pageSize]) => {
      this.paginationChange.emit({ currentPage, pageSize });
    });

    this.subscribers.push(...[sortEventSub, paginationEventSub]);
  }

  constructor(private datePipe: DatePipe) {}

  ngAfterContentInit() {
    const colChangeSub = this.tColumns.changes.subscribe(() => {
      this.columnSubject.next(this.tColumns.toArray());
    });

    this.columnSubject.next(this.tColumns.toArray());
    this.subscribers.push(colChangeSub);
  }

  ngOnDestroy() {
    this.subscribers.forEach((sub) => sub.unsubscribe());
  }

  formatData(value: unknown) {
    if (value instanceof Date) {
      return this.datePipe.transform(value);
    }

    return value;
  }

  /**
   * UI Actions
   */

  setSort({ column, direction }: ColumnSort<T>) {
    if (!column.sortable) {
      return;
    }

    const currentSort = this.columnSortSubject.value;
    this.columnSortSubject.next({
      column,
      direction:
        currentSort && currentSort.column === column && direction !== 'desc'
          ? 'desc'
          : 'asc',
    });
  }

  onPageChange(page: number) {
    this.currentPageSubject.next(page);
  }
}
