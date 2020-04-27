import { Component, OnDestroy } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/primeng';
import {AppNavigationMenuService} from './app.navigation-menu.service';
import {AuthenticationService} from '../../core/services/authentication.service';
import {Router} from '@angular/router';
import {Route} from '../../shared/enums/route';

@Component({
    selector: 'app-navigation-menu',
    templateUrl: './app.navigation-menu.component.html'
})

export class AppNavigationMenuComponent implements  OnDestroy {
    subscription: Subscription;

    items: MenuItem[];

    constructor(public breadcrumbService: AppNavigationMenuService,
                protected authentication: AuthenticationService,
                private router: Router) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
    }

    public onLogout() {
        this.authentication.logout();
        this.router.navigate([Route.Login]).then();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public onClick() {
    }
}

