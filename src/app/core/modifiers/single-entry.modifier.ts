import {Injectable} from '@angular/core';
import {HttpRequest} from '@angular/common/http';
import {Modifier} from 'xcentric';
import {EntityManagerParserService} from 'xcentric';

@Injectable({
    providedIn: 'root'
})
export class SingleEntryModifier implements Modifier {

    public constructor(
        protected parser: EntityManagerParserService
    ) {

    }

    public modifyRequest(entity: any, request: HttpRequest<any>): any {
        return request;
    }

    public modifyResponse(entity: any, request: HttpRequest<any>, responseBody): any  {

        if (responseBody) {
            responseBody = this.parser.getParser().parseEntity(entity, responseBody);
        }

        return responseBody;
    }
}
