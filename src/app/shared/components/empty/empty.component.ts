import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
})
export class EmptyComponent {
  @Input({ required: true }) title!: string;
}
