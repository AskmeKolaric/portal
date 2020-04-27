import {Injectable} from '@angular/core';

import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private message: MessageService,
        private translate: TranslateService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next
            .handle(req)
            .pipe(
                catchError((response: HttpErrorResponse) => {
                    if (response.status !== 401) {
                        this.showMessage(response);
                    }

                    return throwError(response);
                }),
                tap(event => {
                }));
    }

    private showMessage(response: HttpErrorResponse): ErrorInterceptor {
        const error = response.error;

        let errorTitle = this.translate.instant('COMMON.ERROR'),
            errorMessage = this.translate.instant('COMMON.SOME_ERROR_OCCURRED');

        if (error && error['hydra:title'] && typeof error['hydra:title'] === 'string') {
            errorTitle = error['hydra:title'];
        }

        if (error && error['hydra:description'] && typeof error['hydra:description'] === 'string') {
            errorMessage = error['hydra:description'];

            if (errorMessage.length > 200) {
                errorMessage = errorMessage.substring(0, 200) + '...';
            }
        }

        this.message.add({
            summary: errorTitle,
            detail: errorMessage,
            severity: 'error'
        });

        return this;
    }

}
