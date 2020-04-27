import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({
            // headers: req.headers.set('Access-Control-Allow-Origin', '*'),
            responseType: 'json'
        });

        return next
            .handle(req)
            .pipe(
                catchError((response: any, caught: Observable<HttpEvent<any>>) => {


                    throw caught;
                }),
                tap(event => {
                }));
    }
}
