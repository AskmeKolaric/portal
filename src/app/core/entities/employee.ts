import {AssociationMany, AssociationOne, Route} from 'xcentric';
import {Company} from './company';
import {Skill} from './skill';
import {Curriculum} from './curriculum';

@Route('employee')
export class Employee {
    protected id: number;
    protected first_name: string;
    protected last_name: string;
    protected street: string;
    protected house_number: string;
    protected door_number: string;
    protected postal_code: string;
    protected city: string;
    protected country: string;
    protected employee_number: string;

    @AssociationOne(Company)
    protected company: Company;

    @AssociationMany(Skill)
    protected skills: Skill[];

    @AssociationMany(Curriculum)
    protected curriculums: Curriculum[];

    public getId(): number {
        return this.id;
    }

    public getFirstName(): string {
        return this.first_name;
    }

    public setFirstName(firstName: string): Employee {
        this.first_name = firstName;
        return this;
    }

    public getLastName(): string {
        return this.last_name;
    }

    public setLastName(lastName: string): Employee {
        this.last_name = lastName;
        return this;
    }

    public getStreet(): string {
        return this.street;

    }
    public setStreet(street: string): Employee {
        this.street = street;
        return this;
    }

    public getHouseNumber(): string {
        return this.house_number;
    }

    public setHouseNumber(houseNumber: string): Employee {
        this.house_number = houseNumber;
        return this;
    }

    public getDoorNumber(): string {
        return this.door_number;
    }

    public setDoorNumber(doorNumber: string): Employee {
        this.door_number = doorNumber;
        return this;
    }

    public getPostalCode(): string {
        return this.postal_code;
    }

    public setPostalCode(postalCode: string): Employee {
        this.postal_code = postalCode;
        return this;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): Employee {
        this.city = city;
        return this;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): Employee {
        this.country = country;
        return this;
    }

    public getEmployeeNumber(): string {
        return this.employee_number;
    }

    public setEmployeeNumber(employeeNumber: string): Employee {
        this.employee_number = employeeNumber;
        return this;
    }

    public getSkills(): Skill[] {
        return this.skills;
    }

    public setSkills(skills: Skill[]): Employee {
        this.skills = skills;
        return this;
    }

    public getCurriculums(): Curriculum[] {
        return this.curriculums;
    }

    public setCurriculums(curriculums: Curriculum[]): Employee {
        this.curriculums = curriculums;
        return this;
    }
}
