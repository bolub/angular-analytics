import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartType } from '../services/mock.service';
import { ChartTypesService } from '../services/chart-types.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
  chartTypesList: ChartType[] = [];
  subscription!: Subscription;

  constructor(private chartTypesService: ChartTypesService) {}

  ngOnInit(): void {
    this.subscription = this.chartTypesService.getChartTypes$.subscribe(
      (data) => {
        this.chartTypesList = data.documents;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
