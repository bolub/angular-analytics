import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ChartTypeState } from './chart-type.reducer';

export const selectChartTypesState =
  createFeatureSelector<ChartTypeState>('chartTypes');

export const selectAllChartTypes = createSelector(
  selectChartTypesState,
  (state) => state.allChartTypes
);

export const selectAllChartTypesForViewMode = createSelector(
  selectChartTypesState,
  (state) => state.allChartTypesForViewMode
);

export const selectChartTypeStatus = createSelector(
  selectChartTypesState,
  (state) => state.status
);

export const selectActionType = createSelector(
  selectChartTypesState,
  (state) => state.actionType
);

export const selectChartTypesLoadingStatus = createSelector(
  selectChartTypesState,
  (state) => state.allChartTypesLoadingStatus
);

export const selectFilterRange = createSelector(
  selectChartTypesState,
  (state) => state.filterRange
);
