import {AbstractFilter} from './abstract-filter';
import {SelectItem} from 'primeng/api';

export class NumberFilter extends AbstractFilter {

  public getValueFromChange(event, param) {
      return event.value;
  }

  public setFilterValue(filterValue: any): this {
    this.filterValue = filterValue;

    if (this.operatorValue === null && this.column.filter.operator && this.column.filter.operator.options) {
      this.setFirstNonEmptyOperatorValue();
    }

    return this;
  }

  public setFilterOperatorValue(operatorValue: string): this {
    this.operatorValue = operatorValue;

    if (this.operatorValue === null) {
      this.filterValue = null;
    }

    return this;
  }

  private setFirstNonEmptyOperatorValue(): void {
    this.column.filter.operator.options.subscribe((options: SelectItem[] = []) => {
      if (options.length > 0 && options.find((aOption) => aOption.value !== null)) {
        this.setFilterOperatorValue(options.find((aOption) => aOption.value !== null).value);
      }
    });
  }
}
