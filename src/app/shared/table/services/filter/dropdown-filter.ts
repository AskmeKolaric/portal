import { AbstractFilter } from './abstract-filter';

export class DropdownFilter extends AbstractFilter {

    public getValueFromChange(event, param) {
        return event;
    }
}
