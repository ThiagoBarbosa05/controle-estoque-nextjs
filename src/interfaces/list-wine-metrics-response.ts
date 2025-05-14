export type WineMetrics = {
  wineId: string;
  wineName: string;
  lastUpdated: string | Date;
  customerName: string;
  totalBalance: number;
};

export interface ListWineMetricsResponse {
  items: WineMetrics[];
  page: number;
  pageSize: number;
  total: number;
}
