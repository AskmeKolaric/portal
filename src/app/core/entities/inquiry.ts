import {AssociationMany, AssociationOne, Route} from 'xcentric';
import {Company} from './company';
import {Skill} from "./skill";
import {Curriculum} from "./curriculum";
import {Employee} from "./employee";

@Route('inquiry')
export class Inquiry {
    protected id: number;
    protected name: string;
    protected inquiry_number: string;


    @AssociationOne(Company)
    protected company: Company;

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): Inquiry {
        this.name = name;
        return this;
    }
    public getInquiryNumber(): string {
        return this.inquiry_number;
    }

    public setInquiryNumber(inquiryNumber: string): Inquiry {
        this.inquiry_number = inquiryNumber;
        return this;
    }
}
