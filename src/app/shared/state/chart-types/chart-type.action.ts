import { createAction, props } from '@ngrx/store';
import {
  ChartType,
  ChartTypeFull,
} from 'src/app/modules/settings/settings.model';

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

export const deleteChartType = createAction(
  '[CHART_TYPE] Delete ChartType',
  props<{
    $id: string;
  }>()
);

export const loadChartTypes = createAction('[CHART_TYPE] Load ChartTypes');

export const loadChartTypesSuccess = createAction(
  '[CHART_TYPE] Load ChartTypes Success',
  props<{ chartTypes: ChartTypeFull[] }>()
);

export const loadChartTypesFailure = createAction(
  '[CHART_TYPE] Load ChartTypes Failure',
  props<{ error: string }>()
);
