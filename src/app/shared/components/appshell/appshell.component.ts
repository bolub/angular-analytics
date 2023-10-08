import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SideNavItemsComponent } from '../side-nav-items/side-nav-items.component';

@Component({
  selector: 'app-shell',
  templateUrl: './appshell.component.html',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    RouterModule,
    NavbarComponent,
    SideNavItemsComponent,
  ],
})
export class AppshellComponent {}
