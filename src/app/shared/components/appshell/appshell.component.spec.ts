import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppshellComponent } from './appshell.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

describe('AppshellComponent', () => {
  let component: AppshellComponent;
  let fixture: ComponentFixture<AppshellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppshellComponent],
      imports: [RouterTestingModule, RouterModule],
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
