import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { formatData } from './utils';
import {
  filterChartTypes,
  loadChartTypes,
  resetFilteredChartTypes,
} from 'src/app/shared/state/chart-types/chart-type.action';
import { Store } from '@ngrx/store';
import {
  selectAllChartTypes,
  selectChartTypesLoadingStatus,
  selectFilterRange,
  selectFilteredGraphValues,
  selectGraphValues,
} from 'src/app/shared/state/chart-types/chart-type.selector';
import { ViewMode } from './view-mode.model';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
})
export class ViewModeComponent implements OnInit {
  chartTypesList$!: Observable<ViewMode[]>;

  allChartTypesStatus$ = this.store.select(selectChartTypesLoadingStatus);
  graphValues$ = this.store.select(selectGraphValues);
  filteredGraphValues$ = this.store.select(selectFilteredGraphValues);
  filterRange$ = this.store.select(selectFilterRange);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.graphValues$.subscribe((data) => {
      this.chartTypesList$ = this.store.select(selectAllChartTypes).pipe(
        map((chartTypes) => {
          return formatData([...chartTypes], data);
        })
      );
    });

    this.store.dispatch(loadChartTypes());
  }
}
