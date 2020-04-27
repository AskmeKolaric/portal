import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        HomeComponent,
        LoginComponent,
        UnauthorizedComponent
    ],
    declarations: [
        HomeComponent,
        LoginComponent,
        UnauthorizedComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommonModule {

}
