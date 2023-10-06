import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './features/settings/settings.component';
import { ViewModeComponent } from './features/view-mode/view-mode.component';
import { AppshellComponent } from './shared/components/appshell/appshell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CustomDatePickerComponent } from './features/view-mode/components/custom-date-picker/custom-date-picker.component';
import { GraphDisplayComponent } from './features/view-mode/components/graph-display/graph-display.component';
import { PageHeaderComponent } from './shared/components/page-header/page-header.component';
import { ChartTypeDisplay } from './features/settings/components/chart-type-display/chart-type-display.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ChartTypeEffects } from './shared/state/chart-types/chart-type.effects';
import { chartTypeReducer } from './shared/state/chart-types/chart-type.reducer';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { EmptyComponent } from './shared/components/empty/empty.component';
import { ChartTypeDialogComponent } from './features/settings/components/chart-type-dialog/form-input.component';
import { EditChartTypeDialogComponent } from './features/settings/components/chart-type-dialog/edit-chart-type-dialog/edit-chart-type-dialog.component';
import { NewChartDialogComponent } from './features/settings/components/chart-type-dialog/new-chart-dialog/new-chart-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    AppshellComponent,
    ViewModeComponent,
    PageHeaderComponent,
    LoaderComponent,
    EmptyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    CustomDatePickerComponent,
    NewChartDialogComponent,
    GraphDisplayComponent,
    HttpClientModule,
    ChartTypeDisplay,
    EditChartTypeDialogComponent,
    ChartTypeDialogComponent,
    StoreModule.forRoot({
      chartTypes: chartTypeReducer,
    }),
    EffectsModule.forRoot([ChartTypeEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
