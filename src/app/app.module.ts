import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './settings/settings.component';
import { ViewModeComponent } from './view-mode/view-mode.component';
import { AppshellComponent } from './appshell/appshell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CustomDatePickerComponent } from './components/custom-date-picker/custom-date-picker.component';
import { GraphDisplayComponent } from './view-mode/graph-display/graph-display.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { GraphContentComponent } from './settings/graph-content/graph-content.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    AppshellComponent,
    ViewModeComponent,
    GraphDisplayComponent,
    PageHeaderComponent,
    GraphContentComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
