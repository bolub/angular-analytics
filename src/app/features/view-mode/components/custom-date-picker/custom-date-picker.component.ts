import { Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { Store } from '@ngrx/store';

import { DatesDisplayComponent } from '../dates-display/dates-display.component';
import { ChartTypeActions } from 'src/app/shared/state/chart-types/chart-type.action';

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
    DatesDisplayComponent,
  ],
})
export class CustomDatePickerComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  isFiltering = false;

  constructor(private store: Store) {}

  onApply() {
    this.isFiltering = true;

    this.store.dispatch(
      ChartTypeActions.filterViewModeData({
        range: {
          start: this.range.get('start')?.value,
          end: this.range.get('end')?.value,
        },
      })
    );
  }

  resetDateRange() {
    this.isFiltering = false;

    this.store.dispatch(ChartTypeActions.resetViewModeData());
    this.range.reset();
  }
}
