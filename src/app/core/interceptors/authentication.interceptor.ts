import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {Router} from '@angular/router';
import {Route} from '../../shared/enums/route';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(
        private authentication: AuthenticationService,
        private router: Router
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({
            headers: req.headers.set('Authorization', this.authentication.getToken())
        });

        return next
            .handle(req)
            .pipe(
                catchError((response: any, caught: Observable<HttpEvent<any>>) => {
                    if (response.status === 401) {
                        this.authentication.logout();
                        this.router.navigate([Route.Login]).then();
                    }

                    throw caught;
                }),
                tap(event => {
                }));
    }
}
