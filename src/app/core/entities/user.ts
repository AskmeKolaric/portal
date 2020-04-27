import {AssociationOne, Route} from 'xcentric';
import {Company} from './company';
import {Entity} from '../services/entiry';

@Route('user')
export class User extends Entity {
    protected id: number;
    protected first_name: string;
    protected last_name: string;
    protected email: string;
    protected username: string;
    protected role: string;

    @AssociationOne(Company)
    protected company: Company;

    public getId(): number {
        return this.id;
    }
    public setId(id: number): User {
        this.id = id;
        return this;
    }

    public getFirstName(): string {
        return this.first_name;
    }

    public setFirstName(firstName: string): User {
        this.first_name = firstName;
        return this;
    }

    public getLastName(): string {
        return this.last_name;
    }

    public setLastName(lastName: string): User {
        this.last_name = lastName;
        return this;
    }

    public getUsername(): string {
        return this.username;

    }
    public setUsername(username: string): User {
        this.username = username;
        return this;
    }
    public getEmail(): string {
        return this.email;

    }
    public setEmail(email: string): User {
        this.email = email;
        return this;
    }

    public getUserRole(): string {
        return this.role;
    }

    public setUserRole(role: string): User {
        this.role = role;
        return this;
    }
}
