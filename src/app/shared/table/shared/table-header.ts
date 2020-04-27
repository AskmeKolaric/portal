import {TableButton} from './table-button';
import {ToolbarItemDropdown} from './toolbar/toolbar-item-dropdown';

export interface TableHeader {
  buttons?: TableButton[];
  dropdowns?: ToolbarItemDropdown[];
}
