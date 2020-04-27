import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TableColumn} from '../../../shared/table/shared/table-column';
import {TableHeader} from '../../../shared/table/shared/table-header';
import {TranslateService} from '@ngx-translate/core';
import {EntityManagerService} from 'xcentric';
import {AppComponent} from '../../../app.component';
import {MessageService} from 'primeng/api';
import {Employee} from '../../../core/entities/employee';
import {ActivatedRoute} from '@angular/router';
import {Inquiry} from "../../../core/entities/inquiry";
import {AppNavigationMenuService} from '../../../main/navigationMenu/app.navigation-menu.service';

@Component({
    selector: 'app-scm-inquiry-details',
    templateUrl: './inquiry-details.component.html',
    styleUrls: ['./inquiry-details.component.scss']
})
export class InquiryDetailsComponent implements OnInit {
    public inquiry: Inquiry = null;
    public cols = [];
    public skills = [];

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
                {label: 'Anfragen/Details', routerLink: ['/scm/inquiries/:id']}
            ]);
    }

    public ngOnInit(): void {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'valid_from', header: 'Von' },
            { field: 'valid_to', header: 'Bis' }
        ];

        this.skills = [
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Details' }
        ];

        this.route.params.subscribe(params => {

            if (params.id) {
                this.entityManager.getRepository(Inquiry).find(params.id).subscribe(inquiry => {
                    this.inquiry = inquiry;
                    this.skills = inquiry.getSkills();
                });
            }
        });
    }
}
