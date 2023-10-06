import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
    }).overrideComponent(LoaderComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default,
      },
    });
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display nothing if status is not provided', () => {
    fixture.detectChanges();

    const loaderContainer = fixture.nativeElement.querySelector(
      '[data-testid="loader-container"]'
    );

    expect(loaderContainer).toBe(null);
  });

  it('should display loading', () => {
    component.status = 'loading';

    fixture.detectChanges();

    const loaderContainer = fixture.nativeElement.querySelector(
      '[data-testid="loader-container"]'
    );

    expect(loaderContainer).not.toBe('hidden');
  });
});
