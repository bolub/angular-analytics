import { Component, Input } from '@angular/core';
import {
  ChartTypeFull,
  ChartTypesService,
} from 'src/app/services/chart-types.service';

@Component({
  selector: 'app-graph-content',
  templateUrl: './graph-content.component.html',
})
export class GraphContentComponent {
  @Input({ required: true }) data!: ChartTypeFull;

  constructor(private chartTypesService: ChartTypesService) {}

  loading = false;

  onDelete() {
    this.loading = true;

    this.chartTypesService.deleteChartType(this.data.$id).subscribe((data) => {
      this.loading = false;
    });
  }
}
