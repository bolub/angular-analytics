import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { createChartType } from 'src/app/shared/state/chart-types/chart-type.action';
import { selectChartTypeStatus } from 'src/app/shared/state/chart-types/chart-type.selector';
import { Status } from 'src/app/shared/state/chart-types/chart-type.reducer';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
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
    NgFor,
    NgIf,
    AsyncPipe,
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

  title!: string;
  color!: string;
  selectedType!: ChartType['selectedType'];

  statusSubscription$ = this.store.select(selectChartTypeStatus);
  status!: Status;
  subscription!: Subscription;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription = this.statusSubscription$.subscribe((data) => {
      this.status = data;

      if (this.status === 'success') {
        this.dialog.closeAll();
        this.openSnackBar('Chart added successfully');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
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

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close');
  }
}
