import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModeComponent } from './view-mode.component';

describe('ViewModeComponent', () => {
  let component: ViewModeComponent;
  let fixture: ComponentFixture<ViewModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewModeComponent]
    });
    fixture = TestBed.createComponent(ViewModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
