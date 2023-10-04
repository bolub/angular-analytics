import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ChartTypeState } from './chart-type.reducer';

export const selectChartTypesState =
  createFeatureSelector<ChartTypeState>('chartTypes');

export const selectAllChartTypes = createSelector(
  selectChartTypesState,
  (state) => state.allChartTypes
);

export const selectChartTypeStatus = createSelector(
  selectChartTypesState,
  (state) => state.status
);

export const selectChartTypesLoadingStatus = createSelector(
  selectChartTypesState,
  (state) => state.allChartTypesLoadingStatus
);

export const selectGraphValues = createSelector(
  selectChartTypesState,
  (state) => state.graphValues
);

export const selectFilteredGraphValues = createSelector(
  selectChartTypesState,
  (state) => state.filteredGraphValues
);
