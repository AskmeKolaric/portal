import {Injectable} from '@angular/core';
import {User} from '../../entities/user';
import {Entity} from '../entiry';
import {EntityManagerParserService, EntityManagerService} from 'xcentric';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class UserRepository {

    protected type: typeof Entity = User;

    constructor(
        private http: HttpClient,
        private entityParserService: EntityManagerParserService
    ) {}
    public getAuthUser(): Observable<User> {
        return this.http.get(
            environment.ENTITY_MANAGER_URL_PREFIX + `user/me`)
            .pipe(map( (data: any) => {
                const type = this.type;
                return this.entityParserService.getParser().parse(new type(), data);
            }));
    }

}
