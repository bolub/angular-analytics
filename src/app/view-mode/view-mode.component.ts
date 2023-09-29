import { Component } from '@angular/core';

type RangeType = { start?: Date | null; end?: Date | null };

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
})
export class ViewModeComponent {
  rangeValues!: RangeType;

  handleDateChange(range: RangeType) {
    this.rangeValues = range;
  }
}
