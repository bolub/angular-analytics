import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartType } from './mock.service';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartTypesService {
  constructor(private http: HttpClient) {}

  httpUrl =
    'https://cloud.appwrite.io/v1/databases/65182ff2ab05af399cb3/collections/65193b7ba5283eb4f7e2/documents';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Appwrite-Project': '65182fafbbc88f5d8f8a',
      'X-Appwrite-Key':
        '401fec8044f70d2a26c3ba43dc9641ff50dcb65bdb2d6c94fbe1ee5772130cebd5c4f5ceddb1f7c74620e81c42a30544c5b1d7eb76226fd52d1438d07a3dec026b44fb4118f8473be2cb1f2f3da06a0471bd1c2cc1d2a06b10a581ff4184050b1d66cec501c8dfdb615afbcf606e8d0dd662abcb7ae6988f468ce2cb39db68f1',
    }),
  };

  getChartTypes() {
    return this.http.get<{ documents: ChartType[] }>(
      this.httpUrl,
      this.httpOptions
    );
  }

  getChartTypes$ = this.http
    .get<{ documents: ChartType[] }>(this.httpUrl, this.httpOptions)
    .pipe(shareReplay(1));
}
