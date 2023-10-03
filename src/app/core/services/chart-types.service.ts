import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartType, MockService } from './mock.service';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

export type ChartTypeFull = {
  $id?: string;
  $createdAt?: Date;
} & ChartType;

@Injectable({
  providedIn: 'root',
})
export class ChartTypesService {
  constructor(private http: HttpClient, private mockService: MockService) {}

  httpUrl = environment.httpUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Appwrite-Project': environment.projectKey,
      'X-Appwrite-Key': environment.jwtKey,
    }),
  };

  getChartTypes$ = this.http
    .get<{ documents: ChartTypeFull[] }>(this.httpUrl, this.httpOptions)
    .pipe(shareReplay(1));

  createChartType(ct: ChartType): Observable<any> {
    return this.http.post<any>(
      this.httpUrl,
      {
        documentId: this.mockService.generateUniqueId(),
        data: {
          ...ct,
        },
      },
      this.httpOptions
    );
  }

  deleteChartType(documentId: string) {
    return this.http.delete<ChartType>(
      `${this.httpUrl}/${documentId}`,
      this.httpOptions
    );
  }
}
