import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Status } from '../../state/chart-types/chart-type.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatProgressSpinnerModule, NgIf],
})
export class LoaderComponent {
  @Input({ required: true }) status!: Status;
}
