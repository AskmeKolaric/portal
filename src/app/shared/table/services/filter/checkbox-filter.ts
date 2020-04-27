import { AbstractFilter } from './abstract-filter';

export class CheckboxFilter extends AbstractFilter {

    public getValueFromChange(event, param) {
        return event;
    }
}
