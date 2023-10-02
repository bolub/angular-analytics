import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartType } from './mock.service';
import { shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChartTypesService {
  constructor(private http: HttpClient) {}

  httpUrl = environment.httpUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Appwrite-Project': environment.projectKey,
      'X-Appwrite-Key': environment.jwtKey,
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
