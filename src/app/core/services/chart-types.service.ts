import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MockService } from './mock.service';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ChartType,
  ChartTypeFull,
} from 'src/app/modules/settings/settings.model';

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

  getChartTypes() {
    return this.http.get<{ documents: ChartTypeFull[] }>(
      this.httpUrl,
      this.httpOptions
    );
  }

  getChartTypes$ = this.http.get<{ documents: ChartTypeFull[] }>(
    this.httpUrl,
    this.httpOptions
  );
  // .pipe(shareReplay(1));

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
