import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject, Subscription, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-t-pagination',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './t-pagination.component.html',
  styleUrl: './t-pagination.component.scss',
})
export class TPaginationComponent {
  private subscribers: Subscription[] = [];

  /**
   * Current Page
   */
  private currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable();

  get currentPage() {
    return this.currentPageSubject.getValue();
  }

  /**
   * Num pages
   */

  private numPagesSubject = new BehaviorSubject<number>(0);

  @Input()
  set numPages(value: number | null) {
    this.numPagesSubject.next(value ?? 1);
  }

  get numPages(): number {
    return this.numPagesSubject.getValue();
  }

  numPages$ = this.numPagesSubject.asObservable();

  @Output() pageChange = new EventEmitter<number>();

  prevPage$ = this.currentPage$.pipe(map((currentPage) => currentPage - 1));
  prevPages$ = this.currentPage$.pipe(
    map((currentPage) =>
      Array(2)
        .fill(0)
        .map((_, idx) => currentPage - 1 * (idx + 1))
        .filter((val) => val > 0)
        .reverse()
    )
  );
  hasMorePrevPages$ = combineLatest([this.currentPage$, this.numPages$]).pipe(
    map(([currentPage, numPages]) => currentPage > 3)
  );
  hasPrevPage$ = this.prevPage$.pipe(map((prevPage) => prevPage >= 1));

  nextPage$ = this.currentPage$.pipe(map((currentPage) => currentPage + 1));
  nextPages$ = combineLatest([this.currentPage$, this.numPages$]).pipe(
    map(([currentPage, numPages]) =>
      Array(2)
        .fill(0)
        .map((_, idx) => currentPage + (idx + 1))
        .filter((val) => val <= numPages)
    )
  );
  hasNextPage$ = combineLatest([this.nextPage$, this.numPages$]).pipe(
    map(([nextPage, numPages]) => nextPage <= numPages)
  );
  hasMoreNextPages$ = combineLatest([this.currentPage$, this.numPages$]).pipe(
    map(([currentPage, numPages]) => numPages - currentPage > 2)
  );

  setPage(page: number) {
    if (page < 1 || page > this.numPages) {
      return;
    }

    this.currentPageSubject.next(page);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.numPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  ngOnInit() {
    this.subscribers.push(
      this.currentPage$.subscribe((currentPage) =>
        this.pageChange.emit(currentPage)
      )
    );
  }

  ngOnDestroy() {
    this.subscribers.forEach((sub) => sub.unsubscribe());
  }
}
