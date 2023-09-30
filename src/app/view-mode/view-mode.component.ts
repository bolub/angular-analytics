import { Component } from '@angular/core';

type RangeType = { start?: Date | null; end?: Date | null };

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
})
export class ViewModeComponent {
  rangeValues: RangeType = {
    start: null,
    end: null,
  };

  handleDateChange(range: RangeType) {
    this.rangeValues = range;
  }

  dummyData = [
    {
      type: 'bar',
      data: [
        {
          value: 10,
          date: new Date(),
        },
      ],
    },
    {
      type: 'pie',
      data: [
        {
          value: 10,
          date: new Date(),
        },
      ],
    },
    {
      type: 'line',
      data: [
        {
          value: 10,
          date: new Date(),
        },
      ],
    },
  ];
}
