import { SelectItem } from 'primeng/primeng';
import {Observable} from 'rxjs/internal/Observable';

export interface TableColumnInlineEdit {
    type?: 'checkbox' | 'dropdown' | 'calendar' | 'number' | 'autocomplete' | 'multiselect';
    options?: Observable<SelectItem[]>;
    step?: number| string;
    decimalSeparator?: string;
    autocompleteHandler?: any;
    fieldName?: string;
    max?: number;
    min?: number;
    parseValue?: (entity, event) => void;
}
