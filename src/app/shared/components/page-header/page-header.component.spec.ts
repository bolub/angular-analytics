import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderComponent } from './page-header.component';
import { ChangeDetectionStrategy } from '@angular/core';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageHeaderComponent],
    }).overrideComponent(PageHeaderComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default,
      },
    });
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const titleText = 'Header Title'; // Change this to the desired title text
    component.title = titleText;

    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector(
      '[data-testid="header-title"]'
    );

    expect(titleElement.textContent).toContain(titleText);
  });
});
