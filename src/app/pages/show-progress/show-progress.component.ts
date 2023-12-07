import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressCircleComponent } from '../../progress-circle/progress-circle.component';

@Component({
  selector: 'app-show-progress',
  standalone: true,
  imports: [ProgressCircleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './show-progress.component.html',
  styleUrl: './show-progress.component.scss',
})
export class ShowProgressComponent {
  radius = 200;
  progress = 70;
  color = '#45c9f5';

  onChangeProgress($event: Event) {
    const value = ($event.target as HTMLInputElement).value;
    this.progress = +value;
  }
}
