import { Component } from '@angular/core';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html',
  styleUrls: ['./app.footer.component.scss']
})
export class AppFooterComponent {
  constructor(public app: AppComponent) {
  }

}
