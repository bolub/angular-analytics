import { Injectable } from '@angular/core';
// import { GraphValue } from 'src/app/modules/settings/settings.model';
import { GraphValue } from '../../modules/settings/settings.model';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  generateGraphData() {
    let graphValues: GraphValue[] = [];

    const missionData = [
      { label: 'Mars Rover Landing', value: 1, date: '2021-02-18' },
      { label: 'Hubble Space Telescope Repair', value: 2, date: '2020-06-23' },
      {
        label: 'Juno Spacecraft Arrival at Jupiter',
        value: 3,
        date: '2016-07-04',
      },
      { label: 'New Horizons Pluto Flyby', value: 4, date: '2015-07-14' },
      { label: 'Perseverance Rover Landing', value: 5, date: '2021-02-18' },
      {
        label: 'Ingenuity Helicopter Flight on Mars',
        value: 6,
        date: '2021-04-19',
      },
      { label: 'Crew Dragon Demo-2 Launch', value: 7, date: '2020-05-30' },
      { label: 'Parker Solar Probe Launch', value: 8, date: '2018-08-12' },
      { label: 'Artemis I Moon Mission', value: 9, date: '2021-11-24' },
      {
        label: 'Voyager 1 Leaving the Solar System',
        value: 10,
        date: '2012-08-25',
      },
    ];

    for (let i = 0; i < missionData.length; i++) {
      const data = missionData[i];
      const date = new Date(data.date);

      graphValues.push({
        label: data.label,
        value: data.value,
        date: date,
      });
    }

    return graphValues;
  }

  private idLength: number = 8;

  generateUniqueId(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < this.idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }

    return id;
  }
}
