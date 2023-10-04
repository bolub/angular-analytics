import { Component, EventEmitter, Output } from '@angular/core';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import {
  filterChartTypes,
  resetFilteredChartTypes,
} from '../../../../shared/state/chart-types/chart-type.action';
import { selectFilterRange } from '../../../../shared/state/chart-types/chart-type.selector';

type DateChangeEvent = {
  start?: Date | null;
  end?: Date | null;
};

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class CustomDatePickerComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  filterRange$ = this.store.select(selectFilterRange);

  constructor(private store: Store) {}

  onApply() {
    this.store.dispatch(
      filterChartTypes({
        range: {
          start: this.range.get('start')?.value,
          end: this.range.get('end')?.value,
        },
      })
    );
  }

  resetDateRange() {
    this.store.dispatch(resetFilteredChartTypes());
    this.range.reset();
  }
}
