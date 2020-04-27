import {Route} from 'xcentric';

@Route('company')

export class Company {
    protected name: string;
    protected companyId: string;
    protected isActive: string;
    protected taxNumber: string;


    public getName(): string | undefined {
        return this.name;
    }

    public setName(name: string): Company {
        this.name = name;
        return this;
    }

    public getCompanyId(): string | undefined {
        return this.companyId;
    }

    public setCompanyId(companyId: string): Company {
        this.companyId = companyId;
        return this;
    }

    public getIsActive(): string | undefined {
        return this.isActive;
    }

    public setIsActive(isActive: string): Company {
        this.isActive = isActive;
        return this;
    }

    public getTaxNumber(): string | undefined {
        return this.taxNumber;
    }

    public setTaxNumber(taxNumber: string): Company {
        this.taxNumber = taxNumber;
        return this;
    }

}
