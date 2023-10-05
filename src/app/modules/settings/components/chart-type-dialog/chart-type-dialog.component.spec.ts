import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTypeDialogComponent } from './chart-type-dialog.component';

describe('ChartTypeDialogComponent', () => {
  let component: ChartTypeDialogComponent;
  let fixture: ComponentFixture<ChartTypeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartTypeDialogComponent]
    });
    fixture = TestBed.createComponent(ChartTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
