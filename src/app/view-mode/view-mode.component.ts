import { Component, OnInit } from '@angular/core';
import { Graph } from './components/graph-display/graph-display.component';
import { MockService } from '../services/mock.service';

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

  chartTypesList: Graph[] = [
    {
      type: 'bar',
      color: 'red',
      data: [],
    },
    {
      type: 'pie',
      color: 'blue',
      data: [],
    },
    {
      type: 'line',
      color: 'yellow',
      data: [],
    },
  ];

  graphValues: { value: number; date: Date }[] = [];

  handleDateChange(range: RangeType) {
    this.rangeValues = range;
  }

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.graphValues = this.mockService.generateGraphData(20);

    this.chartTypesList = [...this.chartTypesList].map((chartTypeData) => {
      return {
        ...chartTypeData,
        data: this.graphValues,
      };
    });
  }
}
