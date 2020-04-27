import {Route} from 'xcentric';

@Route('curriculums')

export class Curriculum {
    protected name: string;
    protected description: string;
    protected valid_from: string;
    protected valid_to: string;
    
    public getName(): string {
        return this.name;
    }
    
    public setName(name: string): Curriculum {
        this.name = name;
        return this;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): Curriculum {
        this.description = description;
        return this;
    }

    public getValidFrom(): string {
        return this.valid_from;
    }

    public setValidFrom(validFrom: string): Curriculum {
        this.valid_from = validFrom;
        return this;
    }

    public getValidTo(): string {
        return this.valid_to;
    }

    public setValidTo(validTo: string): Curriculum {
        this.valid_to = validTo;
        return this;
    }
}
