export type SortDirection = "asc" | "desc";

export type TableState<T> = {
  page: number;
  pageSize: number;
  sortBy?: keyof T;
  sortDirection?: SortDirection;
  filters: Partial<Record<keyof T, string>>;
};
