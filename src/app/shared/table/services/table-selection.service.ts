import {ComponentFactoryResolver, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {TableComponent} from '../table.component';

@Injectable()
export class TableSelectionService {

  public lastSelectedOrUnselectedEntity: any = null;
  public isHeaderCheckboxChecked = false;
  public isHeaderCheckboxCheckedByUser = false;
  public selection: any[] = [];

  private table: TableComponent = null;

  private renderer: Renderer2;

  public constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public add(entity: object): this {
    const exists = this.isSelected(entity);

    this.lastSelectedOrUnselectedEntity = entity;

    if (!exists) {
      this.selection = [...this.selection, entity];
    }

    this.checkAllSelected();

    return this;
  }

  public remove(entity: object): this {
    const index = this.entityIndex(entity);

    this.lastSelectedOrUnselectedEntity = entity;

    this.isHeaderCheckboxCheckedByUser = false;

    if (index !== -1) {
      this.selection.splice(index, 1);
    }

    this.checkAllSelected();

    return this;
  }

  public onEntitiesChange(): this {

    if (this.isHeaderCheckboxCheckedByUser) {
      this.selectAll();
    } else {
      this.checkAllSelected();
    }

    return this;
  }

  public selectAll(): this {

    for (const entity of this.table.tableEntities) {
      this.add(entity);
    }

    return this;
  }

  public removeAll(): this {
    this.selection = [];
    this.isHeaderCheckboxChecked = false;
    this.isHeaderCheckboxCheckedByUser = false;

    const selectedDataTableTrNodes: NodeList = this.table.dataTable.el.nativeElement.querySelectorAll('tr.ui-state-highlight');

    for (let i = 0; i < selectedDataTableTrNodes.length; i++) {
      const tr = selectedDataTableTrNodes[i];
      this.renderer.removeClass(tr, 'ui-state-highlight');
    }

    return this;
  }

  public isSelected(entity): boolean {
    return this.entityIndex(entity) !== -1;
  }

  public setTable(table: TableComponent): this {
    this.table = table;
    return this;
  }

  public getTable(): TableComponent|null {
    return this.table;
  }

  protected entityIndex(entity): number {
    return this.selection.findIndex((aEntity) => entity.id === aEntity.id);
  }

  private checkAllSelected(): this {
    this.isHeaderCheckboxChecked = this.isHeaderCheckboxCheckedByUser;

    return this;
  }
}
