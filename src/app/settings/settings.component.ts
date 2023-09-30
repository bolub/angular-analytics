import { Component, OnInit } from '@angular/core';
import { ChartType, MockService } from '../services/mock.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  dummyData: ChartType[] = [];

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.dummyData = this.mockService.generateChartTypeData();
  }
}
