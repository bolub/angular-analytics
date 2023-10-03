import { Component, Input } from '@angular/core';
import { ChartTypesService } from 'src/app/core/services/chart-types.service';
import { ChartTypeFull } from '../../settings.model';

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

    this.chartTypesService
      .deleteChartType(this.data?.$id || '')
      .subscribe((data) => {
        this.loading = false;
      });
  }
}
