import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDatePickerComponent } from './custom-date-picker.component';

describe('CustomDatePickerComponent', () => {
  let component: CustomDatePickerComponent;
  let fixture: ComponentFixture<CustomDatePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomDatePickerComponent],
    });
    fixture = TestBed.createComponent(CustomDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});