import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppTopBarComponent } from './main/topbar/app.topbar.component';
// import { AppBreadcrumbComponent } from './app.breadcrumb.component';
// import { AppRightPanelComponent } from './app.rightpanel.component';
import { AppProfileComponent } from './main/profile/app.profile.component';
// import { BreadcrumbService } from './breadcrumb.service';
import { AppFooterComponent } from './main/footer/app.footer.component';
// import { AppMegamenuComponent } from './app.megamenu.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, ScrollPanelModule, TabViewModule, PanelModule, ButtonModule],
      declarations: [
        AppComponent,
        AppTopBarComponent,
        // AppMegamenuComponent,
        // AppRightPanelComponent,
        AppProfileComponent,
        AppFooterComponent,
        // AppBreadcrumbComponent
      ],
      // providers: [BreadcrumbService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
