import {AssociationMany, AssociationOne, Route} from 'xcentric';
import {Company} from './company';
import {Skill} from "./skill";
import {Curriculum} from "./curriculum";

@Route('inquiryposition')
export class InquiryPosition {
    protected id: number;
    protected name: string;
    protected inquiry_id: string;
    protected skill_id: string;

    @AssociationOne(Company)
    protected company: Company;

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): InquiryPosition {
        this.name = name;
        return this;
    }
    public getInquiryId(): string {
        return this.inquiry_id;
    }

    public setInquiryId(inquiryId: string): InquiryPosition {
        this.inquiry_id = inquiryId;
        return this;
    }
    public getSkillId(): string {
        return this.skill_id;
    }

    public setSkillId(skillId: string): InquiryPosition {
        this.skill_id = skillId;
        return this;
    }
}
