import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TableColumn} from '../../shared/table/shared/table-column';
import {TableHeader} from '../../shared/table/shared/table-header';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTableComponent} from '../../shared/table/abstract-table.component';
import {EntityManagerService} from 'xcentric';
import {AppComponent} from '../../app.component';
import {MessageService} from 'primeng/api';
import {User} from '../../core/entities/user';
import {Router} from '@angular/router';
import {AppNavigationMenuService} from '../../main/navigationMenu/app.navigation-menu.service';

@Component({
    selector: 'app-scm-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends AbstractTableComponent implements OnInit {
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
            { label: 'User', routerLink: ['/scm/user']}
        ]);
    }

    public ngOnInit(): void {
        super.ngOnInit();

        this.columns = this.getColumns();
        // this.header = this.getHeader();
    }

    protected getEntityType(): any {
        return User;
    }

    protected getColumns(): TableColumn[] {
        return [
            {
                key: 'firstName',
                header: this.translate.instant('SCM.EMPLOYEE.FIRSTNAME'),
                renderer: (user: User) => {
                    return user.getFirstName();
                }
            },
            {
                key: 'lastName',
                header: this.translate.instant('SCM.EMPLOYEE.LASTNAME'),
                renderer: (user: User) => {
                    return user.getLastName();
                }
            },
            {
                key: 'username',
                header: 'Username',
                renderer: (user: User) => {
                    return user.getUsername();
                }
            },
            {
                key: 'role',
                header: 'Role',
                renderer: (user: User) => {
                    return user.getUserRole();
                }
            },
            {
                key: 'email',
                header: 'Email',
                renderer: (user: User) => {
                    return user.getEmail();
                }
            },
            {

                key: 'id',
                header: 'Id',
                renderer: (user: User) => {
                    return user.getId();
                }
            }
        ];
    }
}
