import { AbstractFilter } from './abstract-filter';

export class TextFilter extends AbstractFilter {

    public getValueFromChange(event, param) {
        if (event.target.value.length === 0) {
          return null;
        }

        return event.target.value;
    }

}
