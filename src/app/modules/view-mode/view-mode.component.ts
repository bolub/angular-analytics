import { Component, OnInit } from '@angular/core';
import {
  filterViewModeData,
  loadChartTypes,
} from 'src/app/shared/state/chart-types/chart-type.action';
import { Store } from '@ngrx/store';
import {
  selectAllChartTypesForViewMode,
  selectChartTypesLoadingStatus,
} from 'src/app/shared/state/chart-types/chart-type.selector';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
})
export class ViewModeComponent implements OnInit {
  allChartTypesForViewMode$ = this.store.select(selectAllChartTypesForViewMode);

  allChartTypesStatus$ = this.store.select(selectChartTypesLoadingStatus);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadChartTypes());
  }

  onTest() {
    console.log('on test');

    this.store.dispatch(
      filterViewModeData({
        range: {
          start: new Date(),
          end: new Date(),
        },
      })
    );
  }
}
