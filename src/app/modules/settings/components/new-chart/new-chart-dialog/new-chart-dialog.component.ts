import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import {
  createChartType,
  loadChartTypes,
} from 'src/app/shared/state/chart-types/chart-type.action';
import {
  selectActionType,
  selectChartTypeStatus,
} from 'src/app/shared/state/chart-types/chart-type.selector';
import {
  ActionType,
  Status,
} from 'src/app/shared/state/chart-types/chart-type.reducer';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription, combineLatest, firstValueFrom } from 'rxjs';
import { ChartType } from '../../../settings.model';

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
    CommonModule,
    MatSnackBarModule,
  ],
})
export class NewChartDialogComponent implements OnInit, OnDestroy {
  chartTypes: ChartTypeSelector[] = [
    { value: 'bar', viewValue: 'Bar' },
    { value: 'line', viewValue: 'Line' },
    { value: 'pie', viewValue: 'Pie' },
    { value: 'area', viewValue: 'Area' },
    { value: 'spline', viewValue: 'Spline' },
  ];

  title = '';
  color = '';
  selectedType!: ChartType['selectedType'];

  status!: Status;
  dataSubscription$!: Subscription;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataSubscription$ = combineLatest({
      status: this.store.select(selectChartTypeStatus),
      actionType: this.store.select(selectActionType),
    }).subscribe((data) => {
      const { status, actionType } = data;
      this.status = status;

      if (status === 'success' && actionType === 'create') {
        this.dialog.closeAll();
        this._snackBar.open('Chart added successfully', 'close');
        this.store.dispatch(loadChartTypes());
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription$) {
      this.dataSubscription$.unsubscribe();
    }
  }

  onAddChart() {
    this.store.dispatch(
      createChartType({
        title: this.title,
        color: this.color,
        selectedType: this.selectedType,
      })
    );
  }
}
