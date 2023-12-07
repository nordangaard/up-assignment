import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TGridComponent } from './t-grid.component';

describe('TGridComponent', () => {
  let component: TGridComponent<any>;
  let fixture: ComponentFixture<TGridComponent<any>>;

  const TEST_COLUMNS = [
    { name: 'Column 1', property: 'prop1', sortable: true },
    { name: 'Column 2', property: 'prop2', sortable: false },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display columns based on input data', () => {
    component.columnSubject.next(TEST_COLUMNS);
    fixture.detectChanges();

    const columnElements = fixture.debugElement.queryAll(By.css('th'));
    expect(columnElements.length).toBe(2);
    expect(columnElements[0].nativeElement.textContent).toContain('Column 1');
    expect(columnElements[1].nativeElement.textContent).toContain('Column 2');
  });

  it('should emit sortChange event when a column is clicked', () => {
    spyOn(component.sortChange, 'emit');

    component.columnSubject.next(TEST_COLUMNS);
    fixture.detectChanges();

    const columnHeader: DebugElement = fixture.debugElement.query(By.css('th'));
    columnHeader.triggerEventHandler('click', null);

    expect(component.sortChange.emit).toHaveBeenCalledWith({
      columnName: 'Column 1',
      direction: 'asc',
    });
  });
});
