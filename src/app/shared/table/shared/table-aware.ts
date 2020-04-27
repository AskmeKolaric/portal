import { TableColumn } from './table-column';

export interface TableAware {
  columns: TableColumn[];
  entityType: object;
}
