import {Component, Input, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="model" root="true" class="layout-menu"
            [reset]="reset" visible="true" parentActive="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {

    @Input() reset: boolean;

    model: any[];

    constructor(public app: AppComponent) {
    }

    ngOnInit() {
        this.model = [
            {label: 'Home', icon: 'fa fa-fw fa-home', routerLink: ['/']},
            {
                label: 'Firma',
                icon: 'fa fa-fw fa-users',
                items: [
                    {label: 'Rechnungen', icon: 'fa fa-fw fa-archive', routerLink: ['/scm/invoices']},
                    {label: 'Mitarbeiter', icon: 'fa fa-fw fa-id-card', routerLink: ['/scm/employees']},
                    {label: 'Anfragen', icon: 'fa fa-fw fa-id-card', routerLink: ['/scm/inquiries']},
                    {label: 'User', icon: 'fa fa-fw fa-id-card', routerLink: ['/scm/user']},
                ]
            },
            {
                label: 'Überlassungen',
                icon: 'fa fa-fw fa-briefcase',
                items: [
                    {label: 'Aktiv', icon: 'fa fa-fw fa-tasks', routerLink: ['/scm/invoices']},
                    {label: 'Beendet', icon: 'fa fa-fw fa-check', routerLink: ['/scm/employees']},
                ]
            },
            {
                label: 'Einstellungen',
                icon: 'fa fa-fw fa-cog',
                items: [
                    {label: 'Benutzer', icon: 'fa fa-fw fa-user', routerLink: ['/scm/invoices']},
                    {label: 'Profil', icon: 'fa fa-fw fa-book', routerLink: ['/scm/employees']},
                    {label: 'Adressen', icon: 'fa fa-fw fa-map', routerLink: ['/scm/employees']},
                    {label: 'Konto verwalten', icon: 'fa fa-fw fa-external-link', routerLink: ['/scm/employees']},
                ]
            },
            {label: 'Hilfe', icon: 'fa fa-fw fa-question-circle', routerLink: ['/scm/invoices']},
            {label: 'Feedback', icon: 'fa fa-fw fa-comment', routerLink: ['/scm/employees']},
        ];
    }
}

