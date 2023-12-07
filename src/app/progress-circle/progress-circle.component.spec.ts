import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressCircleComponent } from './progress-circle.component';

describe('ProgressCircleComponent', () => {
  let component: ProgressCircleComponent;
  let fixture: ComponentFixture<ProgressCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressCircleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw an error for invalid radius', () => {
    expect(() => {
      component.radius = 40;
    }).toThrowError(RangeError, 'Radius must be greater than 50.');
  });

  it('should accept valid radius', () => {
    component.radius = 60;
    expect(component.radius).toBe(60);
  });

  it('should throw an error for invalid progress', () => {
    expect(() => {
      component.progress = -10;
    }).toThrowError(RangeError, 'Progress must be greater than 0.');
    expect(() => {
      component.progress = 110;
    }).toThrowError(RangeError, 'Progress must be less than 100.');
  });

  it('should accept valid progress', () => {
    component.progress = 50;
    expect(component.progress).toBe(50);
  });

  it('should have the default color', () => {
    expect(component.color).toBe('#45c9f5');
  });

  it('should return the correct secondary color', () => {
    expect(component.secondaryColor).toBe('#eee');
  });

  it('should emit complete event when progress is 100', () => {
    spyOn(component.complete, 'emit');
    component.progress = 100;
    expect(component.complete.emit).toHaveBeenCalled();
  });
});
