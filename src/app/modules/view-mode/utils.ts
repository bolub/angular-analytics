import { ChartTypeFull, GraphValue } from '../settings/settings.model';
import { RangeType } from './view-mode.model';

export function formatData(
  chartTypesList: ChartTypeFull[],
  graphValues: GraphValue[]
) {
  return chartTypesList.map((ctld) => {
    return {
      ...ctld,
      data: graphValues,
    };
  });
}

export function dateToString(date?: Date | null) {
  return date ? date.toISOString().slice(0, 10) : '';
}

export function filterByDateRange(graphValues: GraphValue[], range: RangeType) {
  const newGraphValues = graphValues.filter((gv) => {
    const itemDate = new Date(gv.date).toISOString().slice(0, 10);

    const startDate = dateToString(range?.start);
    const endDate = dateToString(range.end);

    return itemDate >= startDate && itemDate <= endDate;
  });

  return newGraphValues;
}
