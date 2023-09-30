import { Component, Input } from '@angular/core';

type GraphContent = {
  title: string;
  type: string;
  color: string;
};

@Component({
  selector: 'app-graph-content',
  templateUrl: './graph-content.component.html',
})
export class GraphContentComponent {
  @Input({ required: true }) data!: GraphContent;
}
