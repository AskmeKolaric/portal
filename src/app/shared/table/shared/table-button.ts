import {TableButtonClickHandler} from './table-button-click-handler';

export interface TableButton {
  click: any|TableButtonClickHandler;
  icon?: string;
  class?: string;
  hotkey?: string;
  tooltip?: string;
  seleniumId?: string;
  disabled?: () => void;
  visible?: () => void;
}
