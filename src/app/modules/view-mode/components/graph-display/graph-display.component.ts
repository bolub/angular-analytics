import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import {
  ChartTypeFull,
  GraphValue,
} from 'src/app/modules/settings/settings.model';

export type Graph = ChartTypeFull & {
  data: GraphValue[];
};

@Component({
  selector: 'app-graph-display',
  templateUrl: './graph-display.component.html',
  standalone: true,
  imports: [HighchartsChartModule],
})

//
export class GraphDisplayComponent implements OnInit {
  @Input({ required: true }) data!: Graph;

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {};
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) {}; // optional function, defaults to null
  updateFlag: boolean = false;
  oneToOneFlag: boolean = true;
  runOutsideAngular: boolean = false;

  formatData() {
    return this.data.data.map((d) => {
      return {
        x: d.date,
        y: d.value,
        name: d.label,
      };
    });
  }

  ngOnInit(): void {
    this.chartOptions = {
      title: {
        text: this.data.title,
      },
      colors: [this.data.color],
      series: [
        {
          data: this.formatData(),
          type: this.data.selectedType as any,
        },
      ],
      xAxis: {
        type: 'datetime',
      },
    };
  }
}
