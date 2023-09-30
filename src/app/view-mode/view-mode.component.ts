import { Component, OnInit } from '@angular/core';
import { Graph } from './components/graph-display/graph-display.component';
import { MockService } from '../services/mock.service';
import { GraphContent } from '../settings/settings.component';

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

  graphContent: GraphContent[] = [];
  chartTypesList: Graph[] = [];

  graphValues: { value: number; date: Date }[] = [];

  handleDateChange(range: RangeType) {
    this.rangeValues = range;
  }

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.graphContent = this.mockService.generateChartTypeData();
    this.graphValues = this.mockService.generateGraphData(20);

    this.chartTypesList = [...this.graphContent].map((graphContent) => {
      return {
        ...graphContent,
        data: this.graphValues,
      };
    });
  }
}
