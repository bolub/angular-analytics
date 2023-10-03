import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as chartTypeActions from './chart-type.action';
import { ChartTypesService } from 'src/app/core/services/chart-types.service';
import { selectAllChartTypes } from './chart-type.selector';
import { AppState } from '../app.state';

@Injectable()
export class ChartTypeEffects {
  constructor(
    private actions$: Actions,
    private chartTypeService: ChartTypesService,
    private store: Store<AppState>
  ) {}

  loadChartTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chartTypeActions.loadChartTypes),
      switchMap(() =>
        this.chartTypeService.getChartTypes$.pipe(
          map((data) =>
            chartTypeActions.loadChartTypesSuccess({
              chartTypes: data.documents.map((data) => {
                return {
                  ...data,
                  selectedType: data.type,
                };
              }),
            })
          ),
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
            type: action.selectedType,
          })
        ).pipe(
          map((chartType) =>
            chartTypeActions.createChartTypeSuccess({ chartType })
          ),
          catchError((error) =>
            of(chartTypeActions.createChartTypeError({ error }))
          )
        )
      )
    )
  );
}
