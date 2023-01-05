export interface Params {
  agent: string;
  metorics: Metoric[];
}

export interface Metoric {
  name: string;
  namespace: string;
  value: number;
}

