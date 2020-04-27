import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {TableComponent} from '../table.component';
import {TableColumn} from '../shared/table-column';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-table-column-reorder',
  templateUrl: './table-column-reorder.component.html'
})
export class TableColumnReorderComponent implements OnInit {

  @Output() public columnsSaved = new EventEmitter<void>();
  @Output() public columnsSaveCanceled = new EventEmitter<void>();
  @Output() public columnsReset = new EventEmitter<void>();
  @Input() public tableComponent: TableComponent = null;

  public visibleColumns: TableColumn[] = [];
  public hiddenColumns: TableColumn[] = [];

  public constructor(
    private translateService: TranslateService
  ) {

  }

  public ngOnInit(): void {
    const columns = [...this.tableComponent.getColumns()];

    for (const originalColumn of columns) {
      if (originalColumn.visible === false) {
        this.hiddenColumns.push(originalColumn);
      } else {
        this.visibleColumns.push(originalColumn);
      }
    }
  }

  public getColumnHeader(column: TableColumn): string {
    if (!column.header) {
      return column.key;
    }

    return this.translateService.instant(column.header);
  }

  public onSave(): void {
    const columns = [];

    for (const column of this.visibleColumns) {
      column.visible = true;
      columns.push(column);
    }

    for (const column of this.hiddenColumns) {
      column.visible = false;
      columns.push(column);
    }

    this.tableComponent.column.saveState(columns);
    this.tableComponent.tableColumns = this.tableComponent.getVisibleColumns();

    this.columnsSaved.emit();
  }

  public onCancel(): void {
    this.columnsSaveCanceled.emit();
  }

  public onReset(): void {
    this.tableComponent.column.removeState();
    this.tableComponent.tableColumns = this.tableComponent.getVisibleColumns();

    this.columnsReset.emit();
  }
}
