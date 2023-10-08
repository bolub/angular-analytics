import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
})
export class NavbarComponent {
  @Output() closeSidebar = new EventEmitter();

  closeSide() {
    this.closeSidebar.emit();
  }
}
