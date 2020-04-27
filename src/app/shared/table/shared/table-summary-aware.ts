import {TableSummary} from './table-summary';

export interface TableSummaryAware {
  getSummary(): TableSummary;
}
