export interface Body {
  agent: string;
  metrics: Metric[];
}

export interface Metric {
  name: string;
  namespace: string;
  data_point: DataPoint;
}

export interface DataPoint {
  value: number;
}
