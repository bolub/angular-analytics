import { ChartTypeFull, GraphValue } from '../settings/settings.model';

export type ViewMode = {
  data: GraphValue[];
} & ChartTypeFull;
