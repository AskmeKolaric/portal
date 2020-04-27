import { AbstractFilter } from './abstract-filter';
import * as moment from 'moment';
import {SelectItem} from 'primeng/api';

export class CalendarFilter extends AbstractFilter {

  public constructor(
    public timezone = false
  ) {
    super();
  }

  public setFilterValue(filterValue: any): this {
    this.filterValue = filterValue;

    if (this.operatorValue === null && this.column && this.column.filter.operator && this.column.filter.operator.options) {
      this.setFirstNonEmptyOperatorValue();
    }

    return this;
  }

  public getValueFromChange(event, param) {
    if (param === 'clear') {
      return null;
    }
    if (param === 'today') {
      return new Date();
    }
    if (event.target !== undefined) {
      event = event.target.value;
    }

    if (event.length === 0) {
      return null;
    }

    event = new Date(event);
    return event;
  }

  public getFilterValue(param?: any): any {
    if (param) {
      return this.filterValue[param];
    }

    return this.filterValue;
  }

  public getFilterParsedValue(): any {
    if (this.column && typeof this.column.filter.parseValue === 'function') {
      return this.column.filter.parseValue(this.filterValue);
    }

    if (this.timezone === false) {
      if (this.filterValue.value && this.filterValue.value instanceof Date) {
        this.filterValue.value.setHours(0);
        this.filterValue.value.setMinutes(0);
        this.filterValue.value.setSeconds(0);
        this.filterValue.value = moment(this.filterValue.value).format('YYYY-MM-DDTHH:mm:ss');
      }

      if (this.filterValue.value2 && this.filterValue.value2 instanceof Date) {
        this.filterValue.value2.setHours(23);
        this.filterValue.value2.setMinutes(59);
        this.filterValue.value2.setSeconds(59);
        this.filterValue.value2 = moment(this.filterValue.value2).format('YYYY-MM-DDTHH:mm:ss');
      }
    }

    return this.filterValue;
  }

  private setFirstNonEmptyOperatorValue(): void {
    this.column.filter.operator.options.subscribe((options: SelectItem[] = []) => {
      if (options.length > 0 && options.find((aOption) => aOption.value !== null)) {
        this.setFilterOperatorValue(options.find((aOption) => aOption.value !== null).value);
      }
    });
  }
}
