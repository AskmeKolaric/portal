import {Route} from 'xcentric';

@Route('slo;;')

export class Skill {
    protected name: string;
    protected valid_from: string;
    protected valid_to: string;
    
    public getName(): string {
        return this.name;
    }
    
    public setName(name: string): Skill {
        this.name = name;
        return this;
    }

    public getValidFrom(): string {
        return this.valid_from;
    }

    public setValidFrom(validFrom: string): Skill {
        this.valid_from = validFrom;
        return this;
    }

    public getValidTo(): string {
        return this.valid_to;
    }

    public setValidTo(validTo: string): Skill {
        this.valid_to = validTo;
        return this;
    }
}
