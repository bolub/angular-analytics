import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ChartTypesService } from './chart-types.service';
import { MockService } from '../../services/mock/mock.service';
import { ChartType } from 'src/app/features/settings/settings.model';

describe('ChartTypesService', () => {
  let service: ChartTypesService;
  let httpMock: HttpTestingController;
  let mockService: MockService;
  const mockChartType: ChartType = {
    title: 'Dummy title',
    color: '#ffffff',
    selectedType: 'bar',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChartTypesService, MockService],
    });

    service = TestBed.inject(ChartTypesService);
    httpMock = TestBed.inject(HttpTestingController);
    mockService = TestBed.inject(MockService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getChartTypes$', () => {
    it('should retrieve chart types via GET request', () => {
      const mockChartTypes = {
        documents: {
          documents: [
            {
              $id: mockService.generateUniqueId(),
              $createdAt: new Date(),
              ...mockChartType,
            },
          ],
        },
      };

      service.getChartTypes$.subscribe((data) => {
        // @ts-ignore
        expect(data.documents).toEqual(mockChartTypes);
      });

      const req = httpMock.expectOne(service.httpUrl);
      expect(req.request.method).toBe('GET');

      req.flush({ documents: mockChartTypes });
    });

    it('should handle GET request error', () => {
      const errorMessage = 'Error occurred during GET request';

      service.getChartTypes$.subscribe({
        error: (e) => {
          expect(e.error).toBe(errorMessage);
        },
      });

      const req = httpMock.expectOne(service.httpUrl);
      expect(req.request.method).toBe('GET');

      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('createChartType', () => {
    it('should create a chart type via POST request', () => {
      service.createChartType(mockChartType).subscribe((createdChartType) => {
        expect(createdChartType).toBeTruthy();
      });

      const req = httpMock.expectOne(service.httpUrl);
      expect(req.request.method).toBe('POST');
      req.flush({});
    });

    it('should handle POST request error', () => {
      const errorMessage = 'Error occurred during POST request';

      service.createChartType(mockChartType).subscribe({
        error: (e) => {
          expect(e.error).toBe(errorMessage);
        },
      });

      const req = httpMock.expectOne(service.httpUrl);
      expect(req.request.method).toBe('POST');

      req.flush(errorMessage, {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });

  describe('updateChartType', () => {
    it('should update a chart type via PATCH request', () => {
      const documentId = mockService.generateUniqueId();

      service
        .updateChartType({ documentId, data: mockChartType })
        .subscribe((updatedChartType) => {
          expect(updatedChartType).toBeTruthy();
        });

      const req = httpMock.expectOne(`${service.httpUrl}/${documentId}`);
      expect(req.request.method).toBe('PATCH');
      req.flush({});
    });

    it('should handle PATCH request error', () => {
      const documentId = mockService.generateUniqueId();
      const errorMessage = 'Error occurred during PATCH request';

      service.updateChartType({ documentId, data: mockChartType }).subscribe({
        error: (e) => {
          expect(e.error).toBe(errorMessage);
        },
      });

      const req = httpMock.expectOne(`${service.httpUrl}/${documentId}`);
      expect(req.request.method).toBe('PATCH');

      req.flush(errorMessage, {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });

  describe('deleteChartType', () => {
    it('should delete a chart type via DELETE request', () => {
      const documentId = mockService.generateUniqueId();

      service.deleteChartType(documentId).subscribe();

      const req = httpMock.expectOne(`${service.httpUrl}/${documentId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });

    it('should handle DELETE request error', () => {
      const documentId = mockService.generateUniqueId();
      const errorMessage = 'Error occurred during DELETE request';

      service.deleteChartType(documentId).subscribe({
        error: (e) => {
          expect(e.error).toBe(errorMessage);
        },
      });

      const req = httpMock.expectOne(`${service.httpUrl}/${documentId}`);
      expect(req.request.method).toBe('DELETE');

      req.flush(errorMessage, {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });
});
