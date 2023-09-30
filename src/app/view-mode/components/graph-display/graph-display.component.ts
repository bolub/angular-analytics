import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartType, GraphValue } from 'src/app/services/mock.service';

export type Graph = ChartType & {
  data: GraphValue[];
};

@Component({
  selector: 'app-graph-display',
  templateUrl: './graph-display.component.html',
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
      series: [
        {
          data: this.formatData(),
          type: this.data.type as any,
        },
      ],
      xAxis: {
        type: 'datetime',
      },
    };
  }
}
