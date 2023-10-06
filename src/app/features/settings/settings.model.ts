export type ChartType = {
  title: string;
  selectedType: 'bar' | 'pie' | 'line' | 'spline' | 'area';
  color: string;
};

export type ChartTypeFull = {
  $id: string;
  $createdAt: Date;
} & ChartType;

export type GraphValue = {
  label: string;
  value: number;
  date: Date;
};
