import { createReducer, on } from '@ngrx/store';
import {
  createChartType,
  createChartTypeError,
  createChartTypeSuccess,
  deleteChartType,
  deleteChartTypeError,
  deleteChartTypeSuccess,
  filterViewModeData,
  loadChartTypes,
  loadChartTypesFailure,
  loadChartTypesSuccess,
  resetViewModeData,
  setCurrentChartType,
  updateChartType,
  updateChartTypeError,
  updateChartTypeSuccess,
} from './chart-type.action';
import { ChartTypeFull } from 'src/app/modules/settings/settings.model';
import { RangeType, ViewMode } from 'src/app/modules/view-mode/view-mode.model';
import { filterValidItemsInRange } from 'src/app/modules/view-mode/utils';

export type Status = 'pending' | 'loading' | 'error' | 'success';
export type ActionType = 'create' | 'delete' | 'update';

export interface ChartTypeState {
  allChartTypes: ChartTypeFull[];
  allChartTypesForViewMode: ViewMode[];
  originalAllChartTypesForViewMode: ViewMode[];
  error: string;
  status: Status;
  actionType?: ActionType;
  allChartTypesLoadingStatus: Status;
  filterRange: RangeType;
  currentChartType?: ChartTypeFull;
}

export const initialChartTypesState: ChartTypeState = {
  allChartTypes: [],
  allChartTypesForViewMode: [],
  originalAllChartTypesForViewMode: [],
  error: '',
  status: 'pending' as Status,
  allChartTypesLoadingStatus: 'pending' as Status,
  filterRange: {
    start: null,
    end: null,
  },
  actionType: undefined,
  currentChartType: undefined,
};

export const chartTypeReducer = createReducer(
  initialChartTypesState,

  // create chart types
  on(createChartType, (state, payload) => ({
    ...state,
    status: 'loading' as Status,
    actionType: 'create' as ActionType,
  })),
  on(createChartTypeSuccess, (state, payload) => ({
    ...state,
    status: 'success' as Status,
    actionType: undefined,
  })),
  on(createChartTypeError, (state, payload) => ({
    ...state,
    error: payload.error,
    status: 'error' as Status,
    actionType: undefined,
  })),

  // set current chart type
  on(setCurrentChartType, (state, payload) => ({
    ...state,
    currentChartType: payload.data,
  })),

  // delete chart types
  on(deleteChartType, (state, payload) => ({
    ...state,
    status: 'loading' as Status,
    actionType: 'delete' as ActionType,
  })),
  on(deleteChartTypeSuccess, (state, payload) => ({
    ...state,
    status: 'success' as Status,
    actionType: undefined,
  })),
  on(deleteChartTypeError, (state, payload) => ({
    ...state,
    error: payload.error,
    status: 'error' as Status,
    actionType: undefined,
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
    allChartTypesForViewMode: payload.chartTypesForViewMode,
    originalAllChartTypesForViewMode: payload.chartTypesForViewMode,
  })),

  on(loadChartTypesFailure, (state, payload) => ({
    ...state,
    allChartTypesLoadingStatus: 'error' as Status,
    error: payload.error,
  })),

  // filter view mode data
  on(filterViewModeData, (state, { range }) => {
    const filteredAllChartTypesForViewMode = filterValidItemsInRange(
      [...state.allChartTypesForViewMode],
      range
    );

    return {
      ...state,
      allChartTypesForViewMode: filteredAllChartTypesForViewMode,
      filterRange: range,
    };
  }),
  on(resetViewModeData, (state) => {
    return {
      ...state,
      allChartTypesForViewMode: state.originalAllChartTypesForViewMode,
      filterRange: {
        start: null,
        end: null,
      },
    };
  }),

  // update chart types
  on(updateChartType, (state, payload) => ({
    ...state,
    status: 'loading' as Status,
    actionType: 'update' as ActionType,
  })),
  on(updateChartTypeSuccess, (state, payload) => ({
    ...state,
    status: 'success' as Status,
    actionType: undefined,
  })),
  on(updateChartTypeError, (state, payload) => ({
    ...state,
    error: payload.error,
    status: 'error' as Status,
    actionType: undefined,
  }))
);
