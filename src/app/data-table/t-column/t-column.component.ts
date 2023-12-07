import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-t-column',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './t-column.component.html',
  styleUrl: './t-column.component.scss',
})
export class TColumnComponent {
  @Input()
  public name?: string;

  @Input()
  public property?: string;

  @Input()
  public sortable: boolean = false;
}
