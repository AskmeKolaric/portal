import {TableComponent} from '../table.component';

export interface TableButtonClickHandler {
  run: () => void;
  table: TableComponent;
  event: any;
}
