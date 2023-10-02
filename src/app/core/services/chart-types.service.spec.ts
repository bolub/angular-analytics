import { TestBed } from '@angular/core/testing';

import { ChartTypesService } from './chart-types.service';

describe('ChartTypesService', () => {
  let service: ChartTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
