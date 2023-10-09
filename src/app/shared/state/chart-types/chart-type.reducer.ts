import { createReducer, on } from '@ngrx/store';
import { ChartTypeActions } from './chart-type.action';
import { ChartTypeFull } from 'src/app/features/settings/settings.model';
import {
  RangeType,
  ViewMode,
} from 'src/app/features/view-mode/view-mode.model';
import { filterValidItemsInRange } from 'src/app/features/view-mode/utils';

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

  // handle all success states
  on(
    ChartTypeActions.createSuccess,
    ChartTypeActions.deleteSuccess,
    ChartTypeActions.updateSuccess,
    (state) => ({
      ...state,
      status: 'success' as Status,
      actionType: undefined,
    })
  ),

  // handle all error states
  on(
    ChartTypeActions.createError,
    ChartTypeActions.deleteError,
    ChartTypeActions.updateError,
    ChartTypeActions.loadFailure,
    (state, payload) => ({
      ...state,
      error: payload.error,
      status: 'error' as Status,
      actionType: undefined,
      allChartTypesLoadingStatus: 'error' as Status,
    })
  ),

  // create chart types
  on(ChartTypeActions.create, (state, payload) => ({
    ...state,
    status: 'loading' as Status,
    actionType: 'create' as ActionType,
  })),

  // set current chart type
  on(ChartTypeActions.setCurrentChartType, (state, payload) => ({
    ...state,
    currentChartType: payload.data,
  })),

  // delete chart types
  on(ChartTypeActions.delete, (state, payload) => ({
    ...state,
    status: 'loading' as Status,
    actionType: 'delete' as ActionType,
  })),

  // load chart types
  on(ChartTypeActions.load, (state, payload) => ({
    ...state,
    allChartTypesLoadingStatus: 'loading' as Status,
  })),

  on(ChartTypeActions.loadSuccess, (state, payload) => ({
    ...state,
    allChartTypesLoadingStatus: 'success' as Status,
    allChartTypes: payload.chartTypes,
    allChartTypesForViewMode: payload.chartTypesForViewMode,
    originalAllChartTypesForViewMode: payload.chartTypesForViewMode,
  })),

  // filter view mode data
  on(ChartTypeActions.filterViewModeData, (state, { range }) => {
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
  on(ChartTypeActions.resetViewModeData, (state) => {
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
  on(ChartTypeActions.update, (state, payload) => ({
    ...state,
    status: 'loading' as Status,
    actionType: 'update' as ActionType,
  }))
);
