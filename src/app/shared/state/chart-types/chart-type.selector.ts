import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ChartTypeState } from './chart-type.reducer';

export const selectChartTypes = (state: AppState) => state.chartTypes;

export const selectAllChartTypes = createSelector(
  selectChartTypes,
  (state: ChartTypeState) => state.allChartTypes
);

export const selectChartTypeStatus = createSelector(
  selectChartTypes,
  (state: ChartTypeState) => state.status
);

export const selectChartTypesLoadingStatus = createSelector(
  selectChartTypes,
  (state: ChartTypeState) => state.allChartTypesLoadingStatus
);

export const selectGraphValues = createSelector(
  selectChartTypes,
  (state: ChartTypeState) => state.filteredGraphValues
);

export const selectFilteredGraphValues = createSelector(
  selectChartTypes,
  (state: ChartTypeState) => state.filteredGraphValues
);
