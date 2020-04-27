import {Injectable} from '@angular/core';
import {User} from '../entities/user';

@Injectable({
    providedIn: 'root'
})
export class UserRoleService {
    public static readonly ROLE_USER = 'User';
    public static readonly ROLE_ADMIN = 'Admin';
    public static readonly ROLE_SUPER_ADMIN = 'SuperAdmin';

    public static hasPermission(user: User, permission: string): boolean {
        if (user) {
            const role = user.getUserRole();
            if (role) {
                const roles = role.split(',');
                return roles.find((value: string) => value === permission) === permission;
            }
        }
        return false;
    }

    public static getPermissions(user: User): string[] {
        if (user) {
            const role = user.getUserRole();
            if (role) {
                return role.split(',');
            }
        }
        return [];
    }
}
