import { createReducer, on } from '@ngrx/store';
import {
  createChartType,
  createChartTypeError,
  createChartTypeSuccess,
  filterChartTypes,
  loadChartTypes,
  loadChartTypesFailure,
  loadChartTypesSuccess,
  loadGraphData,
  resetFilteredChartTypes,
} from './chart-type.action';
import {
  ChartTypeFull,
  GraphValue,
} from 'src/app/modules/settings/settings.model';
import { filterByDateRange, formatData } from 'src/app/modules/view-mode/utils';
import { RangeType } from 'src/app/modules/view-mode/view-mode.model';

export type Status = 'pending' | 'loading' | 'error' | 'success';

export interface ChartTypeState {
  allChartTypes: ChartTypeFull[];
  error: string;
  status: Status;
  allChartTypesLoadingStatus: Status;
  graphValues: GraphValue[];
  filteredGraphValues: GraphValue[];
  filterRange: RangeType;
}

export const initialState: ChartTypeState = {
  allChartTypes: [],
  error: '',
  status: 'pending' as Status,
  allChartTypesLoadingStatus: 'pending' as Status,
  graphValues: [],
  filteredGraphValues: [],
  filterRange: {
    start: null,
    end: null,
  },
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
    allChartTypes: payload.chartTypes,
  })),
  on(loadChartTypesFailure, (state, payload) => ({
    ...state,
    allChartTypesLoadingStatus: 'error' as Status,
    error: payload.error,
  })),

  // load graph value
  on(loadGraphData, (state, payload) => ({
    ...state,
    graphValues: payload.data,
    filteredGraphValues: payload.data,
  })),

  // filter chart types
  on(filterChartTypes, (state, { range }) => {
    const filteredGraphValues = filterByDateRange(
      [...state.graphValues],
      range
    );

    return {
      ...state,
      filteredGraphValues: filteredGraphValues,
      chartTypes: formatData([...state.allChartTypes], filteredGraphValues),
      filterRange: range,
    };
  }),

  on(resetFilteredChartTypes, (state) => {
    return {
      ...state,
      filteredGraphValues: state.graphValues,
      filterRange: {
        start: null,
        end: null,
      },
    };
  })
);
