export interface Params {
  agent: string;
  metorics: Metic[];
}

export interface Metic {
  name: string;
  namespace: string;
  value: number;
}

