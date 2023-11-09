import { TestBed } from '@angular/core/testing';
import { TableDataService } from '../services/table.service';

fdescribe('TableService', () => {
  let service: TableDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('setTValue()', () => {

  });
  
  describe('getColumnValues', () => {
    it('should return correct values for name column', () => {
      expect(service.getColumnValues('name')).toEqual(['John', 'Alice'])
    });

    it('should return correct values for age column', () => {
      expect(service.getColumnValues('age')).toEqual([30, 25]);
    });

    it('should return correct values for income column', () => {
      expect(service.getColumnValues('income')).toEqual([0, 100]);
    });

    it('should return empty array for nonexistent column', () => {
      expect(service.getColumnValues('nonexistent')).toEqual([]);
    });
  });

  describe('deduceColumnType', () => {
    it('should return nominal for string array', () => {
      expect(service.deduceColumnType(['John', 'Alice'])).toEqual('nominal');
    });

    it('should return metric for number array', () => {
      expect(service.deduceColumnType([30, 25])).toEqual('metric');
    });

    it('should return nominal for mixed array', () => {
      expect(service.deduceColumnType([30, 'John'])).toEqual('nominal');
    });

    it('should return metric for empty array', () => {
      expect(service.deduceColumnType([])).toEqual('metric');
    });
  });

  describe('TypeDetect', ()=>{

    it('mixed', () => {
      service.TypeDetect();
      expect(service.getHeaderTypes()).toEqual(['nominal', 'metric', 'metric']);
    });

    it('only non Numerical values', () => {
      service['tableData'] = 
      [
        { name: 'John', age: 'young', income: 'low' },
        { name: 'Alice', age: 'old', income: 'high' },
      ];
      service.TypeDetect();
      expect(service.getHeaderTypes()).toEqual(['nominal', 'nominal', 'nominal']);
    });

  });
  

  describe('convertToNumberIfPossible', () => {
    it('should convert string to number', () => {
      expect(service.convertToNumberIfPossible('10')).toEqual(10);
    });

    it('should convert 0 string to number', () => {
      expect(service.convertToNumberIfPossible('0')).toEqual(0);
    });

    it('should not convert non-numeric string', () => {
      expect(service.convertToNumberIfPossible('John')).toEqual('John');
    });

    it('should return empty string', () => {
      expect(service.convertToNumberIfPossible('')).toEqual('');
    });

    it('should return undefined', () => {
      expect(service.convertToNumberIfPossible(undefined)).toEqual(undefined);
    });
  });
});
