import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ViewMode } from './view-mode.model';
import { ChartTypeActions } from 'src/app/shared/state/chart-types/chart-type.action';
import { chartTypesFeature } from 'src/app/shared/state/chart-types/chart-type.reducer';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
})
export class ViewModeComponent implements OnInit {
  data$ = combineLatest({
    allChartTypesForViewMode: this.store.select(
      chartTypesFeature.selectAllChartTypesForViewMode
    ),
    status: this.store.select(
      chartTypesFeature.selectAllChartTypesLoadingStatus
    ),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ChartTypeActions.load());
  }

  trackByFn(index: number, item: ViewMode) {
    return item.$id;
  }
}
