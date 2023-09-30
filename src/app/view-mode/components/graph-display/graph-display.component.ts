import { Component, Input } from '@angular/core';

type Graph = {
  type: string;
  data: {
    value: number;
    date: Date;
  }[];
};

@Component({
  selector: 'app-graph-display',
  templateUrl: './graph-display.component.html',
})

//
export class GraphDisplayComponent {
  @Input({ required: true }) data!: Graph;
}
