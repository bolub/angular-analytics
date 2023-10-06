import { Component } from '@angular/core';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import {
  filterViewModeData,
  resetViewModeData,
} from '../../../../shared/state/chart-types/chart-type.action';
import { selectFilterRange } from '../../../../shared/state/chart-types/chart-type.selector';

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
      filterViewModeData({
        range: {
          start: this.range.get('start')?.value,
          end: this.range.get('end')?.value,
        },
      })
    );
  }

  resetDateRange() {
    this.store.dispatch(resetViewModeData());
    this.range.reset();
  }
}
