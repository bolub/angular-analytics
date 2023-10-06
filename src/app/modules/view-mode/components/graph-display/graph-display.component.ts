import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})

//
export class GraphDisplayComponent implements OnChanges {
  @Input({ required: true }) data!: Graph;

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {};
  updateFlag: boolean = false;
  oneToOneFlag: boolean = true;
  runOutsideAngular: boolean = false;

  formatData(data: GraphValue[]) {
    return data.map((d) => {
      return {
        x: d.date,
        y: d.value,
        name: d.label,
      };
    });
  }

  ngOnInit(): void {
    this.chartOptions = {
      ...this.chartOptions,
      title: {
        text: this.data.title,
      },
      colors: [this.data.color],
      series: [
        {
          data: this.formatData(this.data.data),
          type: this.data.selectedType as any,
        },
      ],
      xAxis: {
        type: 'datetime',
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentValue = changes['data'].currentValue as Graph;

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          data: this.formatData(currentValue.data),
          type: this.data.selectedType as any,
        },
      ],
    };
  }
}
