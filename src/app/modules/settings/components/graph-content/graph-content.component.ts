import { Component, Input } from '@angular/core';
import { ChartTypeFull } from '../../settings.model';
import { Store } from '@ngrx/store';
import {
  deleteChartType,
  loadChartTypes,
  setCurrentChartType,
} from 'src/app/shared/state/chart-types/chart-type.action';
import {
  selectActionType,
  selectChartTypeStatus,
} from 'src/app/shared/state/chart-types/chart-type.selector';
import { Subscription, combineLatest } from 'rxjs';
import { Status } from 'src/app/shared/state/chart-types/chart-type.reducer';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NewChartDialogComponent } from '../new-chart/new-chart-dialog/new-chart-dialog.component';

@Component({
  selector: 'app-graph-content',
  templateUrl: './graph-content.component.html',
  standalone: true,
  imports: [MatSnackBarModule, CommonModule, MatIconModule, MatButtonModule],
})
export class GraphContentComponent {
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
      deleteChartType({
        $id: this.data.$id,
      })
    );
  }

  openEditModal() {
    this.store.dispatch(
      setCurrentChartType({
        data: this.data,
      })
    );
    this.dialog.open(NewChartDialogComponent);
  }

  ngOnInit(): void {
    this.dataSubscription$ = combineLatest({
      status: this.store.select(selectChartTypeStatus),
      actionType: this.store.select(selectActionType),
    }).subscribe((data) => {
      const { status, actionType } = data;
      this.status = status;

      if (status === 'success' && actionType === 'delete') {
        this.dialog.closeAll();
        this._snackBar.open('Chart deleted successfully', 'close');
        this.store.dispatch(loadChartTypes());
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription$) {
      this.dataSubscription$.unsubscribe();
    }
  }
}
