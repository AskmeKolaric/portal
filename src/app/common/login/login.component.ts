import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Route} from '../../shared/enums/route';
import {AuthenticationService, JwtLoginResponse} from '../../core/services/authentication.service';
import {User} from '../../core/entities/user';
import {LocalStorageService} from '../../core/services/local-storage.service';
import {Entity} from '../../core/services/entiry';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public user: User;

    public constructor(
        private fb: FormBuilder,
        private router: Router,
        private authentication: AuthenticationService,
        private localstorage: LocalStorageService) {
    }

    public ngOnInit() {
        if (this.authentication.isLoggedIn()) {
            this.router.navigate([Route.Home]).then();
        }

        this.form = this.fb.group({
            email: this.fb.control('', [Validators.required]),
            password: this.fb.control('', [Validators.required])
        });
    }

    public ngOnDestroy() {

    }

    public doLogin(): void {
        const formValues = this.form.value;

        this.authentication
            .login(formValues.email, formValues.password)
            .pipe(
                catchError((response: HttpErrorResponse) => {
                    this.onLoginError(response);

                    return throwError(response);
                }))
            .subscribe((response: JwtLoginResponse) => {
                this.onLoginSuccess(response);
            });
    }

    private onLoginError(response: HttpErrorResponse): void {
        console.log(response);
    }

    private onLoginSuccess(response: JwtLoginResponse): void {
        if (response.token) {
            this.authentication.setUserInfoAuth();
            this.router.navigate([Route.Home]).then();
        }
    }
}
