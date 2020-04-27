export interface TableSummaryQueryWhere {
  column: string;
  comparator: string;
  value: string|number|boolean;
}

export interface TableSummaryColumn {
  key: string;
  name?: string;
  query?: {
    column: string;
    function: 'sum'|'average'|'custom';
    where?: TableSummaryQueryWhere[]
  };
  tooltip?: string;
  parseValue?: () => void;
}

export interface TableSummary {
  route: string;
  columns: TableSummaryColumn[];
}
