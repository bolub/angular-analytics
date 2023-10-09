import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ChartTypeActions } from 'src/app/shared/state/chart-types/chart-type.action';
import {
  selectActionType,
  selectChartTypeStatus,
} from 'src/app/shared/state/chart-types/chart-type.selector';
import { Status } from 'src/app/shared/state/chart-types/chart-type.reducer';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription, combineLatest } from 'rxjs';
import { FormInputComponent } from '../form-input.component';

@Component({
  selector: 'app-new-chart-dialog',
  templateUrl: './new-chart-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatSnackBarModule,
    FormInputComponent,
  ],
})
export class NewChartDialogComponent implements OnInit, OnDestroy {
  status!: Status;
  dataSubscription$!: Subscription;

  @ViewChild('chartFormComponent')
  chartFormComponent!: FormInputComponent;

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

        window.location.reload();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription$) {
      this.dataSubscription$.unsubscribe();
    }
  }

  onAddChart() {
    const formValues = this.chartFormComponent.chartForm.value;

    this.store.dispatch(
      ChartTypeActions.create({
        title: formValues.title,
        color: formValues.color,
        selectedType: formValues.selectedType,
      })
    );
  }

  isButtonDisabled(form: FormGroup): boolean {
    return Object.values(form.controls).some((control) => control.value === '');
  }
}
