import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyComponent {
  @Input({ required: true }) title!: string;
}
