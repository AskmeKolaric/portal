import {Directive, Self, HostListener, ElementRef, Input} from '@angular/core';
import {Table} from 'primeng/table';
import {TableComponent} from '../table.component';

const TABLE_CLASS = '.ui-table-scrollable-view';

@Directive({
  selector: '[appTableClickHandler]'
})
export class TableClickHandlerDirective {

  private readonly table: Table = null;

  private traversalClassWhitelist: string[] = [
    'ui-dropdown-items',
    'ui-datepicker-calendar',
    'ui-datepicker-buttonbar',
    'ui-button',
    'ui-dialog',
    'specify-client',
    'ng-star-inserted' // edit dropdown option in table cell
  ];

  private traversalClassBlacklist: string[] = [
    'ui-paginator-page'
  ];

  @Input() component: TableComponent = null;
  @HostListener('window:click', ['$event']) onClick(event) {
    if (!event.shiftKey) {
      this.onWindowClick(event);
    }
  }

  public constructor(@Self() table: Table) {
    this.table = table;

    if (!(this.table instanceof Table)) {
      console.error('Table works only with p-table component!');
    }
  }

  public onWindowClick(event): void {
    const elementRef: ElementRef = this.table.el;

    let target = event.target;
    let inside = false;
    do {
      if (this.isInBlackList(target)) {
        inside = false;
        break;
      }

      if (target === elementRef.nativeElement || this.isInWhiteList(target)) {
        inside = true;
      }
      target = target.parentNode;
    } while (target);

    if (!inside && event.target.closest(TABLE_CLASS)) {
      inside = true;
    }

    if (!inside) {
      // xcentric, do we want this or not?
      // this.component.selection.removeAll();
    }
  }

  private isInBlackList(target: any): boolean {
    const isTokenList = target.classList && target.classList instanceof DOMTokenList;

    let isInWhiteList = false;

    for (const whiteList of this.traversalClassBlacklist) {
      if (isTokenList && target.classList.contains(whiteList)) {
        isInWhiteList = true;
        break;
      }
    }

    return isInWhiteList;
  }

  private isInWhiteList(target: any): boolean {
    const isTokenList = target.classList && target.classList instanceof DOMTokenList;

    let isInBlackList = false;

    for (const blackList of this.traversalClassWhitelist) {
      if (isTokenList && target.classList.contains(blackList)) {
        isInBlackList = true;
        break;
      }
    }

    return isInBlackList;
  }
}
