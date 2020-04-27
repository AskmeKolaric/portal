import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TableColumn} from '../../../shared/table/shared/table-column';
import {TableHeader} from '../../../shared/table/shared/table-header';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTableComponent} from '../../../shared/table/abstract-table.component';
import {EntityManagerService} from 'xcentric';
import {AppComponent} from '../../../app.component';
import {MessageService} from 'primeng/api';
import {Employee} from '../../../core/entities/employee';
import {Router} from '@angular/router';
import {AppNavigationMenuService} from '../../../main/navigationMenu/app.navigation-menu.service';

@Component({
    selector: 'app-scm-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent extends AbstractTableComponent implements OnInit {
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
            { label: 'Mitarbeiter', routerLink: ['/scm/employees']}
        ]);
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.columns = this.getColumns();
        // this.header = this.getHeader();
    }

    protected getEntityType(): any {
        return Employee;
    }

    protected getColumns(): TableColumn[] {
        return [
            {
                key: 'firstName',
                header: this.translate.instant('SCM.EMPLOYEE.FIRSTNAME'),
                renderer: (employee: Employee) => {
                    return employee.getFirstName();
                }
            },
            {
                key: 'lastName',
                header: this.translate.instant('SCM.EMPLOYEE.LASTNAME'),
                renderer: (employee: Employee) => {
                    return employee.getLastName();
                }
            },
            {
                key: 'street',
                header: this.translate.instant('SCM.EMPLOYEE.STREET'),
                renderer: (employee: Employee) => {
                    return employee.getStreet();
                }
            },
            {
                key: 'houseNumber',
                header: this.translate.instant('SCM.EMPLOYEE.HOUSENUMBER'),
                renderer: (employee: Employee) => {
                    return employee.getHouseNumber();
                }
            },
            {
                key: 'doorNumber',
                header: this.translate.instant('SCM.EMPLOYEE.DOORNUMBER'),
                renderer: (employee: Employee) => {
                    return employee.getDoorNumber();
                }
            },
            {
                key: 'postalCode',
                header: this.translate.instant('SCM.EMPLOYEE.POSTALCODE'),
                renderer: (employee: Employee) => {
                    return employee.getPostalCode();
                }
            },
            {
                key: 'city',
                header: this.translate.instant('SCM.EMPLOYEE.CITY'),
                renderer: (employee: Employee) => {
                    return employee.getCity();
                }
            },
            {
                key: 'country',
                header: this.translate.instant('SCM.EMPLOYEE.COUNTRY'),
                renderer: (employee: Employee) => {
                    return employee.getCountry();
                }
            },
            {

                key: 'employeeNumber',
                header: this.translate.instant('SCM.EMPLOYEE.EMPLOYEENUMBER'),
                renderer: (employee: Employee) => {
                    return employee.getEmployeeNumber();
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

    public onDetails(employee: Employee) {
        this.router.navigate([`scm/employees/${employee.getId()}`]);
    }
}
