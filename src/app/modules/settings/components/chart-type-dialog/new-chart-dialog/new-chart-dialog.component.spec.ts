import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChartDialogComponent } from './new-chart-dialog.component';

describe('NewChartDialogComponent', () => {
  let component: NewChartDialogComponent;
  let fixture: ComponentFixture<NewChartDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NewChartDialogComponent],
    });
    fixture = TestBed.createComponent(NewChartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
