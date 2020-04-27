import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LoginComponent} from './common/login/login.component';
import {HomeComponent} from './common/home/home.component';
import {AuthenticatedGuard} from './core/guards/authenticated.guard';
import {UnauthorizedComponent} from './common/unauthorized/unauthorized.component';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthenticatedGuard],
        canActivateChild: [AuthenticatedGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: 'scm',
        loadChildren: './scm/scm.module#ScmModule',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
