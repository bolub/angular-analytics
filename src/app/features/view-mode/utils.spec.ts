import { TestBed } from '@angular/core/testing';
import { formatData, dateToString, filterValidItemsInRange } from './utils';
import { ViewMode, RangeType } from './view-mode.model';

import { ChartTypeFull } from '../settings/settings.model';
import { MockService } from 'src/app/core/services/mock/mock.service';

describe('Utils', () => {
  let mockDataService: MockService;
  let chartTypesList: ChartTypeFull[];
  let viewModes: ViewMode[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockService],
    });

    mockDataService = TestBed.inject(MockService);

    chartTypesList = [
      {
        $id: '1',
        $createdAt: new Date(),
        title: 'Chart 1',
        selectedType: 'bar',
        color: 'blue',
      },
    ];

    viewModes = [
      {
        $id: '1',
        $createdAt: new Date(),
        title: 'View Mode 1',
        selectedType: 'line',
        color: 'red',
        data: mockDataService.generateGraphData(),
      },
    ];
  });

  describe('Utils', () => {
    it('should format data correctly', () => {
      const formattedData = formatData(chartTypesList, viewModes[0].data);
      expect(formattedData.length).toBe(chartTypesList.length);

      for (let i = 0; i < formattedData.length; i++) {
        expect(formattedData[i].data).toEqual(viewModes[0].data);
      }
    });

    it('should convert a Date to string in "YYYY-MM-DD" format', () => {
      const testDate = new Date('2023-03-15');
      const dateString = dateToString(testDate);
      expect(dateString).toBe('2023-03-15');
    });

    it('should return an empty string for null or undefined dates', () => {
      expect(dateToString(null)).toBe('');
      expect(dateToString(undefined)).toBe('');
    });

    it('should filter valid items based on the date range', () => {
      const startDate = new Date('2016-01-01');
      const endDate = new Date('2018-12-31');
      const range: RangeType = { start: startDate, end: endDate };

      const filteredItems = filterValidItemsInRange(viewModes, range);

      for (const filteredItem of filteredItems) {
        for (const dataItem of filteredItem.data) {
          const itemDate = new Date(dataItem.date);

          expect(itemDate >= startDate && itemDate <= endDate).toBe(true);
        }
      }
    });
  });
});
