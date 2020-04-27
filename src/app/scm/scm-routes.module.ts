import { Routes, RouterModule } from '@angular/router';
import { ScmComponent } from './scm.componet';
import {InvoiceListComponent} from './invoice/list/invoice-list.component';
import {EmployeeListComponent} from './employee/list/employee-list.component';
import {EmployeeDetailsComponent} from './employee/details/employee-details.component';
import {InquiryListComponent} from './inquiry/list/inquiry-list.component';
import {InquiryDetailsComponent} from './inquiry/details/inquiry-details.component';
import {UserListComponent} from './user/user-list.component';
import {RouteUserGuard} from '../core/guards/route-user.guard';
import {AuthenticatedGuard} from '../core/guards/authenticated.guard';
import {RouteAdminGuard} from '../core/guards/route-admin.guard';


const routes: Routes = [
    {
        path: '',
        component: ScmComponent,
        canActivate: [AuthenticatedGuard],
        canActivateChild: [AuthenticatedGuard],
        children: [
            {
                path: 'invoices',
                children: [
                    {
                        path: '',
                        component: InvoiceListComponent
                    }
                ]
            },
            {
                path: 'employees',
                children: [
                    {
                        path: '',
                        component: EmployeeListComponent
                    },
                    {
                        path: ':id',
                        component: EmployeeDetailsComponent,
                        canActivate: [RouteAdminGuard]
                    }
                ],
                canActivate: [RouteUserGuard]
            },
            {
                path: 'inquiries',
                children: [
                    {
                        path: '',
                        component: InquiryListComponent
                    },
                    {
                        path: ':id',
                        component: InquiryDetailsComponent
                    }
                ],
                canActivate: [RouteUserGuard]
            },
            {
                path: 'user',
                component: UserListComponent,
                canActivate: [RouteUserGuard, RouteAdminGuard]
            }
        ]
    }
];
export const ScmRoutes = RouterModule.forChild(routes);
