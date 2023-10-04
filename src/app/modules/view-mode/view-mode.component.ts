import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { formatData } from './utils';
import {
  filterCharts,
  loadChartTypes,
  resetFilteredCharts,
} from 'src/app/shared/state/chart-types/chart-type.action';
import { Store } from '@ngrx/store';
import {
  selectAllChartTypes,
  selectChartTypesLoadingStatus,
  selectFilteredGraphValues,
  selectGraphValues,
} from 'src/app/shared/state/chart-types/chart-type.selector';
import { RangeType, ViewMode } from './view-mode.model';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
})
export class ViewModeComponent implements OnInit {
  chartTypesList$!: Observable<ViewMode[]>;

  allChartTypesStatus$ = this.store.select(selectChartTypesLoadingStatus);
  graphValues$ = this.store.select(selectGraphValues);
  filteredGraphValues$ = this.store.select(selectFilteredGraphValues);

  rangeValues: RangeType = {
    start: null,
    end: null,
  };

  handleDateChange(range: RangeType) {
    this.rangeValues = range;
    this.store.dispatch(filterCharts({ range }));
  }

  resetDateRange() {
    this.rangeValues = {
      start: null,
      end: null,
    };

    this.store.dispatch(resetFilteredCharts());
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.graphValues$.subscribe((data) => {
      // @ts-ignore
      this.chartTypesList$ = this.store.select(selectAllChartTypes).pipe(
        map((chartTypes) => {
          return formatData([...chartTypes], data);
        })
      );
    });

    this.store.dispatch(loadChartTypes());
  }
}
