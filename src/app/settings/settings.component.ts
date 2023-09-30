import { Component, OnInit } from '@angular/core';
import { MockService } from '../services/mock.service';

export type GraphContent = {
  title: string;
  type: string;
  color: string;
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  dummyData: GraphContent[] = [];

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.dummyData = this.mockService.generateChartTypeData();
  }
}
