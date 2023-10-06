import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dates-display',
  templateUrl: './dates-display.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class DatesDisplayComponent {
  @Input({ required: true }) isFiltering: boolean = false;
  @Input({ required: true }) startDate?: Date | null = null;
  @Input({ required: true }) endDate?: Date | null = null;

  @Output() resetClicked: EventEmitter<void> = new EventEmitter<void>();

  onResetClick() {
    this.resetClicked.emit();
  }
}
