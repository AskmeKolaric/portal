export interface TableState {
  selection?: any[];
  pagination?: {rows?: number, first?: number};
  filters?: any;
  order?: {sortField?: string, sortOrder?: number};
}
