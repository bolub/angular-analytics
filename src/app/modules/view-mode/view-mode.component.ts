import { Component, OnInit } from '@angular/core';
import { MockService } from '../../core/services/mock.service';
import { ChartTypesService } from '../../core/services/chart-types.service';
import { map } from 'rxjs';
import { filterByDateRange, formatData } from './utils';
import { GraphValue } from '../settings/settings.model';
import { loadChartTypes } from 'src/app/shared/state/chart-types/chart-type.action';
import { Store } from '@ngrx/store';
import {
  selectAllChartTypes,
  selectChartTypesLoadingStatus,
} from 'src/app/shared/state/chart-types/chart-type.selector';

export type RangeType = { start?: Date | null; end?: Date | null };

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
})
export class ViewModeComponent implements OnInit {
  // @ts-ignore
  chartTypesList$ = this.store.select(selectAllChartTypes).pipe(
    map((chartTypes) => {
      return formatData([...chartTypes], this.graphValues);
    })
  );

  // @ts-ignore
  allChartTypesStatus$ = this.store.select(selectChartTypesLoadingStatus);

  rangeValues: RangeType = {
    start: null,
    end: null,
  };

  graphValues: GraphValue[] = [];

  handleDateChange(range: RangeType) {
    this.rangeValues = range;

    const newGraphValues = filterByDateRange([...this.graphValues], range);

    this.chartTypesList$ = this.chartTypesService.getChartTypes$.pipe(
      map((chartTypes) => {
        return formatData([...chartTypes.documents], newGraphValues);
      })
    );
  }

  resetDateRange() {
    this.rangeValues = {
      start: null,
      end: null,
    };

    this.graphValues = this.mockService.generateGraphData();

    this.chartTypesList$ = this.chartTypesService.getChartTypes$.pipe(
      map((chartTypes) => {
        return formatData([...chartTypes.documents], this.graphValues);
      })
    );
  }

  constructor(
    private mockService: MockService,
    private chartTypesService: ChartTypesService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.graphValues = this.mockService.generateGraphData();
    this.store.dispatch(loadChartTypes());
  }
}
