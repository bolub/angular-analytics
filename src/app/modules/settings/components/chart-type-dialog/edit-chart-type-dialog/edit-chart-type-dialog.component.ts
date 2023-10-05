import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { updateChartType } from 'src/app/shared/state/chart-types/chart-type.action';
import {
  selectActionType,
  selectChartTypeStatus,
  selectCurrentChartType,
} from 'src/app/shared/state/chart-types/chart-type.selector';
import { Status } from 'src/app/shared/state/chart-types/chart-type.reducer';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription, combineLatest } from 'rxjs';
import { ChartType } from '../../../settings.model';

interface ChartTypeSelector {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-chart-type-dialog',
  templateUrl: './edit-chart-type-dialog.component.html',
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
export class EditChartTypeDialogComponent {
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
  type = 'newChart';
  id = '';

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
      currentChartType: this.store.select(selectCurrentChartType),
    }).subscribe((data) => {
      const { status, actionType, currentChartType } = data;

      this.status = status;

      if (currentChartType) {
        this.id = currentChartType.$id;
        this.title = currentChartType.title;
        this.color = currentChartType.color;
        this.selectedType = currentChartType.selectedType;
        this.type = 'updateChart';

        if (status === 'success' && actionType === 'update') {
          this.dialog.closeAll();
          this._snackBar.open('Chart updated successfully', 'close');

          window.location.reload();
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription$) {
      this.dataSubscription$.unsubscribe();
    }
  }

  trackByFn(index: number, item: ChartTypeSelector) {
    return item.value;
  }

  onUpdateChart() {
    this.store.dispatch(
      updateChartType({
        $id: this.id,
        data: {
          title: this.title,
          color: this.color,
          selectedType: this.selectedType,
        },
      })
    );
  }
}
