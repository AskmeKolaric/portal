import {TableButtonClickHandler} from '../table-button-click-handler';

export interface ToolbarItemDropdownItem {
  label: string;
  value: any;
}

export interface ToolbarItemDropdown {
  change?: any|TableButtonClickHandler;
  class?: string;
  hotkey?: string;
  tooltip?: string;
  disabled?: () => void;
  condition?: () => void;
  options?: ToolbarItemDropdownItem[];
}
