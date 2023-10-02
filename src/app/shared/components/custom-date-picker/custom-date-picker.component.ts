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
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

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
    JsonPipe,
    MatButtonModule,
  ],
})
export class CustomDatePickerComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @Output() dateChange = new EventEmitter<DateChangeEvent>();

  onApply() {
    const start = this.range.get('start')?.value;
    const end = this.range.get('end')?.value;

    this.dateChange.emit({ start, end });
  }
}
