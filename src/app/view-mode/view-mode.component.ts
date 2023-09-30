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
  originalChartTypesList: Graph[] = [];

  graphValues: { value: number; date: Date; label: string }[] = [];

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

    const combined = [...this.graphContent].map((graphContent) => {
      return {
        ...graphContent,
        data: newGraphValues,
      };
    });

    this.chartTypesList = combined;
  }

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.graphContent = this.mockService.generateChartTypeData();
    this.graphValues = this.mockService.generateGraphData();

    const combined = [...this.graphContent].map((graphContent) => {
      return {
        ...graphContent,
        data: this.graphValues,
      };
    });

    this.chartTypesList = combined;
    this.originalChartTypesList = combined;
  }
}
