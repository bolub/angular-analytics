import { Component, Input } from '@angular/core';
import { GraphContent } from '../../settings.component';

@Component({
  selector: 'app-graph-content',
  templateUrl: './graph-content.component.html',
})
export class GraphContentComponent {
  @Input({ required: true }) data!: GraphContent;
}
