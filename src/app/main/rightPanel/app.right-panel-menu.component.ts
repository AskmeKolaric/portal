import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {ScrollPanel} from 'primeng/primeng';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-right-panel-menu',
    templateUrl: './app.right-panel-menu.component.html'
})
export class AppRightPanelMenuComponent implements AfterViewInit {

    @ViewChild('scrollRightPanel', { static: true }) rightPanelMenuScrollerViewChild: ScrollPanel;

    constructor(public app: AppComponent) {}

    ngAfterViewInit() {
        setTimeout(() => {this.rightPanelMenuScrollerViewChild.moveBar(); }, 100);
    }

    onTabChange(event) {
        setTimeout(() => {this.rightPanelMenuScrollerViewChild.moveBar(); }, 450);
    }
}
