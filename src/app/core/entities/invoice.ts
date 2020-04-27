import {AssociationOne, Route} from 'xcentric';
import {Company} from './company';


@Route('invoice')
export class Invoice {
    protected id: string;
    protected name: string;
    protected invoice_period: string;
    protected invoice_amount: string;
    protected invoice_number: string;
    protected tax_amount: string;
    protected invoice_total: string;
    protected note: string;

    @AssociationOne(Company)
    protected company: Company;

    // public getCompany(): string | undefined {
    //     return this.company;
    // }
    //
    // public setCompany(company: string): Invoice {
    //     this.company = company;
    //     return this;
    // }

    public getName(): string | undefined {
        return this.name;
    }

    public setName(name: string): Invoice {
        this.name = name;
        return this;
    }

    public getInvoicePeriod(): string | undefined {
        return this.invoice_period;
    }

    public setInvoicePeriod(invoicePeriod: string): Invoice {
        this.invoice_period = invoicePeriod;
        return this;
    }

    public getInvoiceAmount(): string | undefined {
        return this.invoice_amount;
    }

    public setInvoiceAmount(invoiceAmount: string): Invoice {
        this.invoice_amount = invoiceAmount;
        return this;
    }

    public getInvoiceNumber(): string | undefined {
        return this.invoice_number;
    }

    public setInvoiceNumber(invoiceNumber: string): Invoice {
        this.invoice_number = invoiceNumber;
        return this;
    }

    public getTaxAmount(): string | undefined {
        return this.tax_amount;
    }

    public setTaxAmount(taxAmount: string): Invoice {
        this.tax_amount = taxAmount;
        return this;
    }

    public getInvoiceTotal(): string | undefined {
        return this.invoice_total;
    }

    public setInvoiceTotal(invoiceTotal: string): Invoice {
        this.invoice_total = invoiceTotal;
        return this;
    }

    public getNote(): string | undefined {
        return this.note;
    }

    public setNote(note: string): Invoice {
        this.note = note;
        return this;
    }

}
