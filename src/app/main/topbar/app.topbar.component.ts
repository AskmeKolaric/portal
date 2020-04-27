import { Component } from '@angular/core';
import {NgModule} from '@angular/core';
import { AppComponent} from '../../app.component';
import {AuthenticationService} from '../../core/services/authentication.service';
import {Route} from '../../shared/enums/route';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    constructor(public app: AppComponent) {
    }
}


