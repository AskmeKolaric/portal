import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Invoice } from '../../../core/entities/invoice';
import {TableColumn} from '../../../shared/table/shared/table-column';
import {TableHeader} from '../../../shared/table/shared/table-header';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTableComponent} from '../../../shared/table/abstract-table.component';
import {EntityManagerService} from 'xcentric';
import {AppComponent} from '../../../app.component';
import {MessageService} from 'primeng/api';
import {AppNavigationMenuService} from '../../../main/navigationMenu/app.navigation-menu.service';

@Component({
    selector: 'app-scm-invoice-list',
    templateUrl: './invoice-list.component.html',
    styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent extends AbstractTableComponent implements OnInit {
    public entities: any[] = [];
    public totalCount = 0;
    public columns: TableColumn[] = [];
    public header: TableHeader;
    public isLoadingData = false;

    public constructor(
        protected entityManager: EntityManagerService,
        protected appComponent: AppComponent,
        protected cd: ChangeDetectorRef,
        protected message: MessageService,
        protected translate: TranslateService,
        private appNavigationService: AppNavigationMenuService
    ) {
        super(entityManager, appComponent, cd, message, translate);
        this.appNavigationService.setItems([
            { label: 'Rechnungen', routerLink: ['/scm/invoices']}
        ]);
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.columns = this.getColumns();
        // this.header = this.getHeader();
    }

    protected getEntityType(): any {
        return Invoice;
    }

    protected getColumns(): TableColumn[] {
        return [
            {
                key: 'name',
                header: this.translate.instant('SCM.INVOICE.NAME'),
                renderer: (invoice: Invoice) => {
                    return invoice.getName();
                }
            },
            {
                key: 'name2',
                header: this.translate.instant('SCM.INVOICE.PERIOD'),
                renderer: (invoice: Invoice) => {
                    return invoice.getInvoicePeriod();
                }
            },
            {
                key: 'city',
                header: this.translate.instant('SCM.INVOICE.NUMBER'),
                renderer: (invoice: Invoice) => {
                    return invoice.getInvoiceNumber();
                }
            },
            {
                key: 'invoice_amount',
                header: this.translate.instant('SCM.INVOICE.AMOUNT'),
                renderer: (invoice: Invoice) => {
                    return invoice.getInvoiceAmount().toString().replace('.', ',');
                }
            },
            {
                key: 'phoneNumber',
                header: this.translate.instant('SCM.INVOICE.TAX_AMOUNT'),
                renderer: (invoice: Invoice) => {
                    return invoice.getTaxAmount().toString().replace('.', ',');
                }
            },
            {
                key: 'pib',
                header: this.translate.instant('SCM.INVOICE.TOTAL'),
                renderer: (invoice: Invoice) => {
                    return invoice.getInvoiceTotal().toString().replace('.', ',');
                }
            },
            {
                key: 'bankAccount',
                header: this.translate.instant('SCM.INVOICE.NOTE'),
                renderer: (invoice: Invoice) => {
                    return invoice.getNote();
                }
            }
        ];
    }

}
