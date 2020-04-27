import {Injectable} from '@angular/core';
import {TableColumn} from '../shared/table-column';
import {AbstractFilter} from './filter/abstract-filter';
import {CalendarFilter} from './filter/calendar-filter';
import {TextFilter} from './filter/text-filter';
import {CheckboxFilter} from './filter/checkbox-filter';
import {NumberFilter} from './filter/number-filter';
import {DropdownFilter} from './filter/dropdown-filter';
import {CalendarRangeFilter} from './filter/calendar-range-filter';
import {TableComponent} from '../table.component';

@Injectable()
export class TableFilterService {

    public filters: {[filterKey: string]: AbstractFilter } = {};

    protected table: TableComponent = null;

    public constructor() {
      this.defineToKeyValue();
    }

    public getFilterOperatorValue(column: TableColumn): any {
      const filter = this.filters[this.getFilterKey(column)];

      return filter ? filter.getFilterOperatorValue() : null;
    }

    public getFilterValue(column: TableColumn, param?: any): any {
      const filter = this.filters[this.getFilterKey(column)];

      return filter ? filter.getFilterValue(param) : null;
    }

    public getOrCreateFilter(column: TableColumn): AbstractFilter {
      const filter = this.filters[this.getFilterKey(column)];

      return filter ? filter : this.getFilter(column);
    }

    public getFilter(column: TableColumn): AbstractFilter {
        let filter = null;

        switch (column.filter.type) {
            case 'calendar':
                filter = new CalendarFilter();
                break;
            case 'calendar-range':
                filter = new CalendarRangeFilter();
                break;
            case 'checkbox':
                filter = new CheckboxFilter();
                break;
            case 'number':
                filter = new NumberFilter();
                break;
            case 'dropdown':
                filter = new DropdownFilter();
                break;
            default:
                filter = new TextFilter();
        }

        filter.column = column;

        return filter;
    }

    public addFilter(filterKey: string, filter: AbstractFilter): this {
      this.filters[filterKey] = filter;

      return this;
    }

    public removeFilter(filterKey: string): this {
      delete this.filters[filterKey];

      return this;
    }

    public addFilters(filters: {[filterKey: string]: AbstractFilter}): this {

      for (const filterKey in filters) {
        if (filters.hasOwnProperty(filterKey) && filters[filterKey] instanceof AbstractFilter) {
          const filter: AbstractFilter = filters[filterKey];

          this.addFilter(filterKey, filter);
        }
      }

      return this;
    }

    public getFilters(): {[filterKey: string]: AbstractFilter|any } {
      return this.filters;
    }

    public setTable(table: TableComponent): this {
        this.table = table;
        return this;
    }

    public getTable(): TableComponent {
        return this.table;
    }

    public getFilterKey(column: TableColumn): string {
      let filterKey = column.key;

      if (column.filter && column.filter.key) {
        filterKey = column.filter.key;
      }

      return filterKey;
    }

    private defineToKeyValue(): void {
      Object.defineProperty(this.filters, 'toKeyValue', {
        value: function() {
          const filterParams = {};

          for (const filterKey in this) {
            if (this.hasOwnProperty(filterKey)) {
              const filter: AbstractFilter = this[filterKey];

              let filterValue = filter.getFilterParsedValue();

              if (filter.getFilterParsedOperator() !== null) {
                filterValue = {
                  operator: filter.getFilterParsedOperator(),
                  value: filter.getFilterParsedValue()
                };
              }

              filterParams[filterKey] = filterValue;
            }
          }
          return filterParams;
        },
        enumerable: false
      });
    }
}
