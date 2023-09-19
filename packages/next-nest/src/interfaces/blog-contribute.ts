export type Level = 0 | 1 | 2 | 3 | 4;

export interface Contribution {
  date: string;
  count: number;
  level: Level;
}

export interface Response {
  total: {
    [year: number]: number;
    [year: string]: number; // 'lastYear'
  };
  contributions: Array<Contribution>;
}

export interface NestedResponse {
  total: {
    [year: number]: number;
    [year: string]: number; // 'lastYear;
  };
  contributions: {
    [year: number]: {
      [month: number]: {
        [day: number]: Contribution;
      };
    };
  };
}