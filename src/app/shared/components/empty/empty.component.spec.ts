import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyComponent } from './empty.component';
import { ChangeDetectionStrategy } from '@angular/core';

describe('EmptyComponent', () => {
  let component: EmptyComponent;
  let fixture: ComponentFixture<EmptyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyComponent],
    }).overrideComponent(EmptyComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default,
      },
    });

    fixture = TestBed.createComponent(EmptyComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const titleText = 'Test Title'; // Change this to the desired title text
    component.title = titleText;

    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector(
      '[data-testid="title"]'
    );

    expect(titleElement.textContent).toContain(titleText);
  });
});
