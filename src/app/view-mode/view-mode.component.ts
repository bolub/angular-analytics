import { Component, OnInit } from '@angular/core';
import { Graph } from './components/graph-display/graph-display.component';
import { ChartType, GraphValue, MockService } from '../services/mock.service';

type RangeType = { start?: Date | null; end?: Date | null };

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
})
export class ViewModeComponent implements OnInit {
  rangeValues: RangeType = {
    start: null,
    end: null,
  };

  chartTypesList: ChartType[] = [];
  chartTypesListWithData: Graph[] = [];
  originalChartTypesListWithData: Graph[] = [];

  graphValues: GraphValue[] = [];

  formatData(chartTypesList: ChartType[], graphValues: GraphValue[]) {
    return chartTypesList.map((ctld) => {
      return {
        ...ctld,
        data: graphValues,
      };
    });
  }

  dateToString(date?: Date | null) {
    return date ? date.toISOString().slice(0, 10) : '';
  }

  handleDateChange(range: RangeType) {
    this.rangeValues = range;

    const newGraphValues = [...this.graphValues].filter((gv) => {
      const itemDate = new Date(gv.date).toISOString().slice(0, 10);

      const startDate = this.dateToString(range?.start);
      const endDate = this.dateToString(range.end);

      return itemDate >= startDate && itemDate <= endDate;
    });

    const combined = this.formatData([...this.chartTypesList], newGraphValues);
    this.chartTypesListWithData = combined;
  }

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.chartTypesList = this.mockService.generateChartTypeData();
    this.graphValues = this.mockService.generateGraphData();

    const combined = this.formatData(
      [...this.chartTypesList],
      this.graphValues
    );

    this.chartTypesListWithData = combined;
    this.originalChartTypesListWithData = combined;
  }
}
