import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav-items',
  templateUrl: './side-nav-items.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, CommonModule],
})
export class SideNavItemsComponent {
  @Input() className!: string;

  @Output() closeSidebar = new EventEmitter();

  closeSide() {
    this.closeSidebar.emit();
  }
}
