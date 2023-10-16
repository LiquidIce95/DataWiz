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

  it('getColumnValues should return correct column values', () => {
    expect(service.getColumnValues('name')).toEqual(['John', 'Alice']);
    expect(service.getColumnValues('age')).toEqual([30, 25]);
    expect(service.getColumnValues('income')).toEqual([0, 100]);
    expect(service.getColumnValues('nonexistent')).toEqual([]);
  });

  it('deduceColumnType should return correct type', () => {
    expect(service.deduceColumnType(['John', 'Alice'])).toEqual('nominal');
    expect(service.deduceColumnType([30, 25])).toEqual('metric');
    expect(service.deduceColumnType([30, 'John'])).toEqual('nominal');
    expect(service.deduceColumnType([])).toEqual('metric');
  });

  it('TypeDetect should correctly set tableTypes', () => {
    service.TypeDetect();
    expect(service.tableTypes).toEqual(['nominal', 'metric', 'metric']);
  });

  it('convertToNumberIfPossible should correctly convert', () => {
    expect(service.convertToNumberIfPossible('10')).toEqual(10);
    expect(service.convertToNumberIfPossible('0')).toEqual(0);
    expect(service.convertToNumberIfPossible('John')).toEqual('John');
    expect(service.convertToNumberIfPossible('')).toEqual('');
    expect(service.convertToNumberIfPossible(undefined)).toEqual(undefined);
  });



});
