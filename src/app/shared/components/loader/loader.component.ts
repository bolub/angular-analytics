import { Component, Input } from '@angular/core';
import { Status } from '../../state/chart-types/chart-type.reducer';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  @Input({ required: true }) status!: Status;
}
