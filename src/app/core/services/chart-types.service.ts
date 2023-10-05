import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MockService } from './mock.service';
import {
  ChartType,
  ChartTypeFull,
} from 'src/app/modules/settings/settings.model';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartTypesService {
  constructor(private http: HttpClient, private mockService: MockService) {}

  httpUrl = import.meta.env['NG_APP_API_URL'];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Appwrite-Project': import.meta.env['NG_APP_PROJECT_KEY'],
      'X-Appwrite-Key': import.meta.env['NG_APP_JWT_KEY'],
    }),
  };

  getChartTypes() {
    return this.http.get<{ documents: ChartTypeFull[] }>(
      this.httpUrl,
      this.httpOptions
    );
  }

  getChartTypes$ = this.http
    .get<{ documents: ChartTypeFull[] }>(this.httpUrl, this.httpOptions)
    .pipe(shareReplay(1));

  createChartType(ct: ChartType) {
    return this.http.post<ChartTypeFull>(
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

  updateChartType({
    documentId,
    data,
  }: {
    documentId: string;
    data: Partial<ChartType>;
  }) {
    return this.http.patch<ChartTypeFull>(
      `${this.httpUrl}/${documentId}`,
      {
        data,
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
