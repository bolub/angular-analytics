import { Component, Input } from '@angular/core';
import { ChartType } from 'src/app/services/mock.service';

@Component({
  selector: 'app-graph-content',
  templateUrl: './graph-content.component.html',
})
export class GraphContentComponent {
  @Input({ required: true }) data!: ChartType;
}
