import {Component, OnInit} from '@angular/core';
import {AppNavigationMenuService} from '../../main/navigationMenu/app.navigation-menu.service';

@Component({
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {

    constructor(
        private appNavigationMenu: AppNavigationMenuService
    ) {
        this.appNavigationMenu.setItems([
            { label: 'Unauthorized', routerLink: ['/unauthorized']}
        ]);
    }

}
