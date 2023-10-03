import { createReducer, on } from '@ngrx/store';
import {
  NewChartType,
  createChartType,
  createChartTypeError,
  createChartTypeSuccess,
  loadChartTypes,
  loadChartTypesFailure,
  loadChartTypesSuccess,
} from './chart-type.action';

export type Status = 'pending' | 'loading' | 'error' | 'success';

export interface ChartTypeState {
  chartTypes: NewChartType[];
  error: string;
  status: Status;
  allChartTypesLoadingStatus: Status;
}

export const initialState: ChartTypeState = {
  chartTypes: [],
  error: '',
  status: 'pending' as Status,
  allChartTypesLoadingStatus: 'pending' as Status,
};

export const chartTypeReducer = createReducer(
  initialState,

  // create chart types
  on(createChartType, (state, payload) => ({
    ...state,
    status: 'loading' as Status,
  })),
  on(createChartTypeSuccess, (state, payload) => ({
    ...state,
    status: 'success' as Status,
  })),
  on(createChartTypeError, (state, payload) => ({
    ...state,
    error: payload.error,
    status: 'error' as Status,
  })),

  // load chart types
  on(loadChartTypes, (state, payload) => ({
    ...state,
    allChartTypesLoadingStatus: 'loading' as Status,
  })),
  on(loadChartTypesSuccess, (state, payload) => ({
    ...state,
    allChartTypesLoadingStatus: 'success' as Status,
    chartTypes: payload.chartTypes,
  })),
  on(loadChartTypesFailure, (state, payload) => ({
    ...state,
    allChartTypesLoadingStatus: 'error' as Status,
    error: payload.error,
  }))
);
