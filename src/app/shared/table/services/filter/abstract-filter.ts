import {TableColumn} from '../../shared/table-column';

export abstract class AbstractFilter {

    public column: TableColumn = null;

    protected operatorValue: string = null;
    protected filterValue: any = null;

    public abstract getValueFromChange(event, param): any;

    public getOperatorValueFromChange(event): any {
      return event.value;
    }

    public getFilterValue(param?: any): any {
      return this.filterValue;
    }

    public getFilterParsedValue(): any {
      if (this.column && typeof this.column.filter.parseValue === 'function') {
        return this.column.filter.parseValue(this.filterValue);
      }

      return  this.filterValue;
    }

    public getFilterParsedOperator(): any {
      if (this.column && typeof this.column.filter.parseOperator === 'function') {
        return this.column.filter.parseOperator(this.filterValue);
      }

      return  this.operatorValue;
    }

    public setFilterValue(filterValue: any): this {
      this.filterValue = filterValue;
      return this;
    }

    public setFilterOperatorValue(operatorValue: string): this {
      this.operatorValue = operatorValue;
      return this;
    }

    public getFilterOperatorValue(): string {
        return this.operatorValue;
    }
}
