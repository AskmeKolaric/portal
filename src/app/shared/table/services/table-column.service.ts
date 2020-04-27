import {Injectable} from '@angular/core';
import {TableComponent} from '../table.component';
import {TableColumn} from '../shared/table-column';
import {LocalStorageService} from '../../../core/services/local-storage.service';
import {AuthenticationService} from '../../../core/services/authentication.service';

class TableColumnState {
  key: string;
  visible: boolean;
}

@Injectable()
export class TableColumnService {

  protected table: TableComponent = null;

  public constructor(
    private localStorage: LocalStorageService,
    private authentication: AuthenticationService
  ) {

  }

  public saveState(columns: TableColumn[] = []): this {

    if (this.table.stateName) {
      const storageColumns: TableColumnState[] = [];

      for (const column of columns) {
        storageColumns.push({
          key: column.key,
          visible: column.visible !== false
        });
      }

      const uniqueKey = this.getUniqueKey();

      this.localStorage.setItem(
        uniqueKey,
        storageColumns
      );
    } else {
      console.error(`Table ${this.table} has no stateName defined in order to save columns properly!`);
    }

    return this;
  }

  public hasState(): boolean {
    return this.table.stateName && this.localStorage.itemExists(this.getUniqueKey());
  }

  public getState(): TableColumnState[] {
    return this.localStorage.getItem(this.getUniqueKey()) || [];
  }

  public removeState(): void {
    if (this.hasState()) {
      this.localStorage.removeItem(this.getUniqueKey());
    }
  }

  public getColumns(): TableColumn[] {
    if (this.hasState()) {
      const columns = [],
        originalColumns = [...this.table.originalColumns];

      for (const stateColumn of this.getState()) {
        if (this.isStateColumnDefinedInOriginal(stateColumn)) {
          const column: TableColumn = {...this.getStateOriginalColumn(stateColumn)};

          column.visible = stateColumn.visible;

          columns.push(column);
        }
      }

      // fix for added columns
      if (this.getState().length < originalColumns.length) {
        for (const column of originalColumns) {
          if (!this.isOriginalColumnDefinedInState(column)) {
            const indexOfAddedColumn = originalColumns.findIndex((aColumn: TableColumn) => {
              return aColumn.key === column.key;
            });

            columns.splice( indexOfAddedColumn, 0, column );
          }
        }
      }

      return columns;
    }

    return this.table.originalColumns;
  }

  public setTable(table: TableComponent): this {
    this.table = table;
    return this;
  }

  public getTable(): TableComponent {
    return this.table;
  }

  private getUniqueKey(): string {
    return this.authentication.getUser().getId() + this.table.stateName;
  }

  private isOriginalColumnDefinedInState(column: TableColumn): boolean {
    if (this.hasState()) {
      const stateColumns = this.getState();

      for (const stateColumn of stateColumns) {
        if (stateColumn.key === column.key) {
          return true;
        }
      }
    }

    return false;
  }

  private isStateColumnDefinedInOriginal(stateColumn: TableColumnState): boolean {
    for (const column of this.table.originalColumns) {
      if (column.key === stateColumn.key) {
        return true;
      }
    }

    return false;
  }

  private getStateOriginalColumn(stateColumn: TableColumnState): TableColumn {
    for (const column of this.table.originalColumns) {
      if (column.key === stateColumn.key) {
        return column;
      }
    }

    return null;
  }
}
