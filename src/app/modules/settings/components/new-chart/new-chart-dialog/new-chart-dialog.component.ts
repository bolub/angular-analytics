import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ChartType } from 'src/app/core/services/mock.service';
import { ChartTypesService } from 'src/app/core/services/chart-types.service';

interface ChartTypeSelector {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-chart-dialog',
  templateUrl: './new-chart-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgFor,
  ],
})
export class NewChartDialogComponent {
  chartTypes: ChartTypeSelector[] = [
    { value: 'bar', viewValue: 'Bar' },
    { value: 'line', viewValue: 'Line' },
    { value: 'pie', viewValue: 'Pie' },
    { value: 'area', viewValue: 'Area' },
    { value: 'spline', viewValue: 'Spline' },
  ];

  title!: string;
  color!: string;
  type!: ChartType['type'];

  constructor(private chartTypesService: ChartTypesService) {}

  onAddChart() {
    this.chartTypesService
      .createChartType({
        title: this.title,
        color: this.color,
        type: this.type,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
