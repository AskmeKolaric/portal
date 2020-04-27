import {Component} from '@angular/core';
import {AppNavigationMenuService} from '../../main/navigationMenu/app.navigation-menu.service';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent {

    constructor(
        private appNavigationMenu: AppNavigationMenuService
    ) {
        this.appNavigationMenu.setItems([
            { label: 'Home', routerLink: ['/scm/home']}
        ]);
    }
}
