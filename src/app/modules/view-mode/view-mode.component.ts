import { Component, OnInit } from '@angular/core';
import { loadChartTypes } from 'src/app/shared/state/chart-types/chart-type.action';
import { Store } from '@ngrx/store';
import {
  selectAllChartTypesForViewMode,
  selectChartTypesLoadingStatus,
} from 'src/app/shared/state/chart-types/chart-type.selector';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
})
export class ViewModeComponent implements OnInit {
  data$ = combineLatest({
    allChartTypesForViewMode: this.store.select(selectAllChartTypesForViewMode),
    status: this.store.select(selectChartTypesLoadingStatus),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadChartTypes());
  }
}
