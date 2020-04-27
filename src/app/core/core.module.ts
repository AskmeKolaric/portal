import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MessageService} from 'primeng/api';
import {UserRepository} from './services/repositiry/user.repository';
import {RouteUserGuard} from './guards/route-user.guard';
import {RouteAdminGuard} from './guards/route-admin.guard';

@NgModule({
    imports: [
    ],
    exports: [],
    declarations: [
    ],
    providers: [
        MessageService,
        UserRepository,
        RouteUserGuard,
        RouteAdminGuard
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {
}
