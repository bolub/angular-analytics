import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ChartTypeDisplay } from './chart-type-display.component';
import { EditChartTypeDialogComponent } from '../chart-type-dialog/edit-chart-type-dialog/edit-chart-type-dialog.component';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  ActionType,
  Status,
} from 'src/app/shared/state/chart-types/chart-type.reducer';
import { ChartType, ChartTypeFull } from '../../settings.model';
import { CommonModule } from '@angular/common';
import {
  deleteChartType,
  setCurrentChartType,
} from 'src/app/shared/state/chart-types/chart-type.action';

describe('ChartTypeDisplay', () => {
  let component: ChartTypeDisplay;
  let fixture: ComponentFixture<ChartTypeDisplay>;
  let store: MockStore;
  let mockMatDialogRef: MatDialogRef<EditChartTypeDialogComponent>;
  let mockMatSnackBar: MatSnackBar;

  const initialState = {
    chartTypes: [] as ChartTypeFull[],
    status: 'idle' as Status,
    actionType: undefined as ActionType | undefined,
  };

  const mockChartType = {
    title: 'New Line Visualization update',
    color: '#dba91f',
    selectedType: 'bar' as ChartType['selectedType'],
    $id: '7qDp1tfk',
    $createdAt: new Date(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartTypeDisplay,
        MatDialogModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartTypeDisplay);
    component = fixture.componentInstance;
    component.data = mockChartType;
    store = TestBed.inject(MockStore);
    mockMatDialogRef = TestBed.inject(MatDialogRef);
    mockMatSnackBar = TestBed.inject(MatSnackBar);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch deleteChartType action when onDelete is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const deleteChartTypeAction = deleteChartType({ $id: mockChartType.$id });

    component.onDelete();

    expect(dispatchSpy).toHaveBeenCalledWith(deleteChartTypeAction);
  });

  it('should dispatch setCurrentChartType action and open the dialog when openEditModal is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const setCurrentChartTypeAction = setCurrentChartType({
      data: mockChartType,
    });

    component.openEditModal();

    expect(dispatchSpy).toHaveBeenCalledWith(setCurrentChartTypeAction);
  });

  it('should unsubscribe from dataSubscription$ on ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.dataSubscription$, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
