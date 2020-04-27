import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {User} from '../entities/user';
import {EntityManagerParserService} from 'xcentric';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private localStorage: any;
    private environment;
    private userInfo: User;

    public constructor(
        private entityParserService: EntityManagerParserService
    ) {
        this.localStorage = localStorage;
        this.environment = environment;
    }

    public setItem(key: string, value: any) {
        this.localStorage.setItem(this.getUniqueKey(key), JSON.stringify(value));
        return this;
    }

    public getItem(key: string): any | null {
        return JSON.parse(this.localStorage.getItem(this.getUniqueKey(key)));
    }

    public removeItem(key) {
        this.localStorage.removeItem(this.getUniqueKey(key));
        return this;
    }

    public itemExists(key): boolean {
        return this.localStorage.getItem(this.getUniqueKey(key)) !== null;
    }

    private getUniqueKey(key: string): string {
        return this.environment.key + '-' + key;
    }

    public setUserInfo(user: User) {
        this.userInfo = user;
        this.setItem('userInfo', user);
    }

    public getUserInfo(): User {
        if (this.userInfo) {
            return this.userInfo;
        } else  {
            const userInfo = this.getItem('userInfo');
            return (this.entityParserService.getParser().parse(new User(), userInfo)) as User;
        }
    }
    public removeUserInfo() {
        this.removeItem('userInfo');
        this.userInfo = null;
    }
}
