import { createAction, props } from '@ngrx/store';
import {
  ChartType,
  ChartTypeFull,
  GraphValue,
} from 'src/app/modules/settings/settings.model';
import { RangeType } from 'src/app/modules/view-mode/view-mode.model';

// create actions
export const createChartType = createAction(
  '[Chart Type] Create',
  props<ChartType>()
);
export const createChartTypeSuccess = createAction(
  '[Chart Type] Create Success',
  props<{ chartType: ChartType }>()
);
export const createChartTypeError = createAction(
  '[Chart Type] Create Error',
  props<{ error: any }>()
);

export const deleteChartType = createAction(
  '[Chart Type] Delete',
  props<{ $id: string }>()
);

// loading actions
export const loadChartTypes = createAction('[Chart Type] Load');
export const loadChartTypesSuccess = createAction(
  '[Chart Type] Load Success',
  props<{ chartTypes: ChartTypeFull[] }>()
);
export const loadChartTypesFailure = createAction(
  '[Chart Type] Load Failure',
  props<{ error: string }>()
);

export const loadGraphData = createAction(
  '[Chart Type] Load Graph Data',
  props<{ data: GraphValue[] }>()
);

export const filterChartTypes = createAction(
  '[Chart Type] Filter Chart Types',
  props<{ range: RangeType }>()
);
export const resetFilteredChartTypes = createAction(
  '[Chart Type] Reset Filter'
);
