export interface ErrorLogFilter {
  ids: number[];
  excludeIds: number[];
  status: string;
  endpoint: string;
}
