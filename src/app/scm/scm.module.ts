import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ScmRoutes } from './scm-routes.module';
import { ScmComponent } from './scm.componet';
import {InvoiceListComponent} from './invoice/list/invoice-list.component';
import {EmployeeListComponent} from "./employee/list/employee-list.component";
import {EmployeeDetailsComponent} from "./employee/details/employee-details.component";
import {InquiryListComponent} from "./inquiry/list/inquiry-list.component";
import {InquiryDetailsComponent} from "./inquiry/details/inquiry-details.component";
import {UserListComponent} from './user/user-list.component';

@NgModule({
    imports: [
        SharedModule,
        ScmRoutes
    ],
    exports: [
    ],
    declarations: [
        ScmComponent,
        InvoiceListComponent,
        EmployeeListComponent,
        EmployeeDetailsComponent,
        InquiryListComponent,
        InquiryDetailsComponent,
        UserListComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: []
})

export class ScmModule {
}
