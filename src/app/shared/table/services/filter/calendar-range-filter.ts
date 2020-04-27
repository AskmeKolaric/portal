import { AbstractFilter } from './abstract-filter';

export class CalendarRangeFilter extends AbstractFilter {

    protected operatorValue = 'between';

    public getValueFromChange(event, param) {
        const dateFrom = event.value.from,
          dateTo = event.value.to;

        // using == to test for both null and undefined
        if (dateFrom == null && dateTo != null) {
          return {
            'from': null,
            'to': dateTo
          };
        }

        if (dateFrom == null || dateTo == null) {
          return null;
        }

        return {
          'from': dateFrom,
          'to': dateTo
        };
    }

    public getFilterOperatorValue(): string {
      return 'between';
    }

    public getFilterValue(param?: any): any {
      if (param) {
        return this.filterValue[param];
      }

      return this.filterValue;
    }
}
