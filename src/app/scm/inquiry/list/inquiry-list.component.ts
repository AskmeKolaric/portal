import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TableColumn} from '../../../shared/table/shared/table-column';
import {TableHeader} from '../../../shared/table/shared/table-header';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTableComponent} from '../../../shared/table/abstract-table.component';
import {EntityManagerService} from 'xcentric';
import {AppComponent} from '../../../app.component';
import {MessageService} from 'primeng/api';
import {Router} from "@angular/router";
import {Inquiry} from "../../../core/entities/inquiry";
import {getInquirer} from "@angular/core/schematics/utils/schematics_prompt";
import {AppNavigationMenuService} from '../../../main/navigationMenu/app.navigation-menu.service';

@Component({
    selector: 'app-scm-inquiry-list',
    templateUrl: './inquiry-list.component.html',
    styleUrls: ['./inquiry-list.component.scss']
})
export class InquiryListComponent extends AbstractTableComponent implements OnInit {
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
        protected router: Router,
        private appNavigationService: AppNavigationMenuService
    ) {
        super(entityManager, appComponent, cd, message, translate);
        this.appNavigationService.setItems([
                {label: 'Anfragen', routerLink: ['/scm/inquiries']}
            ]);
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.columns = this.getColumns();
        // this.header = this.getHeader();
    }

    protected getEntityType(): any {
        return Inquiry;
    }

    protected getColumns(): TableColumn[] {
        return [
            {
                key: 'name',
                header: this.translate.instant('SCM.INQUIRY.NAME'),
                renderer: (inquiry: Inquiry) => {
                    return inquiry.getName();
                }
            },
            {
                key: 'inquiryNumber',
                header: this.translate.instant('SCM.INQUIRY.INQUIRYNUMBER'),
                renderer: (inquiry: Inquiry) => {
                    return inquiry.getInquiryNumber();
                }
            },
            {
                key: 'menu',
                header: '',
                menu: {
                    buttons: [
                        {click: this.onDetails.bind(this), icon: 'fa fa-fw fa-edit', tooltip: 'Details anzeigen'}
                    ]
                }
            }
        ];
    }

    public onDetails(inquiry: Inquiry) {
        this.router.navigate([`scm/inquiries/${inquiry.getId()}`]);
    }
}
