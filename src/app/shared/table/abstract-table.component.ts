import {EntityManagerService} from 'xcentric';
import {Paginated} from './shared/paginated';
import {ChangeDetectorRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TableComponent} from './table.component';
import {TableColumn} from './shared/table-column';
import {TableHeader} from './shared/table-header';
import {Observable, Subject} from 'rxjs';
import {AppComponent} from '../../app.component';
import {AbstractFilter} from './services/filter/abstract-filter';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {HttpResponse} from '@angular/common/http';

export abstract class AbstractTableComponent implements OnInit, OnDestroy {

    public entities: any[] = [];
    public totalCount = 0;
    public columns: TableColumn[] = [];
    public header: TableHeader;
    public isLoadingData = false;
    public unsubscribe$ = new Subject<void>();

    private windowSizeChanged: Subject<void> = new Subject<void>();

    @ViewChild('table', {static: true}) public table: TableComponent;
    @HostListener('window:resize')
    public onResize() {
        this.recalculateTableHeight();
    }

    protected abstract getEntityType(): any;

    protected constructor(
        protected entityManager: EntityManagerService,
        protected appComponent: AppComponent,
        protected cd: ChangeDetectorRef,
        protected message: MessageService,
        protected translate: TranslateService
    ) {

    }

    public ngOnInit(): void {
        this.windowSizeChanged
            .pipe(
                debounceTime(20),
                takeUntil(this.unsubscribe$))
            .subscribe(meta => {
                this.table.height = window.innerHeight - 90;
            });
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public onLoad(event): void {
        this.isLoadingData = true;
        this.cd.detectChanges();
        this.loadWithParams(this.buildParams())
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((pagination: Paginated) => {
                this.entities = pagination.data;
                this.totalCount = pagination.total;
                this.recalculateTableHeight();
                this.isLoadingData = false;
            });
    }

    public recalculateTableHeight(): void {
        this.windowSizeChanged.next();
    }

    public loadWithParams(params): Observable<Paginated> {
        return this.entityManager.getRepository(this.getEntityType()).findMore(params);
    }

    protected buildParams(): any {
        const params = {},
            order = this.table.getOrder();

        if (order && order.sortField) {
            params[`order[${order.sortField}]`] = `${order.sortOrder === 1 ? 'ASC' : 'DESC'}`;
        }

        const filters = this.table.getFilters();

        for (const filter in filters) {
            if (filters.hasOwnProperty(filter)) {
                const aFilter: AbstractFilter = filters[filter];

                params[filter] = aFilter.getFilterValue();
            }
        }

        return params;
    }
}
