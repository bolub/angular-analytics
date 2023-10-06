import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormsModule } from '@angular/forms';
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
import { ChartTypeDialogComponent } from '../form-input.component';
import { ChartType } from '../../../settings.model';

@Component({
  selector: 'app-edit-chart-type-dialog',
  templateUrl: './edit-chart-type-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatSnackBarModule,
    ChartTypeDialogComponent,
  ],
})
export class EditChartTypeDialogComponent implements AfterViewInit {
  id = '';
  defaultValues!: ChartType;

  status!: Status;
  dataSubscription$!: Subscription;

  @ViewChild('chartFormComponent')
  chartFormComponent!: ChartTypeDialogComponent;

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

        this.defaultValues = currentChartType;

        if (status === 'success' && actionType === 'update') {
          this.dialog.closeAll();
          this._snackBar.open('Chart updated successfully', 'close');

          window.location.reload();
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.chartFormComponent.chartForm.setValue({
      title: this.defaultValues.title,
      selectedType: this.defaultValues.selectedType,
      color: this.defaultValues.color,
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription$) {
      this.dataSubscription$.unsubscribe();
    }
  }

  onUpdateChart() {
    const formValues = this.chartFormComponent.chartForm.value;

    this.store.dispatch(
      updateChartType({
        $id: this.id,
        data: {
          title: formValues.title,
          color: formValues.color,
          selectedType: formValues.selectedType,
        },
      })
    );
  }

  isButtonDisabled(form: FormGroup): boolean {
    return Object.values(form.controls).some((control) => control.value === '');
  }
}
