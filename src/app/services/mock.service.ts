import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  constructor() {}

  generateGraphData(number: number) {
    let graphValues = [];

    const randomValue = Math.floor(Math.random() * 100); // Random value between 0 and 99
    const randomDate = new Date(
      new Date().getTime() -
        Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ); // Random date within the last 30 days

    for (let i = 0; i < number; i++) {
      graphValues.push({
        value: randomValue,
        date: randomDate,
      });
    }

    return graphValues;
  }
}
