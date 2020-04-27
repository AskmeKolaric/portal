import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {EntityManagerModule, BaseConfigurator, EntityManagerConfigurator} from 'xcentric';
import {MainModule} from './main/main.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {PaginationModifier} from './core/modifiers/pagination.modifier';
import {HeaderInterceptor} from './core/interceptors/header.interceptor';
import {SingleEntryModifier} from './core/modifiers/single-entry.modifier';
import {CommonModule} from './common/common.module';
import {AuthenticationInterceptor} from './core/interceptors/authentication.interceptor';
import {ErrorInterceptor} from './core/interceptors/error.interceptor';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function EntityManagerFactory() {
    return new BaseConfigurator(environment.ENTITY_MANAGER_URL_PREFIX, [
        PaginationModifier,
        SingleEntryModifier
    ]);
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        CoreModule,
        EntityManagerModule.forRoot({
            loader: {
                provide: EntityManagerConfigurator,
                useFactory: EntityManagerFactory
            }
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MainModule,
        CommonModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
