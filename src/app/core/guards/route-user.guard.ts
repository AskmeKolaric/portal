import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UserRoleService} from '../services/user-role.service';

@Injectable()
export class RouteUserGuard implements CanActivate, CanActivateChild {

    public constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user = this.authenticationService.getUser();

        if (UserRoleService.hasPermission(user, UserRoleService.ROLE_USER) && UserRoleService.getPermissions(user).length <= 1) {
            this.router.navigate(['/unauthorized']).then();

            return false;
        }
        return true;
    }

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
