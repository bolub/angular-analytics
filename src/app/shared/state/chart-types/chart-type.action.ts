import { createAction, props } from '@ngrx/store';
import {
  ChartType,
  ChartTypeFull,
  GraphValue,
} from 'src/app/modules/settings/settings.model';
import { RangeType } from 'src/app/modules/view-mode/view-mode.model';

// create chart actions
export const createChartType = createAction(
  '[CHART_TYPE] Create ChartType',
  props<ChartType>()
);

export const createChartTypeSuccess = createAction(
  '[CHART_TYPE] Create ChartType Success',
  props<{ chartType: ChartType }>()
);

export const createChartTypeError = createAction(
  '[CHART_TYPE] Create ChartType Error',
  props<{ error: any }>()
);

// delete chart actions
export const deleteChartType = createAction(
  '[CHART_TYPE] Delete ChartType',
  props<{
    $id: string;
  }>()
);

// load chart actions
export const loadChartTypes = createAction('[CHART_TYPE] Load ChartTypes');

export const loadChartTypesSuccess = createAction(
  '[CHART_TYPE] Load ChartTypes Success',
  props<{ chartTypes: ChartTypeFull[] }>()
);

export const loadChartTypesFailure = createAction(
  '[CHART_TYPE] Load ChartTypes Failure',
  props<{ error: string }>()
);

export const loadGraphData = createAction(
  '[CHART_TYPE] Load GraphData',
  props<{ data: GraphValue[] }>()
);

// filter charts actions
export const filterCharts = createAction(
  '[CHART_TYPE] Filter ChartTypes',

  props<{ range: RangeType }>()
);

export const resetFilteredCharts = createAction(
  '[CHART_TYPE] Filter ChartTypes'
);
