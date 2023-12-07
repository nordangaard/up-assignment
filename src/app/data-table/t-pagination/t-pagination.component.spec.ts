import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TPaginationComponent } from './t-pagination.component';

describe('TPaginationComponent', () => {
  let component: TPaginationComponent;
  let fixture: ComponentFixture<TPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with default values', () => {
    expect(component.currentPage).toBe(1);
    expect(component.numPages).toBe(0);
  });

  it('should subscribe to currentPage$ observable on ngOnInit', () => {
    spyOn(component.currentPage$, 'subscribe');
    component.ngOnInit();
    expect(component.currentPage$.subscribe).toHaveBeenCalled();
  });

  it('should default numPages to 1 when null is set', () => {
    component.numPages = null;
    expect(component.numPages).toBe(1);
  });

  it('should emit pageChange event when page changes', () => {
    component.numPages = 2;
    spyOn(component.pageChange, 'emit');

    component.setPage(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should increment currentPage on nextPage()', async () => {
    component.numPages = 2;
    component.nextPage();
    expect(component.currentPage).toBe(2);
  });

  it('should decrement currentPage on prevPage()', () => {
    component.numPages = 2;
    component.setPage(2);
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should not increment currentPage beyond numPages', () => {
    component.numPages = 3;
    component.setPage(3);
    component.nextPage();
    expect(component.currentPage).toBe(3);
  });

  it('should not decrement currentPage below 1', () => {
    component.setPage(1);
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should update prevPage$ and nextPage$ based on currentPage', async () => {
    component.numPages = 3;
    component.setPage(2);
    component.prevPage$.subscribe((prevPage) => {
      expect(prevPage).toBe(1);
    });
    component.nextPage$.subscribe((nextPage) => {
      expect(nextPage).toBe(3);
    });
  });

  it('should calculate prevPages$ and nextPages$ correctly', () => {
    component.numPages = 5;
    component.setPage(3);
    component.prevPages$.subscribe((prevPages) => {
      expect(prevPages).toEqual([1, 2]);
    });
    component.nextPages$.subscribe((nextPages) => {
      expect(nextPages).toEqual([4, 5]);
    });
  });

  it('should update hasPrevPage$ and hasNextPage$ based on currentPage and numPages', () => {
    component.numPages = 5;
    component.setPage(1);
    component.hasPrevPage$.subscribe((hasPrev) => {
      expect(hasPrev).toBeFalse();
    });
    component.hasNextPage$.subscribe((hasNext) => {
      expect(hasNext).toBeTrue();
    });
  });

  it('should correctly compute hasMorePrevPages$ and hasMoreNextPages$', () => {
    component.numPages = 8;
    // Only appears wher we are somewhere in the middle of the pages
    component.setPage(5);

    component.hasMorePrevPages$.subscribe((hasMorePrev) => {
      expect(hasMorePrev).toBeTrue();
    });
    component.hasMoreNextPages$.subscribe((hasMoreNext) => {
      expect(hasMoreNext).toBeTrue();
    });
  });
});
