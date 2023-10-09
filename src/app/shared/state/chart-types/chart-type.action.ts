import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  ChartType,
  ChartTypeFull,
} from 'src/app/features/settings/settings.model';
import {
  RangeType,
  ViewMode,
} from 'src/app/features/view-mode/view-mode.model';

export const ChartTypeActions = createActionGroup({
  source: 'Chart Type',
  events: {
    Create: props<ChartType>(),
    'Create Success': props<{ chartType: ChartType }>(),
    'Create Error': props<{ error: any }>(),

    Delete: props<{ $id: string }>(),
    'Delete Success': props<{ chartType: ChartType }>(),
    'Delete Error': props<{ error: any }>(),

    Load: emptyProps(),
    'Load Success': props<{
      chartTypes: ChartTypeFull[];
      chartTypesForViewMode: ViewMode[];
    }>(),
    'Load Failure': props<{ error: string }>(),

    'Filter View Mode Data': props<{ range: RangeType }>(),
    'Reset View Mode Data': emptyProps(),

    'Set Current Chart Type': props<{ data: ChartTypeFull }>(),

    Update: props<{ $id: string; data: Partial<ChartType> }>(),
    'Update Success': props<{ chartType: ChartType }>(),
    'Update Error': props<{ error: any }>(),
  },
});
