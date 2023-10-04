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

export type Status = 'pending' | 'loading' | 'error' | 'success';

export interface ChartTypeState {
  allChartTypes: ChartTypeFull[];
  error: string;
  status: Status;
  allChartTypesLoadingStatus: Status;
  graphValues: GraphValue[];
  filteredGraphValues: GraphValue[];
}

export const initialState: ChartTypeState = {
  allChartTypes: [],
  error: '',
  status: 'pending' as Status,
  allChartTypesLoadingStatus: 'pending' as Status,
  graphValues: [],
  filteredGraphValues: [],
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
    // console.log(range);
    // console.log(filterByDateRange([...state.graphValues], range));

    const t = filterByDateRange([...state.graphValues], range);

    return {
      ...state,
      filteredGraphValues: t,
      chartTypes: formatData([...state.allChartTypes], t),
    };
  }),

  on(resetFilteredChartTypes, (state) => {
    return {
      ...state,
      filteredGraphValues: state.graphValues,
    };
  })
);
