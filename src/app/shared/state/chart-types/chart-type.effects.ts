import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as chartTypeActions from './chart-type.action';
import { ChartTypesService } from 'src/app/core/services/chart-types.service';
import { selectAllChartTypes } from './chart-type.selector';
import { AppState } from '../app.state';
import { MockService } from 'src/app/core/services/mock.service';
import { formatData } from 'src/app/modules/view-mode/utils';

@Injectable()
export class ChartTypeEffects {
  constructor(
    private actions$: Actions,
    private chartTypeService: ChartTypesService,
    private store: Store<AppState>,
    private mockService: MockService
  ) {}

  loadChartTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chartTypeActions.loadChartTypes),
      switchMap(() =>
        this.chartTypeService.getChartTypes$.pipe(
          switchMap((data) => {
            return [
              chartTypeActions.loadChartTypesSuccess({
                chartTypes: data.documents,
                chartTypesForViewMode: formatData(
                  [...data.documents],
                  this.mockService.generateGraphData()
                ),
              }),
            ];
          }),
          catchError((error) =>
            of(chartTypeActions.loadChartTypesFailure({ error }))
          )
        )
      )
    )
  );

  createChartType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chartTypeActions.createChartType),
      withLatestFrom(this.store.select(selectAllChartTypes)),
      switchMap(([action]) =>
        from(
          this.chartTypeService.createChartType({
            title: action.title,
            color: action.color,
            selectedType: action.selectedType,
          })
        ).pipe(
          switchMap((chartType) => {
            return [chartTypeActions.createChartTypeSuccess({ chartType })];
          }),
          catchError((error) =>
            of(chartTypeActions.createChartTypeError({ error }))
          )
        )
      )
    )
  );

  deleteChartType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chartTypeActions.deleteChartType),
      withLatestFrom(this.store.select(selectAllChartTypes)),
      switchMap(([action]) =>
        from(this.chartTypeService.deleteChartType(action.$id)).pipe(
          switchMap((chartType) => {
            return [chartTypeActions.deleteChartTypeSuccess({ chartType })];
          }),
          catchError((error) =>
            of(chartTypeActions.deleteChartTypeError({ error }))
          )
        )
      )
    )
  );
}
