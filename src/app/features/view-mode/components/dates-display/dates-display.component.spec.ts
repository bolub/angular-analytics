import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesDisplayComponent } from './dates-display.component';

describe('DatesDisplayComponent', () => {
  let component: DatesDisplayComponent;
  let fixture: ComponentFixture<DatesDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DatesDisplayComponent],
    });
    fixture = TestBed.createComponent(DatesDisplayComponent);
    component = fixture.componentInstance;
    component.startDate = new Date('2016-05-04');
    component.endDate = new Date('2018-12-31');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit resetClicked event on reset button click', () => {
    let resetClickedEmitted = false;
    component.isFiltering = true;
    fixture.detectChanges();

    component.resetClicked.subscribe(() => {
      resetClickedEmitted = true;
    });

    const resetButton = fixture.nativeElement.querySelector('button');
    resetButton.click();

    expect(resetClickedEmitted).toBe(true);
  });
});
