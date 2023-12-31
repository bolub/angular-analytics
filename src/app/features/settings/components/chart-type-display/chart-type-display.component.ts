import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartTypeFull } from '../../settings.model';
import { Store } from '@ngrx/store';
import { ChartTypeActions } from 'src/app/shared/state/chart-types/chart-type.action';
import { Subscription, combineLatest } from 'rxjs';
import {
  Status,
  chartTypesFeature,
} from 'src/app/shared/state/chart-types/chart-type.reducer';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditChartTypeDialogComponent } from '../chart-type-dialog/edit-chart-type-dialog/edit-chart-type-dialog.component';

@Component({
  selector: 'app-chart-type-display',
  templateUrl: './chart-type-display.component.html',
  standalone: true,
  imports: [MatSnackBarModule, CommonModule, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTypeDisplay {
  @Input({ required: true }) data!: ChartTypeFull;

  loading = false;

  status!: Status;
  dataSubscription$!: Subscription;

  constructor(
    private store: Store,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  onDelete() {
    this.store.dispatch(
      ChartTypeActions.delete({
        $id: this.data.$id,
      })
    );
  }

  openEditModal() {
    this.store.dispatch(
      ChartTypeActions.setCurrentChartType({
        data: this.data,
      })
    );
    this.dialog.open(EditChartTypeDialogComponent);
  }

  ngOnInit(): void {
    this.dataSubscription$ = combineLatest({
      status: this.store.select(chartTypesFeature.selectStatus),
      actionType: this.store.select(chartTypesFeature.selectActionType),
    }).subscribe((data) => {
      const { status, actionType } = data;
      this.status = status;

      if (status === 'success' && actionType === 'delete') {
        this.dialog.closeAll();
        this._snackBar.open('Chart deleted successfully', 'close');
        window.location.reload();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription$) {
      this.dataSubscription$.unsubscribe();
    }
  }
}
