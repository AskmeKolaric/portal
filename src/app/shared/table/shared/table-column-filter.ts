import { SelectItem } from 'primeng/primeng';
import {Observable} from 'rxjs/internal/Observable';
import {AbstractFilter} from '../services/filter/abstract-filter';

export interface TableColumnFilterOperator {
  options: Observable<SelectItem[]>;
}

export interface TableColumnFilter {
  key?: string;
  type?: string;
  step?: number;
  operator?: TableColumnFilterOperator;
  parseValue?: (value) => void;
  parseOperator?: (value) => void;
  beforeFilter?: (filter: AbstractFilter) => void;
  options?: Observable<SelectItem[]>;
  next?: string;
  allowNull?: boolean;
  allowUntilOnly?: boolean;
}
