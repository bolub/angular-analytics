import { Component, OnInit } from '@angular/core';
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
export class SettingsComponent implements OnInit {
  // @ts-ignore
  allChartTypes$ = this.store.select(selectAllChartTypes);

  // @ts-ignore
  allChartTypesStatus$ = this.store.select(selectChartTypesLoadingStatus);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadChartTypes());
  }
}
