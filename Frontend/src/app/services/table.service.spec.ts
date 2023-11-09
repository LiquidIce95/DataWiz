import { TestBed } from '@angular/core/testing';
import { TableDataService } from '../services/table.service';

fdescribe('TableService', () => {
  let service: TableDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataService);
    service['tableData'] = [
    { 'name': 'John', 'age': 30, 'income': 0 },
    { 'name': 'Alice', 'age': 25, 'income': 100 },
    ];

    service['tableHeaders'] = {
      'name':['nominal',false],
      'age' :['metric',false],
      'income' : ['metric',false]
    };

    service['tableKeys'] = [
      'name',
      'age',
      'income'
    ];

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('getKeys()', () => {
    it('should return a copy of the header names', () => {
      const keys = service.getKeys();
      expect(keys).toEqual(['name', 'age', 'income']);
    });

    it('should not return the original array', () => {
      const keys = service.getKeys();
      expect(keys).not.toBe(service['tableKeys']); // Checking that it's indeed a copy
    });
  });

  describe('getTableData()', () => {
    it('should return a copy of the table data', () => {
      const data = service.getTableData();
      expect(data).toEqual(service['tableData']);
    });

    it('should not return the original table data array', () => {
      const data = service.getTableData();
      expect(data).not.toBe(service['tableData']); // Ensuring it's a copy
    });
  });

  describe('getTableHeaders()', () => {
    it('should return a copy of the table headers', () => {
      const headers = service.getTableHeaders();
      expect(headers).toEqual(service['tableHeaders']);
    });

    it('should not return the original table headers object', () => {
      const headers = service.getTableHeaders();
      expect(headers).not.toBe(service['tableHeaders']); // Ensuring it's a copy
    });
  });


  describe('setTValue()', () => {
    it('sets a value within index and key range',()=>{
      service.setTValue(0,'name','Alex');
      expect(service['tableData'][0]['name']).toEqual('Alex');
    });

    it('index out of bounds error',()=>{
      let index = service['tableData'].length+4;
      expect(()=> {service.setTValue(index,'name','Alex');}).toThrowError('index out of bounds');

    });
  });

  describe('getTValue()', () => {
    it('should return the correct value for a given key and index', () => {
      expect(service.getTValue(0, 'name')).toEqual('John');
    });

    it('should throw an error if index is out of bounds', () => {
      expect(() => { service.getTValue(10, 'name'); }).toThrowError('index out of bounds');
    });

    it('should throw an error if key is not in the dictionary', () => {
      expect(() => { service.getTValue(0, 'nonexistent'); }).toThrowError('key not in dict');
    });
  });

  describe('setHvalue()', () => {
    it('should set the type and select for a header', () => {
      service.setHvalue('age', 'ordinal', true);
      expect(service.getTableHeaders()['age']).toEqual(['ordinal', true]);
    });

    it('should throw an error if the key is not in the dictionary', () => {
      expect(() => { service.setHvalue('nonexistent', 'ordinal', true); }).toThrowError('key not in dict');
    });
  });

  describe('getHvalue()', () => {
    it('should return the header values for a given key', () => {
      expect(service.getHvalue('name')).toEqual(['nominal', false]);
    });

    it('should return a copy, not the original header values', () => {
      const headerValue = service.getHvalue('name');
      expect(headerValue).not.toBe(service['tableHeaders']['name']); // Ensuring it's a copy
    });
  });

  describe('addRow()', () => {
    it('should add an empty row when no argument is provided', () => {
      let initialLength = service['tableData'].length;
      service.addRow();
      expect(service.getTableData().length).toBe(initialLength+1);
      let index = service['tableData'].length-1;
      expect(service['tableData'][index]).toEqual({ 'name': '', 'age': '', 'income': '' });
    }); 

    it('should add a row with specified values', () => {
      service.addRow({ 'name': 'Bob', 'age': 40, 'income': 200 });
      let index = service['tableData'].length-1;
      expect(service['tableData'][index]).toEqual({ 'name': 'Bob', 'age': 40, 'income': 200 });
    });
});

  describe('delRow()', () => {
    it('should delete the last row', () => {
      const initialLength = service.getTableData().length;
      service.delRow();
      expect(service.getTableData().length).toBe(initialLength - 1);
    });

    it('should not throw an error when deleting from an empty table', () => {
      service.delTable();
      expect(() => { service.delRow(); }).not.toThrow();
      expect(service.getTableData().length).toBe(0);
    });
  });


  describe('addColumn()', () => {
    it('should add a new column to the table', () => {
      const initialColumnCount = Object.keys(service.getTableHeaders()).length;
      service.addColumn();
      const columnCountAfterAddition = Object.keys(service.getTableHeaders()).length;
      expect(columnCountAfterAddition).toEqual(initialColumnCount + 1);
      expect(service.getTableHeaders()['newColumnName']).toBeDefined();
    });
  
    it('should initialize new column with empty values for all rows', () => {
      service.addColumn();
      service.getTableData().forEach(row => {
        expect(row['newColumnName']).toBeDefined();
        expect(row['newColumnName']).toEqual('');
      });
    });
  });

  describe('delColumn()', () => {
    it('should delete the last column', () => {
      service.addColumn();
      const initialKeysLength = service.getKeys().length;
      service.delColumn();
      expect(service.getKeys().length).toBe(initialKeysLength - 1);
    });

    it('should not throw an error when deleting a column from an empty headers object', () => {
      service.delTable();
      expect(() => { service.delColumn(); }).not.toThrow();
      expect(service.getKeys().length).toBe(0);
    });
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

  
  
  describe('getRowValues()', () => {
    it('should return the values of the row at specified index', () => {
      const rowIndex = 0;
      const rowValues = service.getRowValues(rowIndex);
      expect(rowValues).toEqual(service.getTableData()[rowIndex]);
    });
  
    it('should throw error when index is out of bounds', () => {
      const rowIndex = service['tableData'].length; // Out of bounds
      expect(() => service.getRowValues(rowIndex)).toThrowError('index out of bounds');
    });
  });
  
  describe('getHeaderTypes()', () => {
    it('should return the types of all headers', () => {
      let types =[];
      for(let index in service['tableKeys']){
        let key = service['tableKeys'][index];
        types.push(service['tableHeaders'][key][0]);

      }

      const headerTypes = service.getHeaderTypes();
      expect(headerTypes).toEqual(types);
    });
  
    it('should return an empty array if no headers are present', () => {
      service.delTable();
      expect(service.getHeaderTypes()).toEqual([]);
    });
  });
  
  describe('getHeaderSelects()', () => {
    it('should return the selection state of all headers', () => {
      const headerSelects = service.getHeaderSelects();
      const expectedSelects = service.getKeys().map(key => service.getTableHeaders()[key][1]);
      expect(headerSelects).toEqual(expectedSelects);
    });
  
    it('should return an empty array if no headers are present', () => {
      service.delTable();
      expect(service.getHeaderSelects()).toEqual([]);
    });
  });
  
  
  

  describe('clearTable()', () => {
    it('should set all entries in tableData to an empty string', () => {
      service.clearTable();
      service.getTableData().forEach(row => {
        for (const key of service.getKeys()) {
          expect(row[key]).toBe('');
        }
      });
    });
  });

  describe('delTable()', () => {
    it('should delete all data and headers', () => {
      service.delTable();
      expect(service.getTableData().length).toBe(0);
      expect(service.getKeys().length).toBe(0);
      expect(Object.keys(service.getTableHeaders()).length).toBe(0);
    });
  });

  describe('changeHeaderName()', () => {
    it('should change the header name in both headers and data', () => {
      const oldHeader = 'income';
      const newHeader = 'revenue';
      service.changeHeaderName(oldHeader, newHeader);
      expect(service.getTableHeaders()[newHeader]).toBeDefined();
      service.getTableData().forEach(row => {
        expect(row[newHeader]).toBeDefined();
      });
    });
  
    it('should maintain the order of headers after name change', () => {
      const oldHeader = 'income';
      const newHeader = 'revenue';
      const oldIndex = service.getKeys().indexOf(oldHeader);
      service.changeHeaderName(oldHeader, newHeader);
      const newKeys = service.getKeys();
      expect(newKeys[oldIndex]).toEqual(newHeader);
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

    it('should return nominal for empty array', () => {
      expect(service.deduceColumnType([])).toEqual('nominal');
    });
  });

  describe('TypeDetect', ()=>{

    it('mixed', () => {
      service.TypeDetect();
      expect(service['tableHeaders']).toEqual({
        'name':['nominal',false],
        'age' :['metric',false],
        'income' : ['metric',false]
      });
    });

    it('only non Numerical values', () => {
      service['tableData'] = 
      [
        { name: 'John', age: 'young', income: 'low' },
        { name: 'Alice', age: 'old', income: 'high' },
      ];
      service.TypeDetect();
      expect(service['tableHeaders']).toEqual({
        'name':['nominal',false],
        'age' :['nominal',false],
        'income' : ['nominal',false]
      });    
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
