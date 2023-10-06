import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewModeComponent } from './features/view-mode/view-mode.component';
import { SettingsComponent } from './features/settings/settings.component';

const routes: Routes = [
  {
    path: 'view-mode',
    component: ViewModeComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },

  {
    path: '',
    redirectTo: 'view-mode',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
