import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-circle',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './progress-circle.component.html',
  styleUrl: './progress-circle.component.scss',
})
export class ProgressCircleComponent {
  private subscribers: Subscription[] = [];

  private radiusSubject = new BehaviorSubject<number>(50);

  @Input()
  set radius(value: number) {
    if (value < 50) {
      throw new RangeError('Radius must be greater than 50.');
    } else {
      this.radiusSubject.next(value);
    }
  }

  get radius() {
    return this.radiusSubject.getValue();
  }

  radius$ = this.radiusSubject.asObservable();

  private progressSubject = new BehaviorSubject<number>(0);

  @Input()
  set progress(value: number) {
    if (value < 0) {
      throw new RangeError('Progress must be greater than 0.');
    } else if (value > 100) {
      throw new RangeError('Progress must be less than 100.');
    } else {
      this.progressSubject.next(value);
    }
  }

  get progress() {
    return this.progressSubject.getValue();
  }

  progress$ = this.progressSubject.asObservable();

  @Input()
  color = '#45c9f5';

  @Output()
  complete = new EventEmitter<void>();

  get secondaryColor() {
    return '#eee'; // Possibility of generating a complimentary color from primary
  }

  ngOnInit() {
    this.subscribers.push(
      this.progress$.subscribe((radius) => {
        if (radius === 100) {
          this.complete.emit();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscribers.forEach((sub) => sub.unsubscribe());
  }
}
