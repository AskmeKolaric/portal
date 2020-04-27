import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate, CanActivateChild {

    public constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const canActivate = this.authenticationService.isLoggedIn();

        if (!canActivate) {
            this.router.navigate(['/login']).then();
        }
        return canActivate;
    }

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
