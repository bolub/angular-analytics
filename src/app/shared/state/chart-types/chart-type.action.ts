import { createAction, props } from '@ngrx/store';
import { ChartType } from 'src/app/core/services/mock.service';

export type NewChartType = {
  title: ChartType['title'];
  color: ChartType['color'];
  selectedType: ChartType['type'];
};

export const createChartType = createAction(
  '[CHART_TYPE] Create ChartType',
  props<NewChartType>()
);

export const createChartTypeSuccess = createAction(
  '[CHART_TYPE] Create ChartType Success',
  props<{ chartType: NewChartType }>()
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
  props<{ chartTypes: NewChartType[] }>()
);

export const loadChartTypesFailure = createAction(
  '[CHART_TYPE] Load ChartTypes Failure',
  props<{ error: string }>()
);
