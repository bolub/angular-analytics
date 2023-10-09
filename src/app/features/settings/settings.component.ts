import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ChartTypeFull } from './settings.model';
import { MatDialog } from '@angular/material/dialog';
import { NewChartDialogComponent } from './components/chart-type-dialog/new-chart-dialog/new-chart-dialog.component';
import { ChartTypeActions } from 'src/app/shared/state/chart-types/chart-type.action';
import { chartTypesFeature } from 'src/app/shared/state/chart-types/chart-type.reducer';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  data$ = combineLatest({
    allChartTypes: this.store.select(chartTypesFeature.selectAllChartTypes),
    allChartTypesStatus: this.store.select(
      chartTypesFeature.selectAllChartTypesLoadingStatus
    ),
  });

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(ChartTypeActions.load());
  }

  trackByFn(index: number, item: ChartTypeFull) {
    return item.$id;
  }

  openDialog() {
    this.dialog.open(NewChartDialogComponent);
  }
}
