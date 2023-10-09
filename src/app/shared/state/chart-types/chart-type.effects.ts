import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { ChartTypeActions } from './chart-type.action';
import { ChartTypesService } from 'src/app/core/services/chart-types/chart-types.service';
import { MockService } from 'src/app/core/services/mock/mock.service';
import { formatData } from 'src/app/features/view-mode/utils';

@Injectable()
export class ChartTypeEffects {
  constructor(
    private actions$: Actions,
    private chartTypeService: ChartTypesService,
    private mockService: MockService
  ) {}

  loadChartTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartTypeActions.load),
      switchMap(() =>
        this.chartTypeService.getChartTypes$.pipe(
          switchMap((data) => {
            return [
              ChartTypeActions.loadSuccess({
                chartTypes: data.documents,
                chartTypesForViewMode: formatData(
                  [...data.documents],
                  this.mockService.generateGraphData()
                ),
              }),
            ];
          }),
          catchError((error) => of(ChartTypeActions.loadFailure({ error })))
        )
      )
    )
  );

  createChartType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartTypeActions.create),
      switchMap((action) =>
        from(
          this.chartTypeService.createChartType({
            title: action.title,
            color: action.color,
            selectedType: action.selectedType,
          })
        ).pipe(
          switchMap((chartType) => {
            return [ChartTypeActions.createSuccess({ chartType })];
          }),
          catchError((error) => of(ChartTypeActions.createError({ error })))
        )
      )
    )
  );

  deleteChartType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartTypeActions.delete),
      switchMap((action) =>
        from(this.chartTypeService.deleteChartType(action.$id)).pipe(
          switchMap((chartType) => {
            return [ChartTypeActions.deleteSuccess({ chartType })];
          }),
          catchError((error) => of(ChartTypeActions.deleteError({ error })))
        )
      )
    )
  );

  updateChartType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartTypeActions.update),
      switchMap((action) =>
        from(
          this.chartTypeService.updateChartType({
            documentId: action.$id,
            data: action.data,
          })
        ).pipe(
          switchMap((chartType) => {
            return [ChartTypeActions.updateSuccess({ chartType })];
          }),
          catchError((error) => of(ChartTypeActions.updateError({ error })))
        )
      )
    )
  );
}
