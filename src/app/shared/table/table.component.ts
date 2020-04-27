import {
  Component,
  Input,
  Output,
  OnInit,
  OnDestroy,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
  Injector
} from '@angular/core';
import {TableColumn} from './shared/table-column';
import {TableColumnMenuButton} from './shared/table-column-menu';
import {TableSelectionService} from './services/table-selection.service';
import {TableFilterService} from './services/table-filter.service';
import {TableColumnsVisibility} from './shared/table-columns-visibility';
import {TableHeader} from './shared/table-header';
import {TableFooter} from './shared/table-footer';
import {TableButton} from './shared/table-button';
import {TableButtonClickHandler} from './shared/table-button-click-handler';
import {ToolbarItemDropdown} from './shared/toolbar/toolbar-item-dropdown';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {AbstractFilter} from './services/filter/abstract-filter';
import {ObjectUtils} from './overides/object-utils';
import {TableColumnService} from './services/table-column.service';
import {TableStateService} from './services/table-state.service';
import {Table} from 'primeng/table';

interface FilterChangeMeta {
  event: any;
  column: TableColumn;
  param: any;
  isOperatorEvent: any;
}

@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html',
  providers: [TableSelectionService, TableFilterService, TableColumnService]
})
export class TableComponent implements OnInit, OnDestroy {

  @ViewChild('dataTable', {static: true}) dataTable: Table;

  @Input() selectFirstEntityWhenNothingIsSelected = false;
  @Input() rows = 30;
  @Input() first = 0;
  @Input() sortField = '';
  @Input() sortOrder = 1;
  @Input() stateName = '';
  @Input() persistState = true;
  @Input() columnVisibilityDialog = false;
  @Input() totalCount = 0;
  @Input() isLoadingData = false;

  @Input() set filters(filters: {[filterKey: string]: AbstractFilter }) {
    if (this.filter.getTable() === null) {
      this.filter.setTable(this);
    }

    const state = this.tableState.getState(this);

    if (state.filters) {
      for (const filterKey in filters) {
        if (filters.hasOwnProperty(filterKey) && filters[filterKey] instanceof AbstractFilter) {
          delete state.filters[filterKey];
        }
      }
    }

    this.filter.addFilters(filters);
  }

  @Input() set columns(columns: TableColumn[]) {
    if (this.column.getTable() === null) {
      this.column.setTable(this);
    }

    this.originalColumns = columns;

    for (const column of this.originalColumns) {
      column.style = column.style || {};
      column.style.width = column.style.width || '200px';
    }

    this.tableColumns = this.getVisibleColumns();
  }

  @Input() set entities(entities: object[]) {
    this.tableEntities = entities;

    if (this.selection.getTable() === null) {
      this.selection.setTable(this);
    }

    this.selection.onEntitiesChange();

    this.selectFirstEntityIfPossible();
  }

  @Input() set stickyRows(stickyRows: object[]) {
    this.tableStickyRows = stickyRows;
  }

  @Input() set header(header: TableHeader) {
    this.tableHeader = header;
  }
  @Input() set footer(footer: TableFooter) {
    this.tableFooter = footer;
  }

  @Input() set summary(summary: any) {
    this.tableSummary = summary;
  }

  @Input() set height(height: number) {
    this.tableHeight = height;

    this.recalculateScrollHeight();
  }

  @Input() set width(width: number) {
    this.tableWidth = width;
  }

  @Output() cellEdit = new EventEmitter<any>();
  @Output() lazyLoad = new EventEmitter<any>();
  @Output() columnVisibilityChanged = new EventEmitter<TableColumnsVisibility>();

  public tableColumns: TableColumn[] = [];
  public tableEntities: any[] = [];
  public tableStickyRows: any[] = [];
  public tableHeader: TableHeader = null;
  public tableFooter: TableFooter = null;
  public tableSummary: any = null;

  public tableWidth: number;
  public tableHeight: number;

  public originalColumns: TableColumn[] = [];

  private filterChanged: Subject<FilterChangeMeta> = new Subject<FilterChangeMeta>();

  public constructor(
      public selection: TableSelectionService,
      public filter: TableFilterService,
      public column: TableColumnService,
      private elementRef: ElementRef,
      private tableState: TableStateService,
      private injector: Injector
  ) {

  }

  public ngOnInit(): void {
    this.selection.setTable(this);
    this.filter.setTable(this);
    this.column.setTable(this);

    this.tableState.initState(this);

    this.filterChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged())
      .subscribe(meta => {
        this.onFilterChanged(meta);
      });
  }

  public ngOnDestroy(): void {
    if (this.persistState) {
      this.tableState.saveState(this);
    }
  }

  @HostListener('window:keyup', ['$event'])
  public onKeyUp(event): void {
    const menuColumnsButtons = this.getMenuColumnsButtons();

    for (const menuColumnButton of menuColumnsButtons) {
      if (menuColumnButton.hotkey === event.code) {
        menuColumnButton.click(this.selection.lastSelectedOrUnselectedEntity);
      }
    }
  }

  public onLazyLoadEvent(tableEvent?: any): void {

    // until issue is resolved
    // https://github.com/primefaces/primeng/issues/7226
    this.dataTable.selectRange = (aEvent, rowIndex) => {
      let rangeStart = this.dataTable.anchorRowIndex - this.dataTable.first,
        rangeEnd = rowIndex - this.dataTable.first;

      if (rangeStart > rangeEnd) {
        rangeStart = rowIndex - this.dataTable.first;
        rangeEnd = this.dataTable.anchorRowIndex - this.dataTable.first;
      }

      this.selection.removeAll();

      for (let i = rangeStart; i <= rangeEnd; i++) {
        const rangeRowData = this.dataTable.filteredValue ? this.dataTable.filteredValue[i] : this.dataTable.value[i];
        this.dataTable._selection = [...this.dataTable.selection, rangeRowData];
        const dataKeyValue: string = this.dataTable.dataKey ?
            String(ObjectUtils.resolveFieldData(rangeRowData, this.dataTable.dataKey)) : null;

        if (dataKeyValue) {
          this.dataTable.selectionKeys[dataKeyValue] = 1;
        }

        this.selection.add(rangeRowData);
      }
    };

    const event = {
      filters: this.filter.getFilters(),
      sortField: this.dataTable.sortField,
      sortOrder: this.dataTable.sortOrder,
      rows: this.dataTable.rows,
      first: this.dataTable.first,
      page: (this.dataTable.first + this.dataTable.rows) / this.dataTable.rows
    };

    this.lazyLoad.emit(event);
  }

  public onFilterEvent(event: any, column: TableColumn, param?: any, isOperatorEvent?: any) {
    this.filterChanged.next({
      event,
      column,
      param,
      isOperatorEvent
    });
  }

  public getFilterValue(column: TableColumn, param?: any): any {
    return this.filter.getFilterValue(column, param);
  }

  public getFilterOperatorValue(column: TableColumn): any {
    return this.filter.getFilterOperatorValue(column);
  }

  public onFilterChanged(meta: FilterChangeMeta): void {
    const column: TableColumn = meta.column,
      filter = this.filter.getOrCreateFilter(column),
      filterKey = this.filter.getFilterKey(column);

    this.filter.addFilter(filterKey, filter);

    if (meta.isOperatorEvent) {
      const operatorValue = filter.getOperatorValueFromChange(meta.isOperatorEvent);

      filter.setFilterOperatorValue(operatorValue);
    } else {
      const value = filter.getValueFromChange(meta.event, meta.param);

      filter.setFilterValue(value);
    }

    if (filter.getFilterValue() === null && column.filter.allowNull !== true) {
      this.filter.removeFilter(filterKey);
    }

    this.selection.removeAll();

    // reset pagination
    this.dataTable.first = 0;

    if (column && typeof column.filter.beforeFilter === 'function') {
      column.filter.beforeFilter(filter);
    }

    this.onLazyLoadEvent();
  }

  public onFilterOperatorEvent(event: any, column: TableColumn, param?: any) {
    this.onFilterEvent(null, column, param, event);
  }

  public onCellEditEvent(event: any, column: TableColumn, entity: object) {
    if (column && typeof column.edit.parseValue === 'function') {
      column.edit.parseValue(entity, event);
    }

    this.cellEdit.emit({
      originalEvent: event,
      column,
      entity
    });
  }

  public onCellEntityChangeEvent(event: any, column: TableColumn, entity: object): void {
    if (event.code === 'Enter' ||
        (typeof event.code === 'undefined' && typeof event.event !== 'undefined' && event.event.code === 'Enter')
    ) {
      this.cellEdit.emit({
        originalEvent: event,
        column,
        entity
      });
    }
  }

  public onTableButtonClick(event, button: TableButton): void {
    const handler: TableButtonClickHandler = this.injector.get(button.click, null);

    if (handler === null) {
      button.click();
    } else {
      handler.table = this;
      handler.run();
    }
  }

  public onToolbarDropdownChange(event, dropdown: ToolbarItemDropdown): void {
    const handler: TableButtonClickHandler = this.injector.get(dropdown.change, null);

    if (handler === null) {
      dropdown.change();
    } else {
      handler.table = this;
      handler.event = event;
      handler.run();
    }
  }

  public onHeaderCheckboxChange(checked: boolean): void {
    this.selection.isHeaderCheckboxCheckedByUser = checked;
    this.selection.isHeaderCheckboxChecked = checked;

    if (checked) {
      this.selection.selectAll();
    } else {
      this.selection.removeAll();
    }
  }

  public isHeaderCheckboxChecked(): boolean {
    return this.selection.isHeaderCheckboxChecked;
  }

  public isRowCheckboxChecked(entity): boolean {
    return this.selection.isSelected(entity);
  }

  public onSelect(event: {originalEvent: any, data: typeof Object}): void {
    this.selection.add(event.data);
  }

  public onUnselect(event: {originalEvent: any, data: typeof Object}): void {

  }

  public getSelectedEntities(): any[] {
    return this.selection.selection;
  }

  public getHiddenColumns(): TableColumn[] {
    const columns = [];

    for (const column of this.getColumns()) {
      if (column.visible === false) {
        columns.push(column);
      }
    }

    return columns;
  }

  public getHiddenColumnsKeys(): TableColumn[] {
    const columns = this.getHiddenColumns(),
      keys = [];

    for (const column of columns) {
      keys.push(column.key);
    }

    return keys;
  }

  public getVisibleColumns(): TableColumn[] {
    const columns = [];

    for (const column of this.getColumns()) {
      if (column.visible !== false) {
        columns.push(column);
      }
    }

    return columns;
  }

  public getFilters(): {[filterKey: string]: AbstractFilter|any } {
    return this.filter.getFilters();
  }

  public getPagination(): {rows: number, first: number} {
    return {
      rows: this.dataTable.rows,
      first: this.dataTable.first
    };
  }

  public getOrder(): {sortField: string, sortOrder: number} {
    return {
      sortField: this.dataTable.sortField,
      sortOrder: this.dataTable.sortOrder
    };
  }

  public getColumns(): TableColumn[] {
    return this.column.getColumns();
  }

  public getColumn(key: string): TableColumn|null {
    const index = this.column.getColumns().findIndex((aColumn: TableColumn) => {
      return key === aColumn.key;
    });

    if (index !== -1) {
      return this.column.getColumns()[index];
    }

    return null;
  }

  public getLastSelectedOrUnselectedEntity(): any|null {
    return this.selection.lastSelectedOrUnselectedEntity;
  }

  public isColumnRendererDefined(column: TableColumn): boolean {
    return typeof column.renderer !== 'undefined';
  }

  public onColumnsSaved(): void {
    this.columnVisibilityDialog = false;

    this.columnVisibilityChanged.emit({visible: this.getVisibleColumns(), hidden: this.getHiddenColumns()});
  }

  public onColumnsSaveCanceled(): void {
    this.columnVisibilityDialog = false;
  }

  public onColumnsReset(): void {
    this.columnVisibilityDialog = false;
  }

  public isSummaryActive(): boolean {
    return this.tableSummary !== null && typeof this.tableSummary !== 'undefined';
  }

  public isStickyRowsActive(): boolean {
    return this.tableStickyRows !== null && typeof this.tableStickyRows !== 'undefined';
  }

  public getStickyColumnValue(rowNumber: number, column: any): string {
    return (this.tableStickyRows && this.tableStickyRows[rowNumber][column]) ? this.tableStickyRows[rowNumber][column] : '';
  }

  private recalculateScrollHeight(): void {
    const tableBody = this.elementRef.nativeElement.querySelector('.ui-table-scrollable-body');

    if (tableBody) {
      // header, filter, paginator
      // TODO :: calculate this
      let scrollHeight = this.tableHeight - 116;

      if (this.tableFooter !== null) {
        scrollHeight -= 38;
      }

      if (this.tableHeader !== null) {
        scrollHeight -= 38;
      }

      tableBody.style.maxHeight = `${scrollHeight}px`;
      tableBody.style.height = `${scrollHeight}px`;
    }
  }

  private selectFirstEntityIfPossible(): void {
    if (this.selectFirstEntityWhenNothingIsSelected && this.tableEntities.length > 0) {
      this.selection.add(this.tableEntities[0]);

      this.selection.lastSelectedOrUnselectedEntity = this.tableEntities[0];
    }
  }

  private getMenuColumnsButtons(): TableColumnMenuButton[] {
    const menuColumns = this.getColumns().filter((aTableColumn: TableColumn) => aTableColumn.menu),
      menuColumnsButtons = [];

    for (const menuColumn of menuColumns) {
      for (const menuColumnButton of menuColumn.menu.buttons) {
        menuColumnsButtons.push(menuColumnButton);
      }
    }

    return menuColumnsButtons;
  }
}
