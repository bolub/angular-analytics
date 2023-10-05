import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChartTypeDialogComponent } from './edit-chart-type-dialog.component';

describe('EditChartTypeDialogComponent', () => {
  let component: EditChartTypeDialogComponent;
  let fixture: ComponentFixture<EditChartTypeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditChartTypeDialogComponent]
    });
    fixture = TestBed.createComponent(EditChartTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
