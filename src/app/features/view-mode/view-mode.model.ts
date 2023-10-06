import { ChartTypeFull, GraphValue } from '../settings/settings.model';

export type ViewMode = {
  data: GraphValue[];
} & ChartTypeFull;

export type RangeType = { start?: Date | null; end?: Date | null };
