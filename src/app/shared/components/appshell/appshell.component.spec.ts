import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppshellComponent } from './appshell.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavItemsComponent } from '../side-nav-items/side-nav-items.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from '../navbar/navbar.component';

describe('AppshellComponent', () => {
  let component: AppshellComponent;
  let fixture: ComponentFixture<AppshellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule,
        SideNavItemsComponent,
        CommonModule,
        MatSidenavModule,
        NavbarComponent,
        BrowserAnimationsModule,
        AppshellComponent,
      ],
    });
    fixture = TestBed.createComponent(AppshellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the right links', () => {
    const linkData = [
      { label: 'View Mode', path: '/view-mode' },
      { label: 'Settings', path: '/settings' },
    ];

    expect(component).toBeTruthy();

    const routerLinks = fixture.nativeElement.querySelectorAll(
      '[data-testid="router-link"]'
    );

    expect(routerLinks.length).toBe(linkData.length);

    for (let i = 0; i < linkData.length; i++) {
      expect(routerLinks[i].getAttribute('href')).toBe(linkData[i].path);
    }
  });
});
