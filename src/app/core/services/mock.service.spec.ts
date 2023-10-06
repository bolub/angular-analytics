import { TestBed } from '@angular/core/testing';

import { MockService } from './mock.service';

describe('MockService', () => {
  let service: MockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateGraphData', () => {
    it('should generate an array of GraphValue objects', () => {
      const graphData = service.generateGraphData();

      expect(Array.isArray(graphData)).toBe(true);

      expect(graphData.length).toBeGreaterThan(0);
      expect(graphData[0]).toEqual(
        jasmine.objectContaining({
          label: jasmine.any(String),
          value: jasmine.any(Number),
          date: jasmine.any(Date),
        })
      );
    });
  });

  describe('generateUniqueId', () => {
    it('should generate a unique ID of the specified length', () => {
      const id = service.generateUniqueId();

      expect(id.length).toBe(service['idLength']);

      const anotherId = service.generateUniqueId();
      expect(id).not.toEqual(anotherId);
    });
  });
});
