import { createAction, props } from '@ngrx/store';
import {
  ChartType,
  ChartTypeFull,
  GraphValue,
} from 'src/app/features/settings/settings.model';
import {
  RangeType,
  ViewMode,
} from 'src/app/features/view-mode/view-mode.model';

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

// delete actions
export const deleteChartType = createAction(
  '[Chart Type] Delete',
  props<{ $id: string }>()
);

export const deleteChartTypeSuccess = createAction(
  '[Chart Type] Delete Success',
  props<{ chartType: ChartType }>()
);
export const deleteChartTypeError = createAction(
  '[Chart Type] Delete Error',
  props<{ error: any }>()
);

// loading actions
export const loadChartTypes = createAction('[Chart Type] Load');
export const loadChartTypesSuccess = createAction(
  '[Chart Type] Load Success',
  props<{ chartTypes: ChartTypeFull[]; chartTypesForViewMode: ViewMode[] }>()
);
export const loadChartTypesFailure = createAction(
  '[Chart Type] Load Failure',
  props<{ error: string }>()
);

export const loadGraphData = createAction(
  '[Chart Type] Load Graph Data',
  props<{ data: GraphValue[] }>()
);

// filter actions
export const filterViewModeData = createAction(
  '[Chart Type] Filter View Mode Data',
  props<{ range: RangeType }>()
);
export const resetViewModeData = createAction(
  '[Chart Type] Reset View Mode Data'
);

// update chart type
export const setCurrentChartType = createAction(
  '[Chart Type] Set Current Chart Type',
  props<{
    data: ChartTypeFull;
  }>()
);

export const updateChartType = createAction(
  '[Chart Type] Update',
  props<{ $id: string; data: Partial<ChartType> }>()
);

export const updateChartTypeSuccess = createAction(
  '[Chart Type] Update Success',
  props<{ chartType: ChartType }>()
);
export const updateChartTypeError = createAction(
  '[Chart Type] Update Error',
  props<{ error: any }>()
);
