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
    const dialogRef = this.dialog.open(NewChartDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
