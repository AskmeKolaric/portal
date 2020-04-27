import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {AppTopBarComponent} from './topbar/app.topbar.component';
import {AppFooterComponent} from './footer/app.footer.component';
import {CommonModule} from '@angular/common';
import {AppMenuComponent} from './menu/app-main-menu.component';
import {AppSubMenuComponent} from './menu/app-main-sub-menu.component';
import {SharedModule} from '../shared/shared.module';
import {AppProfileComponent} from './profile/app.profile.component';
import {AppNavigationMenuComponent} from './navigationMenu/app.navigation-menu.component';
import {AppNavigationMenuService} from './navigationMenu/app.navigation-menu.service';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {DataViewModule} from 'primeng/dataview';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {AppRightPanelMenuComponent} from './rightPanel/app.right-panel-menu.component';

@NgModule({
    exports: [
        AppMenuComponent,
        AppSubMenuComponent,
        AppFooterComponent,
        AppTopBarComponent,
        AppProfileComponent,
        AppNavigationMenuComponent,
        AppRightPanelMenuComponent
    ],
    declarations: [
        AppMenuComponent,
        AppSubMenuComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppProfileComponent,
        AppNavigationMenuComponent,
        AppRightPanelMenuComponent
    ],
    providers: [
        AppNavigationMenuService
    ],
    imports: [
        CommonModule,
        SharedModule,
        BreadcrumbModule,
        DataViewModule,
        FullCalendarModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule {
}
