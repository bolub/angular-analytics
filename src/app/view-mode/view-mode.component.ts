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

  handleDateChange(range: RangeType) {
    this.rangeValues = range;

    const newGraphValues = [...this.graphValues].filter((gv) => {
      const itemDate = new Date(gv.date).toISOString().slice(0, 10);

      return (
        // @ts-ignore
        itemDate >= range.start.toISOString().slice(0, 10) &&
        // @ts-ignore
        itemDate <= range.end.toISOString().slice(0, 10)
      );
    });

    const combined = [...this.chartTypesList].map((chartTypesList) => {
      return {
        ...chartTypesList,
        data: newGraphValues,
      };
    });

    this.chartTypesListWithData = combined;
  }

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.chartTypesList = this.mockService.generateChartTypeData();
    this.graphValues = this.mockService.generateGraphData();

    const combined = [...this.chartTypesList].map((chartTypesList) => {
      return {
        ...chartTypesList,
        data: this.graphValues,
      };
    });

    this.chartTypesListWithData = combined;
    this.originalChartTypesListWithData = combined;
  }
}
