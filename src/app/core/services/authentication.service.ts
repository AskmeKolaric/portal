import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {EntityManagerService} from 'xcentric';
import {User} from '../entities/user';
import {UserRepository} from './repositiry/user.repository';

export class JwtLoginResponse extends Response {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private static readonly LOCAL_STORAGE_TOKEN_KEY = 'token';

    private user: User;

    public constructor(
        private router: Router,
        private http: HttpClient,
        private localStorage: LocalStorageService,
        private userRep: UserRepository
    ) {
    }

    public login(email: string, password: string): Observable<JwtLoginResponse> {

        const headers = new HttpHeaders({
            accept: 'application/json'
        });
        return this.http.post(
            environment.LOG_IN_PREFIX + 'login_check',
            {
                email,
                password
            },
            {
                headers
            }
        ).pipe(
            map((response: JwtLoginResponse) => {
                this.setToken(response.token);
                return response;
            })
        );
    }

    public logout(): void {
        this.removeToken();
        this.localStorage.removeUserInfo();
    }

    public setToken(token: string): void {
        this.localStorage.setItem(AuthenticationService.LOCAL_STORAGE_TOKEN_KEY, token);
    }

    private removeToken(): void {
        this.localStorage.removeItem(AuthenticationService.LOCAL_STORAGE_TOKEN_KEY);
    }

    public isLoggedIn(): boolean {
        return this.localStorage.itemExists(AuthenticationService.LOCAL_STORAGE_TOKEN_KEY);
    }

    public getUser(): User {
        // return {getId: () => { return 1; }};
        if (this.user) {
            return  this.user;
        } else  {
            this.user = this.localStorage.getUserInfo();
        }
        return this.user;
    }
    public setUserInfoAuth(): any {
        this.userRep.getAuthUser().subscribe((user: User) => {
            this.user = user;
            this.localStorage.setUserInfo(user);
        });
    }

    public getToken(): string {
        return 'Bearer ' + this.localStorage.getItem(AuthenticationService.LOCAL_STORAGE_TOKEN_KEY);
    }
}
