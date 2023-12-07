import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-circle',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './progress-circle.component.html',
  styleUrl: './progress-circle.component.scss',
})
export class ProgressCircleComponent {
  @Input()
  radius = 24;

  @Input()
  progress = 0;

  @Input()
  color = '#45c9f5';

  get secondaryColor() {
    return '#eee'; // Possibility of generating a complimentary color from primary
  }
}
