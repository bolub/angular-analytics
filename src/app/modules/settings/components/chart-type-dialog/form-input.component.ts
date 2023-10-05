import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartType } from '../../settings.model';
import { Store } from '@ngrx/store';

interface ChartTypeSelector {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTypeDialogComponent {
  chartTypes: ChartTypeSelector[] = [
    { value: 'bar', viewValue: 'Bar' },
    { value: 'line', viewValue: 'Line' },
    { value: 'pie', viewValue: 'Pie' },
    { value: 'area', viewValue: 'Area' },
    { value: 'spline', viewValue: 'Spline' },
  ];

  chartForm!: FormGroup;
  currentChartType!: ChartType | undefined;

  constructor(private fb: FormBuilder, private store: Store) {
    this.chartForm = this.fb.group({
      title: [''],
      selectedType: [''],
      color: [''],
    });
  }

  trackByFn(index: number, item: ChartTypeSelector) {
    return item.value;
  }
}
