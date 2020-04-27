import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TableColumn} from '../../../shared/table/shared/table-column';
import {TableHeader} from '../../../shared/table/shared/table-header';
import {TranslateService} from '@ngx-translate/core';
import {EntityManagerService} from 'xcentric';
import {AppComponent} from '../../../app.component';
import {MessageService} from 'primeng/api';
import {Employee} from '../../../core/entities/employee';
import {ActivatedRoute} from '@angular/router';
import {AppNavigationMenuService} from '../../../main/navigationMenu/app.navigation-menu.service';

@Component({
    selector: 'app-scm-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
    public employee: Employee = null;
    public cols = [];
    public colsCurriculum = [];
    public skills = [];
    public curriculums = [];

    public constructor(
        protected entityManager: EntityManagerService,
        protected appComponent: AppComponent,
        protected cd: ChangeDetectorRef,
        protected message: MessageService,
        protected translate: TranslateService,
        protected route: ActivatedRoute,
        private appNavigationService: AppNavigationMenuService
    ) {
        this.appNavigationService.setItems([
            {label: 'Mitarbeiter/Details', routerLink: ['/scm/employees/:id']}
        ]);
    }

    public ngOnInit(): void {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'valid_from', header: 'Von' },
            { field: 'valid_to', header: 'Bis' }
        ];

        this.colsCurriculum = [
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Details' },
            { field: 'valid_from', header: 'Von' },
            { field: 'valid_to', header: 'Bis' }
        ];

        this.route.params.subscribe(params => {

            if (params.id) {
                this.entityManager.getRepository(Employee).find(params.id).subscribe(employee => {
                    this.employee = employee;
                    this.skills = employee.getSkills();
                    this.curriculums = employee.getCurriculums();
                });
            }
        });
    }
}
