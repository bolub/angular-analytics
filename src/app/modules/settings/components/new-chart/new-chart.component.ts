import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewChartDialogComponent } from './new-chart-dialog/new-chart-dialog.component';

@Component({
  selector: 'app-new-chart',
  templateUrl: './new-chart.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class NewChartComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(NewChartDialogComponent);
  }
}
