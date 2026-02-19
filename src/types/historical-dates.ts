export interface Event {
  id: number;
  year: number;
  description: string;
}

export interface HistoricalBlock {
  id: number;
  title: string;
  firstYear: number;
  secondYear: number;
  events: Event[];
}
