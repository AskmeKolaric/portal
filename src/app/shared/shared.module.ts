import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {sharedExports} from './shared.exports';
import {sharedDeclarations} from './shared.declarations';

@NgModule({
    imports: [
        ...sharedExports
    ],
    declarations: [
        ...sharedDeclarations
    ],
    providers: [],
    exports: [
        ...sharedExports,
        ...sharedDeclarations
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
    ]
})
export class SharedModule {

}
