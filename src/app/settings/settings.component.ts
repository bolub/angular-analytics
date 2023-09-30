import { Component } from '@angular/core';

type GraphContent = {
  title: string;
  type: string;
  color: string;
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  dummyData: GraphContent[] = [
    {
      title: 'Chart 1',
      type: 'chart',
      color: 'red',
    },
    {
      title: 'Chart 2',
      type: 'bar',
      color: 'green',
    },
    {
      title: 'Chart 2',
      type: 'line',
      color: 'yellow',
    },
  ];

  // constructor(public dialog: MatDialog) {}

  openDialog() {
    // const dialogRef = this.dialog.open(DialogContentExampleDialog);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
