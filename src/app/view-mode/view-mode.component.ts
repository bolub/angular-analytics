import { Component, OnInit } from '@angular/core';
import { Graph } from './components/graph-display/graph-display.component';
import { GraphValue, MockService } from '../services/mock.service';
import { ChartTypesService } from '../services/chart-types.service';
import { map } from 'rxjs';
import { filterByDateRange, formatData } from './utils';

export type RangeType = { start?: Date | null; end?: Date | null };

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
})
export class ViewModeComponent implements OnInit {
  rangeValues: RangeType = {
    start: null,
    end: null,
  };
  chartTypesList$ = this.chartTypesService.getChartTypes$.pipe(
    map((chartTypes) => {
      return formatData([...chartTypes.documents], this.graphValues);
    })
  );
  graphValues: GraphValue[] = [];

  handleDateChange(range: RangeType) {
    this.rangeValues = range;

    const newGraphValues = filterByDateRange([...this.graphValues], range);

    this.chartTypesList$ = this.chartTypesService.getChartTypes$.pipe(
      map((chartTypes) => {
        return formatData([...chartTypes.documents], newGraphValues);
      })
    );
  }

  resetDateRange() {
    this.rangeValues = {
      start: null,
      end: null,
    };

    this.graphValues = this.mockService.generateGraphData();

    this.chartTypesList$ = this.chartTypesService.getChartTypes$.pipe(
      map((chartTypes) => {
        return formatData([...chartTypes.documents], this.graphValues);
      })
    );
  }

  constructor(
    private mockService: MockService,
    private chartTypesService: ChartTypesService
  ) {}

  ngOnInit(): void {
    this.graphValues = this.mockService.generateGraphData();
  }
}
