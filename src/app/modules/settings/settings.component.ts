import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartTypeFull } from '../../core/services/chart-types.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAllChartTypes,
  selectChartTypesLoadingStatus,
} from 'src/app/shared/state/chart-types/chart-type.selector';
import { loadChartTypes } from 'src/app/shared/state/chart-types/chart-type.action';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
  chartTypesList: ChartTypeFull[] = [];
  subscription!: Subscription;

  // @ts-ignore
  allChartTypes$ = this.store.select(selectAllChartTypes);

  // @ts-ignore
  allChartTypesStatus$ = this.store.select(selectChartTypesLoadingStatus);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadChartTypes());

    this.subscription = this.allChartTypes$.subscribe((data) => {
      // @ts-ignore
      this.chartTypesList = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
